# CPF

## Career Progression Framework Application

Kellton Europe CPF app is an innovative web-based platform – a seamless solution designed to connect employees, managers, and directors to facilitate the career development of each team member. This dynamic application empowers employees to track progress and milestones toward their chosen career paths. Managers and directors can easily oversee employee development, monitor assigned goals, and provide essential support for continuous growth. Experience enhanced collaboration and foster a thriving, goal-oriented work environment with a cutting-edge platform.

# Table of Contents

- Installation
- Usage
- Wiki
- Contributing
- Development
  - Frontend
- License
- Contact

# Installation

Instructions on how to install and set up the project.

1. Copy variables to `.env` files.
   ```
   cp .envexample .env
   ```

- for testing purposes you might want to change flag `USE_MOCK_USER` to `True`

1. Build and run the project
   ```
   docker compose build
   docker compose up
   ```
   or just
   ```
   docker compose up --build
   ```
2. Open http://0.0.0.0:8080/ with your browser to see the result.

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
   - `views` - Here we compose view together to create a page. If you want to extract some module of the page, create `modules` folder there and put it in it.
- `constants` - Contains all the constant values used in the app.
- `static`- Contains assets like icons.
- `types` - Contains all reusable types and interfaces that are shared between many pages and modules.
- `utils` - Contains all utility functions like data transformations or calculations.

### Component structure

Component folder should contain:

- `index.ts` - importing and exporting the component.
- `ComponentName.tsx` - view part of a component.
- `ComponentName.interface.ts` - types related to that component.
- `ComponentName.hooks.tsx` - the logic of our component

# License

Specify the license under which the project is distributed.

# Contact

Contact information for the project maintainer or team.

- Email: marcin.skorek@kellton.com, mateusz.jasinski@kellton.com
- GitHub: https://github.com/Tivix/cpf
