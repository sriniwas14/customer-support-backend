# Customer Support Ticket

## Setup Guide

### Docker

To start the application with Docker

```bash
docker compose up
```

### Other

To setup the service on your own environment

#### Setting up the environment

Create a `.env` file in the project directory, given below is a sample config you can start with

```env
MONGODB_URI=mongodb://mongo:27017/csticket
PORT=3000
JWT_SECRET='somesecret'
MYSQL_HOST=mysql
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DATABASE=csticket
RABBITMQ_URI=amqp://defuser:defpass@rabbitmq:5672

```

After setting up the environment, make sure you setup you mysql database by running the `migrations/init.sql` script on your environment.

Install the npm modules by running `npm install`

Finally start the application with `npm run dev`

## Rest Endpoints

### User Endpoints

| HTTP Method | Endpoint  | Description                              | Required Fields                                                                                           |
| ----------- | --------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| POST        | `/`       | Create a new agent                       | - `phone` (String, required, unique) - `email` (String, required, unique) - `password` (String, required) |
| POST        | `/signin` | Sign in an agent with email and password | - `email` (String, required) - `password` (String, required)                                              |

### Ticket Endpoints

| HTTP Method | Endpoint     | Description               | Required Fields                                                                                |
| ----------- | ------------ | ------------------------- | ---------------------------------------------------------------------------------------------- |
| POST        | `/`          | Create a new ticket       | - `user_id` (String, required) - `title` (String, required) - `description` (String, required) |
| GET         | `/`          | Get all tickets           | None                                                                                           |
| GET         | `/:ticketID` | Get a single ticket by ID | None                                                                                           |
| PUT         | `/:ticketID` | Update a ticket by ID     | - `status` (String, if user type is 'agent')                                                   |

### Agent Endpoints

| HTTP Method | Endpoint  | Description                              | Required Fields                                                                                           |
| ----------- | --------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| POST        | `/`       | Create a new agent                       | - `phone` (String, required, unique) - `email` (String, required, unique) - `password` (String, required) |
| POST        | `/signin` | Sign in an agent with email and password | - `email` (String, required) - `password` (String, required)                                              |

## Notes

When using the docker setup go to `http://localhost:15672/` to monitor rabbitmq
