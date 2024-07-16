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


# Usage

Instructions on how to use the project.

# Wiki

For more information, check out the project's wiki under the link: https://github.com/Tivix/cpf/wiki

# swagger/redoc

Swagger and redoc can be accessed using following urls:
- http://0.0.0.0:8000/docs
- http://0.0.0.0:8000/redoc

# Contributing

Guidelines for contributing to the project.

- Fork the repository.
- Create a new branch.
- Make your changes.
- Commit your changes.
- Push to the branch.
- Open a pull request.

# License

Specify the license under which the project is distributed.

# Contact

Contact information for the project maintainer or team.

- Email: marcin.skorek@kellton.com, mateusz.jasinski@kellton.com
- GitHub: https://github.com/Tivix/cpf
