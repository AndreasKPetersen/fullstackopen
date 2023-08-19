# Application

The application is being developed in Python.

## Common steps

The common steps of linting, testing, and building are handled using the following tools when developing applications in Python.

### Linting

This step is responsible for code quality and conformity to coding standards. A popular tool is `flake8`, which checks for PEP8 compliance, and it can be integrated into the CI pipeline.

### Testing

The most widely used testing framework is `pytest`, which allows developers to run unit and integration tests, and it can be integrated into the CI pipeline.

### Building

Python is an interpreted language, which means a building step is not strictly necessary. However, `setuptools` can be used for packaging and distribution.

## Alternatives to Setting up CI

The alternatives to setting up CI besides Jenkins and GitHub Actions are:

- **Travis CI:** A cloud-based option widely used for open-source projects. It integrates well with GitHub repositories and supports Python projects.
- **CircleCI:** A cloud-based option offering customizable workflows and supports Python projects.

## Choosing between Self-hosted and Cloud-based

In order to choose either a self-hosted or cloud-based environment, it helps to know more about the following:

- Is the team skilled enough to handle a self-hosted environment?
- Is the application using sensitive information?
- Is it a small or large application?

If no further information was given, I would go with the cloud-based environment, assuming it is a small to medium-sized application based on the size of the team.
