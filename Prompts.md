# AI Prompt Log — Sprint 09

## Prompt 1 — Understanding the Architecture

In this sprint, I need to build a RESTful API using Node.js and Express. 
Can you explain how an Express server, routes, middleware, and an in-memory data store work together in this project?

## Prompt 2 — REST API Design

I need to implement these Blog resource endpoints:
GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
DELETE /posts/:id

Can you explain the purpose of each HTTP method and how I should structure these routes in Express?

## Prompt 3 — Request Body Handling

My POST request needs to receive JSON data from Thunder Client. 
Why is `express.json()` required in Express, and where should it be placed?

## Prompt 4 — CRUD Logic

I am using `let blogPosts = []` as an in-memory database. 
How can I find a post by its ID, update it, and remove it using JavaScript array methods?

## Prompt 5 — Route Parameters

How does `req.params.id` work in a route such as `/posts/:id`, and why do I need to convert the ID when comparing it with a numeric ID stored in my array?

## Prompt 6 — Middleware

I need middleware that logs the HTTP method, URL and timestamp for every request. 
Can you explain how `next()` works and why it is necessary in this middleware?

## Prompt 7 — API Testing

What is a good testing sequence in Thunder Client for verifying a CRUD API?
I want to test Create → Read → Update → Delete and verify that the data changes correctly.

## Prompt 8 — Mock Authentication

The sprint requires a `/login` endpoint that returns a mock JWT string. 
What is the difference between a mock JWT response and implementing real JWT authentication?