CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;


DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(48) UNIQUE NOT NULL,
    author varchar(48),
    years_published int,
    publisher varchar(48),
    page_count int,
    msrp decimal
);

INSERT INTO book (id, title, author, years_published, publisher, page_count, msrp) VALUES 
(1, 'The Moonlight Child', 'Karen McQuestion', 2020, 'Nightsky Press', 313, 18.99),
(2, 'A Slow Fire Burning', 'Paula Hawkins', 2021, 'Riverhead Books', 316, 19.58),
(3, 'The Night She Disappeared', 'Lisa Jewell', 2021, 'Atria Books', 416, 22.49),
(4, 'The Girl Who Lived', 'Christopher Greyson', 2017, 'Greyson Media Associates', 297, 17.47),
(5, 'And Then She Was GONE', 'Lisa Jewell', 2018, 'Atria Books', 368, 25.01);

