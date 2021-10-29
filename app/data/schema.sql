CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

DROP TABLE IF EXISTS student;
CREATE TABLE student (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO student (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

-- SELECT * FROM students;

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
	id int PRIMARY KEY AUTO_INCREMENT,
    studentId int NOT NULL REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	companyName VARCHAR(24) NOT NULL DEFAULT '',
    salary int NOT NULL DEFAULT 0,
    bonus int NOT NULL DEFAULT 0,
	offerDate date NOT NULL DEFAULT(CURRENT_DATE)
);

-- Student 1 has no offers, Student 2 has 3 offers, Student 3 has one offer
INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
  (1, 2, 'KPMG', 95000, 7000, '2021-09-30'),
  (2, 2, 'Deloitte Digital', 94000, 12000, '2021-10-03'),
  (3, 2, 'IU, ISGP', 54000, 0, '2021-10-05'),
  (4, 3, 'Amazon', 122000, 11000, '2021-10-15')
;

ALTER TABLE offer
Add Column status enum ("Unanswered", "Accepted", "Rejected")
NOT NULL Default "Unanswered";

SELECT name, username, MAX(salary) AS maxSalary, COUNT(salary) AS offerCount
FROM student LEFT OUTER JOIN offer on student.id= offer.studentId
GROUP BY username, name;

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