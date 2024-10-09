CREATE DATABASE  IF NOT EXISTS EmploymentSupport;

USE EmploymentSupport;

CREATE TABLE IF NOT EXISTS Candidate(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber INT DEFAULT NULL,
    city VARCHAR(255) NOT NULL,
    description VARCHAR(2000) DEFAULT NULL,
    photo_file_path VARCHAR(255) DEFAULT NULL,
    age INT NOT NULL,
    profession VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS EmploymentSupport.Company(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    photo_file_path VARCHAR(255) DEFAULT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS EmploymentSupport.Messages(
    id INT NOT NULL AUTO_INCREMENT,
    id_candidate INT NOT NULL,
    id_company INT NOT NULL,
    message_time DATETIME NOT NULL,
    message VARCHAR(2555) NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (id_candidate)
        REFERENCES Candidate(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (id_company)
        REFERENCES Company(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EmploymentSupport.Favourites(
    id INT NOT NULL AUTO_INCREMENT,
    id_candidate INT NOT NULL,
    id_company INT NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (id_candidate)
        REFERENCES Candidate(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (id_company)
        REFERENCES Company(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS EmploymentSupport.Opinions(
    id INT NOT NULL AUTO_INCREMENT,
    id_candidate INT NOT NULL,
    id_company INT NOT NULL,
    opinion_time DATETIME NOT NULL,
    opinion VARCHAR(2555) NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (id_candidate)
        REFERENCES Candidate(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (id_company)
        REFERENCES Company(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
