INSERT INTO users (name, email, password) VALUES ('Nostradamus M', 'seerman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Galileo G', 'gravityguy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Leo DaVinci', 'anatomyman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Madame Curie', 'glowinggirl@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (1, 'title1111', 'thumbnail_photo_url1111', 'cover_photo_url1111', 10, 1, 1,1, 'CAN', 1234, 'Calgary', 'AB', 'HOH OHO', TRUE);
INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (2, 'title2222', 'thumbnail_photo_url2222', 'cover_photo_url2222', 15, 2, 2,2, 'CAN', 1423, 'Calgary', 'AB', 'HOH OHO', TRUE);
INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (3, 'title3333', 'thumbnail_photo_url3333', 'cover_photo_url3333', 20, 3, 3,3, 'CAN', 2143, 'Calgary', 'AB', 'HOH OHO', TRUE);
INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES (4, 'title4444', 'thumbnail_photo_url4444', 'cover_photo_url4444', 25, 4, 4,4, 'CAN', 6423, 'Calgary', 'AB', 'HOH OHO', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)  
VALUES ('2020-01-01', '2020-01-02', 1, 1),
('2020-01-01', '2020-01-02', 2, 2),
('2020-01-01', '2020-01-02', 3, 3),
('2020-01-01', '2020-01-02', 4, 4);
 

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'message'), 
(2, 2, 2, 5, 'message'),
(3, 3, 3, 5, 'message'),
(4, 4, 4, 5, 'message');