-- Custom types
CREATE TYPE public.app_role as enum ('admin', 'manager', 'employee');
CREATE TYPE public.profile_status as enum ('active', 'draft', 'deactivated');

-- Trigger function to handle new users
CREATE OR REPLACE FUNCTION handle_new_user()
returns trigger
security definer
as $$
begin
  -- Insert into public.profiles table, extracting first_name, last_name, and status from the raw_user_meta_data JSONB field
  insert into public.profiles (id, email, first_name, last_name, status)
  values (
    new.id,
    new.email,
    (new.raw_user_meta_data->>'first_name')::text,
    (new.raw_user_meta_data->>'last_name')::text,
    case
      when new.raw_user_meta_data ? 'status'
      then (new.raw_user_meta_data->>'status')::public.profile_status
      else null
    end
  );

  -- Insert into public.user_roles table with default role
  insert into public.user_roles (user_id, role)
  values (new.id, 'employee');

  -- Insert into user_ladder table with nulls if values are not provided
  insert into public.user_ladder (user_id, ladder_slug, current_band, technologies, is_main_ladder)
  values (
    new.id,
    (new.raw_user_meta_data->>'ladder_slug')::varchar,
    case
      when new.raw_user_meta_data ? 'current_band'
      then (new.raw_user_meta_data->>'current_band')::int
      else null
    end,
    case
      when new.raw_user_meta_data ? 'technologies'
      then string_to_array(
            replace(trim(both '[]' from (new.raw_user_meta_data->>'technologies')), '"', ''),
            ', '
          )
      else null
    end,
    case
      when new.raw_user_meta_data ? 'is_main_ladder'
      then (new.raw_user_meta_data->>'is_main_ladder')::boolean
      else null
    end
  );

  return new;

exception
  when others then
    -- Raise an exception to rollback the transaction
    raise exception 'Error occurred while inserting into profiles, user_roles, and user_ladder: %', SQLERRM;
end;
$$ language plpgsql;

-- Function returning a table of filtered employees
CREATE OR REPLACE FUNCTION get_employees_by_status(_status profile_status DEFAULT NULL, current_user_id UUID DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  email text,
  first_name text,
  last_name text,
  status profile_status,
  role app_role,
  ladder_slug varchar,
  current_band int,
  technologies text[],
  is_main_ladder boolean,
  ladder_name varchar,
  ladder_tech text[]
)
security definer
AS $$
BEGIN
  if current_user_id is not null then
    raise exception 'get_employees_by_status() ERROR: current_user_id not implemented yet';
  end if;

  RETURN QUERY

  SELECT
    u.id,
    p.email,
    p.first_name,
    p.last_name,
    p.status,
    ur.role,
    ul.ladder_slug,
    ul.current_band,
    ul.technologies,
    ul.is_main_ladder,
    l.ladder_name,
    l.ladder_tech
    FROM auth.users u
    JOIN profiles p ON u.id = p.id
    JOIN user_roles ur ON u.id = ur.user_id
    FULL OUTER JOIN user_ladder ul ON u.id = ul.user_id
    LEFT JOIN ladder l ON ul.ladder_slug = l.ladder_slug
    WHERE _status IS NULL or _status = p.status;

  exception
    when others then
      -- Raise an exception to rollback the transaction
      raise exception 'Error occurred while fetching employees data: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_all_bands_for_ladder(p_ladder_slug varchar)

  RETURNS TABLE(
    band_id INT,
    threshold INT,
    salary_range VARCHAR(50),
    band_number INT
       )
AS $$ BEGIN
  RETURN QUERY
  SELECT
    b.band_id,
    b.threshold,
    b.salary_range,
    b.band_number
  FROM public.band b WHERE ladder_slug = p_ladder_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_bands_for_user(p_user_id uuid)


-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
after insert on auth.users
for each row
execute function handle_new_user();


-- Create public USERS table
CREATE TABLE public.profiles (
  id          uuid references auth.users not null primary key, -- UUID from auth.users
  email       text not null,
  first_name text,
  last_name text,
  status      public.profile_status
);
comment on table public.profiles is 'Profile data for each user.';
comment on column public.profiles.id is 'References the internal Supabase Auth user.';

-- Create user roles table
CREATE TABLE public.user_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references auth.users on delete cascade not null,
  role      app_role not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles for each user.';

-- Create ladder table
CREATE TABLE ladder (
    ladder_slug VARCHAR(50) PRIMARY KEY,
    ladder_name VARCHAR(50) NOT NULL,
    ladder_tech TEXT[]
);

-- Create band table
CREATE TABLE band (
    band_id SERIAL PRIMARY KEY,
    ladder_slug VARCHAR(50) REFERENCES ladder(ladder_slug),
    threshold INT NOT NULL,
    salary_range VARCHAR(50) NOT NULL,
    band_number INT NOT NULL
);

-- Create bucket table
CREATE TABLE bucket (
    bucket_slug VARCHAR(50) PRIMARY KEY,
    bucket_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    bucket_type VARCHAR(50) NOT NULL
);

-- Create band_bucket table to link bands and buckets
CREATE TABLE band_bucket (
    band_id INT REFERENCES band(band_id),
    bucket_slug VARCHAR(50) REFERENCES bucket(bucket_slug),
    PRIMARY KEY (band_id, bucket_slug)
);

-- Create advancement_level table
CREATE TABLE advancement_level (
    level_id SERIAL PRIMARY KEY,
    bucket_slug VARCHAR(50) REFERENCES bucket(bucket_slug),
    advancement_level INT NOT NULL,
    description TEXT NOT NULL
);

-- Create example_project table
CREATE TABLE example_project (
    project_id SERIAL PRIMARY KEY,
    level_id INT REFERENCES advancement_level(level_id),
    title VARCHAR(200) NOT NULL,
    overview TEXT NOT NULL
);

-- Create atomic_skill table
CREATE TABLE atomic_skill (
    skill_id SERIAL PRIMARY KEY,
    level_id INT REFERENCES advancement_level(level_id),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT
);

-- Create user_ladder table to link users and ladders
CREATE TABLE user_ladder (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    ladder_slug VARCHAR(50) REFERENCES ladder(ladder_slug),
    current_band INT REFERENCES band(band_id),
    technologies TEXT[],
    is_main_ladder BOOLEAN
);

-- Create scores table to store users' points for advancement levels
CREATE TABLE scores (
    id SERIAL PRIMARY KEY,
    user_ladder_id INT REFERENCES user_ladder(id),
    level_id INT REFERENCES advancement_level(level_id),
    point BOOLEAN
);

-- Insert ladder data
INSERT INTO ladder (ladder_slug, ladder_name, ladder_tech) VALUES
('backend', 'Backend Developer', ARRAY[
  'python',
  'node.js',
  '.NET'
]),
('frontend', 'Frontend Developer', ARRAY[
  'react',
  'react native'
]),
('design', 'Designer', NULL);

-- Insert band data for backend
INSERT INTO band (ladder_slug, threshold, salary_range, band_number) VALUES
('backend', 3, '4000 - 8000 pln', 1),
('backend', 7, '6000 - 10000 pln', 2),
('backend', 13, '8000 - 12000 pln', 3),
('backend', 20, '10000 - 14000 pln', 4),
('backend', 28, '12000 - 16000 pln', 5),
('backend', 37, '14000 - 20000 pln', 6),
('backend', 48, '19000 - 24000 pln', 7),
('backend', 60, '21000 - 26000 pln', 8),
('backend', 65, '30000+ pln', 9);

-- Insert band data for frontend
INSERT INTO band (ladder_slug, threshold, salary_range, band_number) VALUES
('frontend', 2, '4000 - 7000 pln', 1),
('frontend', 6, '6000 - 9000 pln', 2),
('frontend', 11, '8000 - 11000 pln', 3),
('frontend', 15, '10000 - 13000 pln', 4),
('frontend', 23, '12000 - 15000 pln', 5),
('frontend', 35, '14000 - 18000 pln', 6),
('frontend', 50, '17000 - 21000 pln', 7),
('frontend', 55, '20000 - 24000 pln', 8),
('frontend', 60, '25000+ pln', 9);

-- Insert bucket data
INSERT INTO bucket (bucket_slug, bucket_name, description, bucket_type) VALUES
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
('backend_frameworks', 'Backend Frameworks', 'Backend development skills focusing on the developer\''s role in the selected language.', 'hard'),
('time_management', 'Time Management', 'Lorem ipsum', 'soft');


-- Insert band_bucket data for backend
INSERT INTO band_bucket (band_id, bucket_slug) VALUES
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 3), 'backend_programming_language'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 3), 'backend_frameworks'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 3), 'dynamic_data_and_systems_integration'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 3), 'time_management'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 7), 'relational_databases'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 7), 'debugging'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 7), 'cvs'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 13), 'application_scaffolding'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 13), 'code_testing'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 20), 'platform_cohesion'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 20), 'releases_ci_cd'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 20), 'operations'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 28), 'algorithmic_knowledge'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 28), 'performance_optimization'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 28), 'event_streaming_async_programming'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 37), 'non_relational_databases'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 37), 'application_architecture'),
((SELECT band_id FROM band WHERE ladder_slug = 'backend' AND threshold = 37), 'security');



-- Insert band_bucket data for frontend
INSERT INTO band_bucket (band_id, bucket_slug) VALUES
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 2), 'frontend_programming_language'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 2), 'browser_ui_language'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 6), 'frontend_frameworks'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 6), 'dynamic_data_and_systems_integration'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 6), 'cvs'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 11), 'application_scaffolding'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 11), 'debugging'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 11), 'code_testing'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 15), 'platform_cohesion'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 15), 'runtime_knowledge'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 23), 'performance_optimization'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 23), 'application_architecture'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 23), 'cross_platform_frontend'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 35), 'security'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 35), 'algorithmic_knowledge'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 35), 'releases_ci_cd'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 50), 'releases_ci_cd'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 55), 'releases_ci_cd'),
((SELECT band_id FROM band WHERE ladder_slug = 'frontend' AND threshold = 60), 'releases_ci_cd');

-- Insert advancement_level
INSERT INTO advancement_level (bucket_slug, advancement_level, description) VALUES
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
('backend_frameworks', 3, 'Lorem'),
('time_management', 1, 'Lorem ipsum dolores');

-- Insert example_project data for frameworks
INSERT INTO example_project (level_id, title, overview) VALUES
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'frontend_frameworks' AND advancement_level = 1), 'Project title: Building a Simple Library System', 'Lorem ipsum');

-- Insert atomic_skill data for frameworks
INSERT INTO atomic_skill (level_id, name, category) VALUES
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'HTML Fundamentals', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'HTML attributes and their usage', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'CSS Box Model and layout properties', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'Building basic display and input elements using native components', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'Handling basic user inputs', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'Responsive design', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'Familiarity with framework-specific UI libraries (antd, material-ui)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 1), 'Familiarity with CSS libraries (daisyui, tailwind, bootstrap)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Semantic HTML', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'a11y', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Reading, validating, transforming and sending user inputs to data consumers', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Fonts, typography and overall text management', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Basic animation skills (e.g. css animations with keyframes)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Basic SEO knowledge', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'SVGs', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Head and meta tags', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Atributes for data validation (min-length, pattern etc)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Responsive typography', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Cross-Browser compatibility', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Using iframes', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Theming and extending UI libraries', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'CSS in JS libraries knowledge (styled-components, emotion)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Ability to implement i18n and l10n in apps', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Mobile-first design principles', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Uderstanding of different pre-processors (LESS, SASS)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 2), 'Using variables, mixins and nesting', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'OG Tags', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'CSS architecture (e.g. BEM, atomic etc)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Advanced CSS (animations, transitions, gradients, gsap, react spring)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Shadow DOM and encapsulation', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Ability to implement complex design systems (with tools like Storybook)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Dynamic UI mastery (using skeletons, how to avoid spinner hell, jumping UIs etc)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Templating', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Setting up automated a11y tools (pa11y, axe)', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'browser_ui_language' AND advancement_level = 3), 'Deep knowledge of WCAG guidelines', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'frontend_programming_language' AND advancement_level = 1), 'Routing and controllers', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'frontend_programming_language' AND advancement_level = 2), 'Authentication and Authorization', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'frontend_programming_language' AND advancement_level = 3), 'Security best practices', 'Common'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'time_management' AND advancement_level = 1), 'Wykazuje osobiste zaangażowanie w realizację celów i rozwiązywanie problemów', 'Soft skill'),
((SELECT level_id FROM advancement_level WHERE bucket_slug = 'time_management' AND advancement_level = 1), 'Postępuje zgodnie z obowiązującymi w firmie standardami jakości.', 'Soft skill');
