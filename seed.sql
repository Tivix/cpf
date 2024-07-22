-- Create ladder table
CREATE TABLE ladder (
    ladderSlug VARCHAR(50) PRIMARY KEY,
    ladderName VARCHAR(50) NOT NULL
);

-- Create band table
CREATE TABLE band (
    bandID SERIAL PRIMARY KEY,
    ladderSlug VARCHAR(50) REFERENCES ladder(ladderSlug),
    threshold INT NOT NULL,
    salary_range VARCHAR(50) NOT NULL
);

-- Create bucket table
CREATE TABLE bucket (
    bucketSlug VARCHAR(50) PRIMARY KEY,
    bucketName VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    bucketType VARCHAR(50) NOT NULL
);

-- Create band_bucket table to link bands and buckets
CREATE TABLE band_bucket (
    bandID INT REFERENCES band(bandID),
    bucketSlug VARCHAR(50) REFERENCES bucket(bucketSlug),
    PRIMARY KEY (bandID, bucketSlug)
);

-- Create advancement_level table
CREATE TABLE advancement_level (
    levelID SERIAL PRIMARY KEY,
    bucketSlug VARCHAR(50) REFERENCES bucket(bucketSlug),
    advancement_level INT NOT NULL,
    description TEXT NOT NULL
);

-- Create example_project table
CREATE TABLE example_project (
    projectID SERIAL PRIMARY KEY,
    levelID INT REFERENCES advancement_level(levelID),
    title VARCHAR(200) NOT NULL,
    overview TEXT NOT NULL
);

-- Create atomic_skill table
CREATE TABLE atomic_skill (
    skillID SERIAL PRIMARY KEY,
    levelID INT REFERENCES advancement_level(levelID),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Insert ladder data
INSERT INTO ladder (ladderSlug, ladderName) VALUES
('backend', 'Backend Developer'),
('frontend', 'Frontend Developer');

-- Insert band data for backend
INSERT INTO band (ladderSlug, threshold, salary_range) VALUES
('backend', 2, '4000 - 8000 pln'),
('backend', 6, '6000 - 10000 pln'),
('backend', 10, '8000 - 12000 pln'),
('backend', 14, '10000 - 14000 pln'),
('backend', 18, '12000 - 16000 pln'),
('backend', 22, '14000 - 20000 pln'),
('backend', 26, '19000 - 24000 pln'),
('backend', 30, '21000 - 26000 pln'),
('backend', 34, '30000+ pln');

-- Insert band data for frontend
INSERT INTO band (ladderSlug, threshold, salary_range) VALUES
('frontend', 2, '4000 - 7000 pln'),
('frontend', 6, '6000 - 9000 pln'),
('frontend', 10, '8000 - 11000 pln'),
('frontend', 14, '10000 - 13000 pln'),
('frontend', 18, '12000 - 15000 pln'),
('frontend', 22, '14000 - 18000 pln'),
('frontend', 26, '17000 - 21000 pln'),
('frontend', 30, '20000 - 24000 pln'),
('frontend', 34, '25000+ pln');

-- Insert bucket data
INSERT INTO bucket (bucketSlug, bucketName, description, bucketType) VALUES
('programming_language', 'Programming Language', 'Backend programming language skills are primarily focused on the developer\''s role in the selected language.', 'hard'),
('frameworks', 'Frameworks', 'Backend programming language skills are primarily focused on the developer\''s role in the selected language.', 'hard'),
('html', 'HTML & CSS', 'Frontend development skills focusing on HTML and CSS.', 'hard'),
('javascript', 'JavaScript', 'Frontend development skills focusing on JavaScript.', 'hard');

-- Insert band_bucket data for backend
INSERT INTO band_bucket (bandID, bucketSlug) VALUES
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 2), 'programming_language'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 2), 'frameworks'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 6), 'programming_language');


-- Insert band_bucket data for frontend
INSERT INTO band_bucket (bandID, bucketSlug) VALUES
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 2), 'html'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 2), 'javascript'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 6), 'javascript');

-- Insert advancement_level data for frameworks
INSERT INTO advancement_level (bucketSlug, advancement_level, description) VALUES
('frameworks', 1, 'Lorem ipsum dolores'),
('frameworks', 2, 'Lorem ipsum'),
('frameworks', 3, 'Lorem');

-- Insert example_project data for frameworks
INSERT INTO example_project (levelID, title, overview) VALUES
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frameworks' AND advancement_level = 1), 'Project title: Building a Simple Library System', 'Lorem ipsum');

-- Insert atomic_skill data for frameworks
INSERT INTO atomic_skill (levelID, name, category) VALUES
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frameworks' AND advancement_level = 1), 'Routing and controllers', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frameworks' AND advancement_level = 2), 'Authentication and Authorization', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frameworks' AND advancement_level = 3), 'Security best practices', 'Common');
