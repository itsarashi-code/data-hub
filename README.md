# The Data Hub — RESTful API Server

A RESTful Blog API built with Node.js and Express.js as part of Prodesk IT Internship — Sprint 09.

## Overview

The Data Hub is a backend REST API that provides CRUD operations for a mock Blog resource. The project uses an in-memory JavaScript array instead of a permanent database, as required by the sprint specification.

## Tech Stack

- Node.js
- Express.js
- JavaScript
- Thunder Client
- Git & GitHub

## Features

- Express server running on port 5000
- RESTful Blog API
- Create, Read, Update and Delete operations
- In-memory data storage
- Dynamic route parameters
- Custom request logging middleware
- Mock login endpoint
- JSON request/response handling
- API testing with Thunder Client

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all blog posts |
| GET | `/posts/:id` | Get a specific post |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post |
| POST | `/login` | Mock login and token response |

## Example POST Request

```json
{
  "id": 1,
  "title": "My First Post",
  "content": "Hello from Data Hub"
}