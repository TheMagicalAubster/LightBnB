const properties = require('./json/properties.json');
const users = require('./json/users.json');
const pg = require('pg');
const { query } = require('express');


/// Users
const config = {
  user: 'vagrant',
  password: '123',
  database: 'lightbnb',
  host: 'localhost'
};

const pool = new pg.Pool(config);
pool.connect();


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */


const getUserWithEmail = (email) => {
  return pool.query('SELECT * FROM users WHERE email = $1', [email] )
  .then (res => res.rows[0]);
 
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  return pool.query('SELECT * FROM users WHERE id = $1', [id] )
  .then (res => res.rows[0]);
 
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) returning *`, [user.name, user.email, user.password] )
  .then (res => res.rows[0]);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query( `SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`, [guest_id, limit] )
    .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
    const queryParams = [];
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if(options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString +=`AND cost_per_night > $${queryParams.length} `;
    }
    if(options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString +=`AND cost_per_night < $${queryParams.length} `;
    }

    if(options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString +=`AND rating >= $${queryParams.length} `;
    }

    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
    // console.log(queryString, queryParams);
  
    return pool.query(queryString, queryParams)
    .then(res => res.rows);
  }
  
  
  
  // return pool.query(`
  // SELECT * FROM properties
  // LIMIT $1
  // `, [limit])
  // .then(res => res.rows);
  
// }
exports.getAllProperties = getAllProperties; 


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) returning *`, [property.title, property.description, property.owner_id, property.cover_photo_url, property.thumbnail_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, true, property.province, property.city, property.country, property.street, property.post_code] )
  .then (res => res.rows[0]);
}

exports.addProperty = addProperty;
