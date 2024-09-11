# CPF

## Career Progression Framework Application

Kellton Europe CPF app is an innovative web-based platform –
a seamless solution designed to connect employees,
managers, and directors to facilitate the career development of each team member.
This dynamic application empowers employees
to track progress and milestones toward their chosen career paths.
Managers and directors can easily oversee employee development, monitor assigned goals,
and provide essential support for continuous growth.
Experience enhanced collaboration and foster a thriving,
goal-oriented work environment with a cutting-edge platform.

# Table of Contents

- Cloning and Initializing
- Installation
- Usage
- Wiki
- Contributing
- Development
  - Frontend
  - Backend
- License
- Contact

## Cloning and Initializing the Repository with Submodules

When you clone a repository that includes submodules, you need to ensure that the submodules are initialized and updated to the correct versions. This guide will walk you through the steps to properly clone and initialize a repository with submodules.

### Cloning the Repository

To clone the repository along with its submodules, use the `--recurse-submodules` flag. This ensures that all submodules are cloned and initialized automatically.

Step 1:

```
git clone --recurse-submodules git@github.com:Tivix/cpf.git
```

Step 2:

```
cd cpf
```

### Initializing Submodules in an Already Cloned Repository

If the repository has already been cloned without the --recurse-submodules flag, you can manually initialize and update the submodules using the following commands:

#### 1. Initialize the Submodule

```
git submodule init
```

#### 2. Update the Submodule

```
git submodule update
```

# Installation

Instructions on how to install and set up the project.

#### Copy variables to `.env` files.

```
cp .envexample .env
```

for testing purposes you might want to change flag `USE_MOCK_USER` to `True`

#### Build and run the project

```
docker compose build
docker compose up
```

or just

```
docker compose up --build
```

After you have done the above steps, you should be able to access the application.

##### Supabase admin panel

[localhost:8080](http://localhost:8080)

##### CPF Frontend application

[localhost:8080/cpf](http://localhost:8080/cpf)

### Seeding the database

To seed your database with initial data once your project is up and running, follow these steps:

```
docker compose run --rm dbmate up
```

### Migrations

For database migrations we use [dbmate](https://github.com/amacneil/dbmate/tree/main)

To create new migration:

```
docker compose run --rm dbmate new {migration_name}
```

Apply migrations:

```
docker compose run --rm dbmate up
```

Rollback the latest migration:

```
docker compose run --rm dbmate new {migration_name}
```

# Supabase

### User Creation Flow

Users can be added to the app through various methods:

1. **Supabase Panel**: Go to `localhost:8080` to create a user directly in the Supabase dashboard - authentication tab.
2. **Directly from a Browser**: Go to `localhost:8080/cpf/auth` to create a user via a authentication flow.
3. **Add Employee flow**: Employees can be added through the dashboard at `localhost:8080/cpf/people/add-new`. The default password is `password`.

### Automated Backend Processes

When a user is created through any of these methods, the following processes occur:

1. Supabase automatically creates a new user in the `auth.users` table.
2. The `auth.users` table has an `on_auth_user_created` trigger that fires `AFTER INSERT`. This trigger calls the `on_auth_user_created` function to handle following:
   - **Profile Creation**:
     - Inserts a new record into the `public.profiles` table.
     - Extracts the `first_name`, `last_name`, and `status` from the `raw_user_meta_data` field, if provided.
     - The `status` field is an `public.profile_status` enum. If not provided, it remains `NULL`.
   - **Role Assignment**:
     - Inserts a new entry into the `public.user_roles` table.
     - The default role assigned is `employee`.
   - **Ladder Information**:
     - Inserts a new entry into the `public.user_ladder` table with optional fields `ladder_slug`, `current_band`, `technologies`

# Usage

Instructions on how to use the project.

# Wiki

For more information, check out the project's wiki under the link: https://github.com/Tivix/cpf/wiki

# Contributing

Guidelines for contributing to the project.

- Fork the repository.
- Create a new branch.
- Make your changes.
- Commit your changes.
- Push to the branch.
- Open a pull request.

# Development

## Frontend

### Folder structure

- `api` - Contains api calls.
- `app`- The App Router by Next.js.
- `components` - Contains all components used in the app.
  - `common` - In the common folder, we keep all essential components like Button, Card, or Input.
  - `modules` - Here we keep more complex components that are still reusable or are part of layouts.
  - `pages` - Here we compose view together to create a page. If you want to extract some module of the page, create `modules` folder there and put it in it.
- `constants` - Contains all the constant values used in the app.
- `static`- Contains assets like icons.
- `store` - Contains all stores for state management.
- `types` - Contains all reusable types and interfaces that are shared between many pages and modules.
- `utils` - Contains all utility functions like data transformations or calculations.

### Component structure

Component folder should contain:

- `index.ts` - importing and exporting the component.
- `ComponentName.tsx` - view part of a component.
- `ComponentName.interface.ts` - types related to that component.
- `ComponentName.hooks.tsx` - the logic of our component

## Backend

### swagger/redoc

Swagger and redoc can be accessed using following urls:

- http://0.0.0.0:8000/docs
- http://0.0.0.0:8000/redoc

# License

Specify the license under which the project is distributed.

# Contact

Contact information for the project maintainer or team.

- Email: marcin.skorek@kellton.com, mateusz.jasinski@kellton.com
- GitHub: https://github.com/Tivix/cpf
