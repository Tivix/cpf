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
('backend', 3, '4000 - 8000 pln'),
('backend', 7, '6000 - 10000 pln'),
('backend', 13, '8000 - 12000 pln'),
('backend', 20, '10000 - 14000 pln'),
('backend', 28, '12000 - 16000 pln'),
('backend', 37, '14000 - 20000 pln'),
('backend', 48, '19000 - 24000 pln'),
('backend', 60, '21000 - 26000 pln'),
('backend', 65, '30000+ pln');

-- Insert band data for frontend
INSERT INTO band (ladderSlug, threshold, salary_range) VALUES
('frontend', 2, '4000 - 7000 pln'),
('frontend', 6, '6000 - 9000 pln'),
('frontend', 11, '8000 - 11000 pln'),
('frontend', 15, '10000 - 13000 pln'),
('frontend', 23, '12000 - 15000 pln'),
('frontend', 35, '14000 - 18000 pln'),
('frontend', 50, '17000 - 21000 pln'),
('frontend', 55, '20000 - 24000 pln'),
('frontend', 60, '25000+ pln');

-- Insert bucket data
INSERT INTO bucket (bucketSlug, bucketName, description, bucketType) VALUES
('browser_ui_language', 'Browser UI Language', 'Frontend development skills focusing on the developer\''s role in the selected language.', 'hard'),
('frontend_programming_language', 'Frontend Programming Language', 'Frontend programming language skills are primarily focused on the developer\''s role in the selected language.', 'hard'),
('frontend_frameworks', 'Frontend Frameworks', 'Frontend development skills focusing on the developer\''s role in the selected language.', 'hard'),
('browser_knowledge', 'Browser Knowledge', 'Frontend development skills focusing on the developer\''s role in the selected language.', 'hard'),
('application_scaffolding', 'Application Scaffolding and maintenance', 'Application scaffolding', 'hard'),
('ui_ux_responsive_design', 'UI/UX & Responsive Design', 'UI/UX & Responsive Design', 'hard'),
('cvs', 'CVS', 'CVS', 'hard'),
('debugging', 'Debugging', 'Debugging', 'hard'),
('performance_optimization', 'Performance Optimization', 'Performance Optimization', 'hard'),
('dynamic_data_and_systems_integration', 'Dynamic Data & Systems Integration', 'Dynamic Data & Systems Integration', 'hard'),
('code_testing', 'Code Testing', 'Code Testing', 'hard'),
('application_architecture', 'Application Architecture', 'Application Architecture', 'hard'),
('security', 'Security', 'Security', 'hard'),
('runtime_knowledge', 'Runtime Knowledge', 'Runtime Knowledge', 'hard'),
('cross_platform_frontend', 'Cross Platform', 'Cross platform', 'hard'),
('platform_cohesion', 'Platform Cohesion', 'Platform Cohesion', 'hard'),
('algorithmic_knowledge', 'Algorithmic Knowledge', 'Algorithmic Knowledge', 'hard'),
('backend_programming_language', 'Backend Programming Language', 'Backend programming language skills are primarily focused on the developer\''s role in the selected language.', 'hard'),
('relational_databases', 'Relational Databases', 'Relational Databases', 'hard'),
('non_relational_databases', 'Non relational Databases', 'None relation databases', 'hard'),
('event_streaming_async_programming', 'Event streaming/async programming', 'Event streming/async programming', 'hard'),
('releases_ci_cd', 'Releases CI/CD', 'Releases CI/CD', 'hard'),
('operations', 'Operations', 'Operations', 'hard'),
('backend_frameworks', 'Backend Frameworks', 'Backend development skills focusing on the developer\''s role in the selected language.', 'hard');


-- Insert band_bucket data for backend
INSERT INTO band_bucket (bandID, bucketSlug) VALUES
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 3), 'backend_programming_language'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 3), 'backend_frameworks'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 3), 'dynamic_data_and_systems_integration'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 7), 'relational_databases'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 7), 'debugging'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 7), 'cvs'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 13), 'application_scaffolding'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 13), 'code_testing'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 20), 'platform_cohesion'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 20), 'releases_ci_cd'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 20), 'operations'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 28), 'algorithmic_knowledge'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 28), 'performance_optimization'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 28), 'event_streaming_async_programming'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 37), 'non_relational_databases'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 37), 'application_architecture'),
((SELECT bandID FROM band WHERE ladderSlug = 'backend' AND threshold = 37), 'security');



-- Insert band_bucket data for frontend
INSERT INTO band_bucket (bandID, bucketSlug) VALUES
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 2), 'frontend_programming_language'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 2), 'browser_ui_language'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 6), 'frontend_frameworks'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 6), 'dynamic_data_and_systems_integration'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 6), 'cvs'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 11), 'application_scaffolding'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 11), 'debugging'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 11), 'code_testing'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 15), 'platform_cohesion'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 15), 'runtime_knowledge'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 23), 'performance_optimization'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 23), 'application_architecture'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 23), 'cross_platform_frontend'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 35), 'security'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 35), 'algorithmic_knowledge'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 35), 'releases_ci_cd'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 50), 'releases_ci_cd'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 55), 'releases_ci_cd'),
((SELECT bandID FROM band WHERE ladderSlug = 'frontend' AND threshold = 60), 'releases_ci_cd');

-- Insert advancement_level
INSERT INTO advancement_level (bucketSlug, advancement_level, description) VALUES
('browser_ui_language', 1, 'A developer at ADV1 demonstrates a foundational understanding of UI/UX development. They have a grasp of HTML semantics, CSS box model, and responsive design principles. They can create simple, accessible layouts, and are aware of basic typography and color theory. Their skills include using CSS Flexbox and Grid, implementing basic user interactions, and ensuring basic web accessibility. They are comfortable with browser developer tools and can work on small-scale projects with guidance.'),
('browser_ui_language', 2, 'A developer at ADV2 is self-sufficient and possesses a solid knowledge of UI/UX development. They are proficient in advanced CSS selectors, transitions, and animations. They use CSS preprocessors and understand the importance of responsive images and cross-browser compatibility. They have experience with design systems, CSS frameworks, and basic version control. This developer can contribute effectively to larger projects, demonstrating a good understanding of UI component libraries and responsive design techniques.'),
('browser_ui_language', 3, 'A developer with ADV3 has deep knowledge and mastery in UI/UX development. They are proficient in CSS custom properties, advanced responsive techniques, and CSS architecture methodologies. They excel in performance optimization, utilizing techniques like lazy loading and code splitting. This developer is well-versed in CSS-in-JS solutions, microinteractions, and advanced web accessibility. They have experience with Progressive Web App (PWA) development, and understand internationalization and localization strategies. With a deep understanding of these concepts, they can lead and mentor others, contributing to complex projects with a focus on creating exceptional user experiences.'),
('frontend_programming_language', 1, 'Lorem ipsum dolores'),
('frontend_programming_language', 2, 'Lorem ipsum'),
('frontend_programming_language', 3, 'Lorem'),
('frontend_frameworks', 1, 'Lorem ipsum dolores'),
('frontend_frameworks', 2, 'Lorem ipsum'),
('frontend_frameworks', 3, 'Lorem'),
('browser_knowledge', 1, 'Lorem ipsum dolores'),
('browser_knowledge', 2, 'Lorem ipsum'),
('browser_knowledge', 3, 'Lorem'),
('application_scaffolding', 1, 'Lorem ipsum dolores'),
('application_scaffolding', 2, 'Lorem ipsum'),
('application_scaffolding', 3, 'Lorem'),
('ui_ux_responsive_design', 1, 'Lorem ipsum dolores'),
('ui_ux_responsive_design', 2, 'Lorem ipsum'),
('ui_ux_responsive_design', 3, 'Lorem'),
('cvs', 1, 'Lorem ipsum dolores'),
('cvs', 2, 'Lorem ipsum'),
('cvs', 3, 'Lorem'),
('debugging', 1, 'Lorem ipsum dolores'),
('debugging', 2, 'Lorem ipsum'),
('debugging', 3, 'Lorem'),
('performance_optimization', 1, 'Lorem ipsum dolores'),
('performance_optimization', 2, 'Lorem ipsum'),
('performance_optimization', 3, 'Lorem'),
('dynamic_data_and_systems_integration', 1, 'Lorem ipsum dolores'),
('dynamic_data_and_systems_integration', 2, 'Lorem ipsum'),
('dynamic_data_and_systems_integration', 3, 'Lorem'),
('code_testing', 1, 'Lorem ipsum dolores'),
('code_testing', 2, 'Lorem ipsum'),
('code_testing', 3, 'Lorem'),
('application_architecture', 1, 'Lorem ipsum dolores'),
('application_architecture', 2, 'Lorem ipsum'),
('application_architecture', 3, 'Lorem'),
('security', 1, 'Lorem ipsum dolores'),
('security', 2, 'Lorem ipsum'),
('security', 3, 'Lorem'),
('runtime_knowledge', 1, 'Lorem ipsum dolores'),
('runtime_knowledge', 2, 'Lorem ipsum'),
('runtime_knowledge', 3, 'Lorem'),
('cross_platform_frontend', 1, 'Lorem ipsum dolores'),
('cross_platform_frontend', 2, 'Lorem ipsum'),
('cross_platform_frontend', 3, 'Lorem'),
('platform_cohesion', 1, 'Lorem ipsum dolores'),
('platform_cohesion', 2, 'Lorem ipsum'),
('platform_cohesion', 3, 'Lorem'),
('algorithmic_knowledge', 1, 'Lorem ipsum dolores'),
('algorithmic_knowledge', 2, 'Lorem ipsum'),
('algorithmic_knowledge', 3, 'Lorem'),
('backend_programming_language', 1, 'Lorem ipsum dolores'),
('backend_programming_language', 2, 'Lorem ipsum'),
('backend_programming_language', 3, 'Lorem'),
('relational_databases', 1, 'Lorem ipsum dolores'),
('relational_databases', 2, 'Lorem ipsum'),
('relational_databases', 3, 'Lorem'),
('non_relational_databases', 1, 'Lorem ipsum dolores'),
('non_relational_databases', 2, 'Lorem ipsum'),
('non_relational_databases', 3, 'Lorem'),
('event_streaming_async_programming', 1, 'Lorem ipsum dolores'),
('event_streaming_async_programming', 2, 'Lorem ipsum'),
('event_streaming_async_programming', 3, 'Lorem'),
('releases_ci_cd', 1, 'Lorem ipsum dolores'),
('releases_ci_cd', 2, 'Lorem ipsum'),
('releases_ci_cd', 3, 'Lorem'),
('operations', 1, 'Lorem ipsum dolores'),
('operations', 2, 'Lorem ipsum'),
('operations', 3, 'Lorem'),
('backend_frameworks', 1, 'Lorem ipsum dolores'),
('backend_frameworks', 2, 'Lorem ipsum'),
('backend_frameworks', 3, 'Lorem');

-- Insert example_project data for frameworks
INSERT INTO example_project (levelID, title, overview) VALUES
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frontend_frameworks' AND advancement_level = 1), 'Project title: Building a Simple Library System', 'Lorem ipsum');

-- Insert atomic_skill data for frameworks
INSERT INTO atomic_skill (levelID, name, category) VALUES
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'HTML Fundamentals', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'HTML attributes and their usage', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'CSS Box Model and layout properties', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'Building basic display and input elements using native components', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'Handling basic user inputs', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'Responsive design', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'Familiarity with framework-specific UI libraries (antd, material-ui)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 1), 'Familiarity with CSS libraries (daisyui, tailwind, bootstrap)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Semantic HTML', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'a11y', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Reading, validating, transforming and sending user inputs to data consumers', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Fonts, typography and overall text management', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Basic animation skills (e.g. css animations with keyframes)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Basic SEO knowledge', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'SVGs', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Head and meta tags', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Atributes for data validation (min-length, pattern etc)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Responsive typography', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Cross-Browser compatibility', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Using iframes', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Theming and extending UI libraries', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'CSS in JS libraries knowledge (styled-components, emotion)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Ability to implement i18n and l10n in apps', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Mobile-first design principles', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Uderstanding of different pre-processors (LESS, SASS)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 2), 'Using variables, mixins and nesting', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'OG Tags', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'CSS architecture (e.g. BEM, atomic etc)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Advanced CSS (animations, transitions, gradients, gsap, react spring)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Shadow DOM and encapsulation', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Ability to implement complex design systems (with tools like Storybook)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Dynamic UI mastery (using skeletons, how to avoid spinner hell, jumping UIs etc)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Templating', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Setting up automated a11y tools (pa11y, axe)', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'browser_ui_language' AND advancement_level = 3), 'Deep knowledge of WCAG guidelines', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frontend_programming_language' AND advancement_level = 1), 'Routing and controllers', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frontend_programming_language' AND advancement_level = 2), 'Authentication and Authorization', 'Common'),
((SELECT levelID FROM advancement_level WHERE bucketSlug = 'frontend_programming_language' AND advancement_level = 3), 'Security best practices', 'Common');
