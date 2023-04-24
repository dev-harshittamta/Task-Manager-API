## Task Manager API

This is a simple API for managing tasks built with Node.js and Express.

# Installation

To install and run this project, follow these steps:

Clone this repository:

bash

- git clone https://github.com/dev-harshittamta/Task-Manager-API.git
- Install the dependencies:
- cd task-manager-api
- npm install

- PORT=7000
- DB_FILE=tasks.json
- PORT: The port number the server will listen on
- DB_FILE: The name of the file where tasks will be stored

# Start the server:

npm start
Open a web browser and navigate to http://localhost:7000/api/v1/tasks

# Usage

The API supports the following routes:

- GET /tasks: Get a list of all tasks
- GET /tasks/:id: Get a single task by ID
- POST /tasks: Create a new task
- PUT /tasks/:id: Update an existing task by ID
- DELETE /tasks/:id: Delete a task by ID
- GET /tasks/sort Get a sorted list of tasks by date.

All routes except GET /tasks and /tasks/sort require a JSON payload in the request body with the following format:

```json
{
  "name": "Task name",
  "id": 1,
  "completed": false
}
```
