# AI-Powered Helpdesk Project: Planning and Initial Setup Guide

This document is a practical learning guide based on the lessons covered so far. It is not a raw transcript. It removes the motivational filler and keeps the material that matters for understanding and reproducing the project setup.

The structure follows a progressive learning path. Each section starts from the current state of the project, explains the immediate problem, introduces one concept or action at a time, then shows what to create, what to ask Claude, what to verify, and what mistakes to watch for.

The project we are building is an AI-powered helpdesk system. The final product should receive support emails, create tickets, classify them with AI, generate or suggest replies, route complex cases to agents, and provide a dashboard for managing support work.

At this stage, the goal is not to build the full application. The goal is to define the product clearly, choose the stack, create the implementation plan, set up a minimal full-stack project, connect the frontend to the backend, configure Context7, initialize Git, install PostgreSQL, and configure Prisma.

---

## 1. Start from the real problem

Before writing code, we need to define what problem the software is supposed to solve.

The real problem is that a support team receives many emails every day. Agents manually read each message, understand the request, classify it, find or write a response, and then send that response back to the customer.

This process has two main weaknesses.

First, it is slow. If a customer writes outside the working hours of the support team, they may wait many hours before receiving a reply.

Second, many responses are repetitive. Teams often use canned replies, but canned replies feel impersonal. Even when they are correct, they can make the customer feel like nobody actually read their message.

The product idea is to build a ticket management system that uses AI to reduce this manual work. The system should read incoming support emails, create tickets, classify them, decide whether the knowledge base can answer them, generate a human-friendly response when possible, and route the ticket to a human agent when AI should not handle it alone.

The important learning point is this: we do not start by coding. We start by writing the project scope.

Create a file called:

```text
project-scope.md
```

Write the first version like this:

```md
# Project Scope

## Problem

We receive hundreds of support emails daily. Agents manually read, classify, and respond to each ticket, which is slow and often leads to impersonal canned responses.

## Solution

Build an AI-powered ticket management system that can automatically classify, respond to, and route support tickets, allowing faster and more personalized support while freeing agents to focus on complex issues.

## Features

- Receive support emails and create tickets
- Auto-generate human-friendly responses using a knowledge base
- Ticket list with filtering and sorting
- Ticket detail view
- AI-powered ticket classification
- AI-generated ticket summaries
- AI-suggested replies
- Admin-only user management
- Dashboard to view and manage all tickets
```

At this point, do not try to make the scope perfect. The purpose of this first file is to make the idea explicit. Once the idea is written down, Claude can help find gaps.

Checkpoint: by the end of this step, the project has a `project-scope.md` file that explains the problem, the proposed solution, and the initial feature list.

---

## 2. Use Claude to find missing requirements

Now the project has a rough scope, but that scope is incomplete. This is normal. A first draft usually describes the obvious parts of a system and misses the operational details.

The next problem is not technical yet. The problem is that the requirements are too vague.

For example, the first scope says that we will manage tickets. But what states can a ticket have? Is a ticket new, open, pending, resolved, or closed? The first scope does not say.

The first scope also says that AI will classify tickets. But classify by what? Category? Priority? Sentiment? Urgency? Again, the first scope does not say.

This is where Claude is useful as a thinking partner.

Ask Claude:

```text
Read @project-scope.md, review it, and ask me clarifying questions.
Help me find gaps or things I haven't thought through.
```

Claude will likely suggest several questions. Do not accept all of them automatically. The value is not that Claude gives final answers. The value is that Claude exposes decisions you have not made yet.

The instructor focuses on a few important clarifications.

The first clarification is ticket status. For this course, the ticket lifecycle is kept simple. Tickets can be:

```text
open
resolved
closed
```

This is enough for the current version. We are not adding a more complex workflow yet.

The second clarification is ticket classification. In this project, classification means assigning a ticket to one category. The initial categories are:

```text
general question
technical question
refund request
```

This gives the AI classification feature a concrete target. Without this decision, "classify the ticket" would remain too abstract.

The third clarification is user roles. The system will have only two roles:

```text
admin
agent
```

There is no need for supervisors, managers, or other roles in the MVP. Adding more roles would increase complexity without helping the course objective.

The fourth clarification is registration. This is a closed internal system. Customers do not register. Random users cannot sign up. The app is deployed with an initial admin user. That admin can create agents later.

The fifth clarification is customer access. Customers do not get a portal in this version. Communication happens through email only.

Now update `project-scope.md` so it reflects those decisions.

The updated file should look like this:

```md
# Project Scope

## Problem

We receive hundreds of support emails daily. Agents manually read, classify, and respond to each ticket, which is slow and often leads to impersonal canned responses.

## Solution

Build an AI-powered ticket management system that can automatically classify, respond to, and route support tickets, allowing faster and more personalized support while freeing agents to focus on complex issues.

## Features

- Receive support emails and create tickets
- Auto-generate human-friendly responses using a knowledge base
- Ticket list with filtering and sorting
- Ticket detail view
- AI-powered ticket classification
- AI-generated ticket summaries
- AI-suggested replies
- Admin-only user management
- Dashboard to view and manage all tickets

## Ticket Statuses

Tickets can have the following statuses:

- open
- resolved
- closed

## Ticket Categories

Each ticket belongs to a single category:

- general question
- technical question
- refund request

## User Roles

The system has two roles:

- admin
- agent

The application should be deployed with an initial admin user. The admin can then create additional agents.

Customers do not have portal access. All customer communication happens by email.
```

Checkpoint: by the end of this step, the scope is no longer only a vague product idea. It now includes the first operational decisions about ticket status, ticket categories, user roles, registration, and customer access.

Common Claude mistake: Claude may suggest too many roles, statuses, priorities, dashboards, or workflow features. Keep only what is useful now. The goal is to clarify the product, not to expand it without control.

---

## 3. Define the MVP

Now the scope is clearer, but the next question is: what goes into version 1?

This is the MVP decision. MVP means Minimum Viable Product. It is the smallest version of the product that still solves the core business problem.

The mistake many developers make, especially when using AI tools, is to add features just because AI can generate code quickly. That is dangerous. Code generation is only one part of software development. Even if Claude writes code quickly, you still have to read it, understand it, review it, test it, debug it, refine the UI, and maintain it later.

So the real cost of a feature is not only the time needed to generate it. The real cost includes validation, integration, testing, quality, and maintenance.

For this course, the instructor decides that the existing feature list is already enough for the MVP. Nothing extra is added.

The MVP is:

```md
# MVP

The MVP includes the following features:

- Receive support emails and create tickets
- Auto-generate human-friendly responses using a knowledge base
- Ticket list with filtering and sorting
- Ticket detail view
- AI-powered ticket classification
- AI-generated ticket summaries
- AI-suggested replies
- Admin-only user management
- Dashboard to view and manage all tickets
```

The guiding rule is:

```text
Build the smallest polished version that solves the core business problem.
Release it.
Get real feedback.
Then decide what to add next.
```

This matters because a small, well-tested product that solves the actual problem is better than a large product full of half-finished features.

Checkpoint: by the end of this step, you are not adding more features. You are explicitly deciding to keep version 1 small enough to build, test, and release.

Common Claude mistake: Claude may keep suggesting analytics, notifications, reporting, advanced dashboards, SLAs, multi-role workflows, or customer portals. These may be useful later, but they do not belong in the first implementation unless the business explicitly needs them.

---

## 4. Choose the tech stack

Now we know what we are building. The next problem is how to build it.

Ask Claude for a stack recommendation:

```text
Suggest a tech stack for this project.
```

Claude may suggest different options depending on the context. The instructor reviews the suggestions and chooses a stack that is simple enough for the course while still realistic for a modern full-stack application.

Create a file called:

```text
techstack.md
```

Write:

```md
# Tech Stack

## Frontend

React with TypeScript.

React Router will be used for client-side routing.

Tailwind CSS will be used for styling, but it will be introduced later when it is actually needed.

## Backend

Node.js with Express and TypeScript.

The backend is intentionally separate from the frontend. This keeps the architecture closer to many real company setups, where frontend and backend are often owned by different teams.

## Authentication

Database sessions.

Claude may suggest JWT, but this project will use session-based authentication stored in the database.

## Database

PostgreSQL.

## ORM

Prisma.

## AI

Claude API initially, with the understanding that a real business should compare Claude and GPT models based on quality, price, and suitability for the workload.

## Email Integration

SendGrid or Mailgun.

## Deployment

Docker plus a cloud provider.
```

The immediate decision that matters most here is separation of frontend and backend. The instructor does not use Next.js for this course, even though Next.js would also be a valid option. The reason is educational and architectural: Express keeps the backend explicit, and the separation helps students understand how a frontend communicates with an API.

React Router is selected instead of newer alternatives because it is widely known and keeps prerequisites low.

JWT is rejected in favor of database sessions. This decision will matter later in the authentication section.

Checkpoint: by the end of this step, the project has `techstack.md`, and the stack is clear enough to guide the setup.

Common Claude mistake: Claude may suggest a valid stack that does not match the course. For example, it may suggest Next.js, JWT, MySQL, or Docker-first development. These are not necessarily wrong, but if you want to follow the course, align with the instructor's stack.

---

## 5. Create the implementation plan

Now the product scope and stack exist, but we still need an order of execution.

The next problem is sequencing. Some features depend on other features. For example, ticket classification cannot be built before tickets exist. AI summaries cannot be meaningful before there are conversations or messages to summarize.

Ask Claude:

```text
Create an implementation plan.
Break the project into small tasks and group them into phases.
```

Claude suggests a plan similar to this:

```md
# Implementation Plan

## Phase 1: Project Setup

Set up the monorepo, frontend, backend, tooling, environment variables, and basic project structure.

## Phase 2: Authentication

Implement login, logout, sessions, protected routes, and the basic authentication flow.

## Phase 3: User Management

Allow admins to create and manage agents.

## Phase 4: Ticket CRUD Operations

Implement the core ticket management workflow: listing tickets, viewing ticket details, filtering and sorting tickets, updating ticket status, and assigning tickets to agents.

## Phase 5: AI Features

Add AI-powered ticket classification, suggested replies, ticket summaries, and generated responses using the knowledge base.

## Phase 6: Email Integration

Receive support emails, create tickets from emails, and send responses back to customers.

## Phase 7: Dashboard

Build a dashboard to view and manage ticket activity.

## Phase 8: Polish and Deployment

Refine the UI, test the app, fix bugs, containerize with Docker, and deploy.
```

Save this as:

```text
plan.md
```

The plan is useful, but it is not sacred. Claude gives a technically reasonable order, but real business priorities can change that order.

For example, user management may not be urgent in a real small company. The instructor could deploy the system with one admin user and one agent user and postpone the user management UI until later. In that case, ticket management would be more important than user management.

However, the course keeps the suggested order mainly for educational reasons. It lets the project grow in a clean sequence.

Checkpoint: by the end of this step, the project has `plan.md`, and you have a phase-by-phase path to follow.

Common Claude mistake: Claude may generate a plan that looks impressive but is too broad. Review it. Ask whether each phase depends on previous phases and whether the order makes sense for the business.

---

## 6. Start Phase 1 carefully

The first implementation phase is project setup. This is where we create the basic full-stack application.

The first important correction is that not everything in the generated Phase 1 should actually be done now. Claude may include Tailwind, React Router, Prisma models, user models, ticket models, sessions, and database seeds in the setup phase. The instructor intentionally delays many of these.

The immediate goal of Phase 1 is smaller.

We need a monorepo with two folders:

```text
client/
server/
```

The backend should be an Express TypeScript app.

The frontend should be a React TypeScript app.

The package manager should be Bun.

The server should expose a small health check endpoint.

The client should call that health check endpoint, so we can prove that frontend and backend can communicate.

We do not need Tailwind yet. We do not need React Router yet. We do not need Prisma models yet. We do not need a seeded admin user yet.

This is the first example of the course's practical discipline: do not introduce complexity before it is needed.

Ask Claude:

```text
Create a full-stack project with Express, React, TypeScript, and Bun.
I want to use Bun as my package manager.
Also, use Context7 for getting up-to-date documentation.
```

Expected project shape:

```text
helpdesk/
  client/
  server/
  project-scope.md
  techstack.md
  plan.md
```

Claude may take a couple of minutes to create the setup.

Checkpoint: by the end of this step, you should have separate `client` and `server` folders.

Common Claude mistake: Claude may generate extra demo routes, sample todo endpoints, sample user endpoints, or styling that you did not ask for. Remove those. Keep the setup minimal.

---

## 7. Understand the Express server

After Claude creates the project, inspect the backend before running it.

A typical Express server file should be in a path like:

```text
server/src/index.ts
```

The code should be conceptually close to this:

```ts
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

Understand each piece before moving on.

`express()` creates the server application.

`process.env.PORT || 3000` means the server will use a port from the environment if one exists. If not, it will use `3000`.

`cors()` enables Cross-Origin Resource Sharing. This matters because the React app and Express server run on different ports during development. Without CORS, the browser may block requests from the frontend to the backend.

`express.json()` lets Express parse incoming JSON request bodies.

`/api/health` is a health check endpoint. It is not a business feature. Its job is only to prove that the server is alive.

If Claude did not create the health check endpoint, ask:

```text
Create a simple health check endpoint at /api/health.
```

Checkpoint: by the end of this step, you understand that the backend is not doing helpdesk work yet. It only proves that the server can run and answer a basic request.

Common Claude mistake: Claude may create routes for todos, tasks, users, or other examples. Delete them. At this stage, the only endpoint you need is `/api/health`.

---

## 8. Understand the React client

Now inspect the frontend.

The app should be a basic React TypeScript application. The main component may be in:

```text
client/src/App.tsx
```

At first, the component can be almost empty. That is fine.

If Claude generated lots of CSS or a decorative homepage, do not keep it unless it serves the current setup. This is not the UI phase yet.

If there is an `App.css` file full of generated styles, it is acceptable to clear it.

Checkpoint: by the end of this step, the frontend exists, but it is still intentionally simple.

Common Claude mistake: Claude may over-design the homepage. Remove anything that distracts from the current goal, which is only to verify client-server communication.

---

## 9. Run the server and client

Now run both apps.

You can do this manually using two terminals.

In one terminal, run the backend:

```bash
cd server
bun run dev
```

In another terminal, run the frontend:

```bash
cd client
bun run dev
```

The instructor sometimes asks Claude to run both apps instead of doing it manually:

```text
Run both apps.
```

This costs a few extra tokens, but keeps the workflow inside Claude.

Do not add `concurrently` yet. It could be useful later, but it is not needed now. Adding it now would be premature complexity.

Checkpoint: by the end of this step, the server and client should both be running on different local ports.

---

## 10. Verify the backend directly

Before checking the frontend, verify the backend directly in the browser.

The root URL may not have a route. That is fine.

Open:

```text
http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

If you see this, the backend is running correctly.

If you do not see this, fix the backend before continuing. Do not continue to frontend integration until the backend health endpoint works on its own.

Checkpoint: the server has been verified independently.

---

## 11. Connect the React client to the Express backend

Now the backend works. The next problem is whether the frontend can reach it.

Ask Claude:

```text
In the client app, in the App component, write code to call the health check API and display a message.
```

A simple version of `App.tsx` can look like this:

```tsx
import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main>
      <h1>Helpdesk</h1>
      <p>Service status: {status}</p>
    </main>
  );
}

export default App;
```

This is not final production code. It is only a connectivity test.

Open the frontend in the browser. You should see something like:

```text
Service status: ok
```

If you see this, the frontend can talk to the backend.

This confirms that the Express server is running, the health endpoint works, the frontend fetch call works, and CORS is configured correctly.

Checkpoint: this is the first working full-stack proof. React can call Express.

Common Claude mistake: Claude may hide errors or create a more complicated UI. Keep it simple. You only need to display whether the backend health check worked.

---

## 12. Configure Context7 for current documentation

Context7 is used so Claude can fetch up-to-date documentation for libraries.

The instructor initially assumes Context7 is already configured, then realizes it was configured in a previous project, not this one.

The current problem is that Claude needs access to current library docs inside this project.

The process is:

First, go to the Context7 dashboard.

Create a new API key for this project. The instructor names it something like:

```text
helpdesk
```

Then copy the command that runs the local MCP setup.

Run that command in the terminal and replace the placeholder API key with your real API key.

After installing or adding the MCP server, restart Claude.

Then resume the previous Claude session.

Check the MCP configuration.

You want to see that the Context7 MCP server is connected.

If the first attempt fails, do not panic. The instructor also has to retry. Exit Claude, run the setup command again with the API key, restart Claude, resume the session, and check again.

Checkpoint: Context7 should be visible as a connected MCP server.

Important: never commit the real Context7 API key to source control.

---

## 13. Create the CLAUDE.md project memory file

Now Context7 exists, but you do not want to repeat "use Context7" in every prompt.

The next problem is persistence. Claude needs project-level instructions.

Create:

```text
CLAUDE.md
```

Ask Claude:

```text
Create the project memory file, CLAUDE.md.
Add Context7 to fetch up-to-date documentation.
```

This prompt can be misunderstood. In the lesson, Claude interprets it as an instruction to install Context7 again instead of simply documenting the instruction in `CLAUDE.md`.

If that happens, correct it with a clearer prompt:

```text
Do not install Context7.
Update CLAUDE.md and add an instruction that Claude should use the Context7 MCP server to fetch up-to-date documentation when working with libraries.
```

A good `CLAUDE.md` should contain something like this:

```md
# Project Overview

This is an AI-powered ticket management system that uses AI to classify, respond to, and route support tickets.

## References

- project-scope.md
- techstack.md
- plan.md

## Tech Stack

- React
- TypeScript
- Express
- Bun
- PostgreSQL
- Prisma

## Project Structure

- client/
- server/

## Development Conventions

Use Bun as the runtime and package manager.

Use TypeScript throughout the project.

Use the Context7 MCP server to fetch up-to-date documentation for libraries.
```

The immediate function of this file is practical: it gives Claude persistent context about the project, the stack, the structure, and the conventions.

Checkpoint: by the end of this step, the project has `CLAUDE.md`, and Claude has a written instruction to use Context7 for up-to-date documentation.

Common Claude mistake: Claude may install or reconfigure something when you only wanted it to document a convention. Read the generated file and correct it manually if needed.

---

## 14. Initialize Git

Now the initial project setup works. The frontend and backend exist. The client can call the server. Context7 is configured. `CLAUDE.md` exists.

The next step is to save the state of the project.

Run:

```bash
git init
git add .
git commit -m "Initial commit"
```

This creates the first Git checkpoint.

The important habit is to commit after a meaningful working state. Do not wait until the project is large and unstable.

Checkpoint: by the end of this step, the repository has an initial commit.

---

## 15. Install PostgreSQL

The next lesson moves to PostgreSQL.

If PostgreSQL is already installed on your machine, you can skip the installation part.

If not, install it from the official PostgreSQL website.

Go to:

```text
https://www.postgresql.org/download/
```

Choose the installer for your operating system.

During installation, keep the default installation path unless you have a reason to change it.

When the installer asks about additional tools, make sure `pgAdmin` is selected. `pgAdmin` is a graphical interface for managing PostgreSQL databases. The instructor recommends selecting all bundled tools.

The installer will ask for a password for the database admin user. Choose a secure password and save it somewhere safe. You will need it later.

Keep the default PostgreSQL port unless you have a specific reason to change it.

The default port is:

```text
5432
```

Checkpoint: by the end of this step, PostgreSQL should be installed locally, and you should know the admin password.

Important: if Claude later fails to detect your local PostgreSQL installation, that does not necessarily mean PostgreSQL is missing. Claude can be wrong about your local environment.

---

## 16. Understand what Prisma is for

Now PostgreSQL exists, but the application does not yet have a clean way to talk to it.

The next problem is database access.

Prisma is introduced as the database toolkit for this project. In this course, its most important role is ORM.

ORM means Object-Relational Mapper.

The basic idea is simple. PostgreSQL stores data in relational tables. TypeScript code works with objects. Prisma sits between them and gives the application a typed client for reading and writing database records.

Instead of manually writing SQL for every database operation, the backend will use Prisma Client.

Prisma also manages schema definitions and migrations. A migration is a set of SQL changes that brings the database structure in line with the models defined in the Prisma schema.

Before configuring Prisma, install the Prisma extension in VS Code. This helps with syntax highlighting, formatting, and working with Prisma schema files.

Checkpoint: before running Prisma setup, understand the role of Prisma. It is the bridge between the TypeScript backend and the PostgreSQL database.

---

## 17. Set up Prisma with PostgreSQL

Ask Claude:

```text
Set up Prisma with Postgres.
Connect the app to the helpdesk database.
```

Claude may first check whether PostgreSQL is installed.

In the lesson, Claude makes a mistake. It does not realize that PostgreSQL is already installed locally, so it suggests installing PostgreSQL with Docker.

Do not accept that automatically.

Docker is not needed at this stage.

If Claude offers installation options and you already have PostgreSQL, tell it:

```text
I already have Postgres installed.
```

Then let Claude initialize Prisma.

It will likely use `bunx`, which is Bun's equivalent of `npx`.

The initialization command is:

```bash
bunx prisma init
```

Then Prisma Client can be generated with:

```bash
bunx prisma generate
```

Claude may install these dependencies:

```text
prisma
@prisma/client
dotenv
```

Here is what each one is for.

`prisma` is the Prisma CLI and development toolkit.

`@prisma/client` is the generated client that the backend imports and uses to query the database.

`dotenv` reads environment variables from `.env` and makes them available through `process.env`.

Checkpoint: by the end of this step, Prisma should be initialized inside the backend, and Prisma Client should be generated.

Common Claude mistake: Claude may push you toward Docker or Homebrew even when PostgreSQL is already installed. Correct the assumption instead of following the wrong setup path.

---

## 18. Understand the DATABASE_URL environment variable

Prisma needs to know how to connect to PostgreSQL. That connection string is stored in an environment variable called `DATABASE_URL`.

Claude will create or update a `.env` file inside the server project.

The file may be:

```text
server/.env
```

A simple local connection string may look like:

```env
DATABASE_URL="postgresql://localhost:5432/helpdesk"
```

Depending on your PostgreSQL setup, you may need a username and password. A more explicit format is:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/helpdesk"
```

For a typical local PostgreSQL installation using the default admin user, it may look like this:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/helpdesk"
```

Replace `your_password` with the password you created during PostgreSQL installation.

The `.env` file should not be committed to source control. It can contain secrets such as database passwords, API keys, session secrets, and provider credentials.

Checkpoint: by the end of this step, the backend has a `.env` file containing `DATABASE_URL`.

Important: if the database does not exist yet, you may need to create a PostgreSQL database named `helpdesk`. You can do this through `pgAdmin` or with a PostgreSQL command-line tool. The lesson focuses on configuring Prisma, but the connection string assumes a database with that name.

---

## 19. Create .env.example

There is a practical problem with `.env`.

The real `.env` file should not be committed, but other developers need to know which environment variables are required.

The solution is to create:

```text
server/.env.example
```

This file documents the required variables without exposing real secrets.

You can copy `.env`, rename the copy to `.env.example`, and replace secrets with placeholders.

For this project, the example can be:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/helpdesk"
```

Or, if you prefer a safer empty placeholder:

```env
DATABASE_URL=""
```

The instructor keeps the local value in the example because the shown value does not contain sensitive credentials. In a real project, avoid committing real passwords or real API keys.

Checkpoint: by the end of this step, the repository contains `.env.example`, but not the real `.env`.

---

## 20. Understand the Prisma files

After setup, inspect the files Prisma created.

The most important file is the Prisma schema, usually located at:

```text
server/prisma/schema.prisma
```

It should include a generator and a datasource.

A minimal version looks like:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The `generator client` block tells Prisma to generate Prisma Client.

The `datasource db` block tells Prisma that the database provider is PostgreSQL and that the connection string should be read from `DATABASE_URL`.

Later, this file will define models such as users, tickets, messages, and sessions.

For now, do not add those models unless the current phase requires them.

The instructor explicitly avoids adding initial models during the project setup phase. User models belong to the user or authentication phase. Ticket models belong to the ticket management phase. Session models belong to the authentication phase.

Checkpoint: by the end of this step, you understand that `schema.prisma` is where the database model will eventually live, but you are not rushing to define future models yet.

Common Claude mistake: Claude may create example models such as `User`, `Post`, `Todo`, `Task`, or other demo entities. Remove anything that does not belong to the current step.

---

## 21. Understand Prisma migrations

The course introduces the migration concept before using it heavily.

The workflow is:

```text
Define or update models in schema.prisma.
Create a migration.
Apply that migration to the database.
Generate or update Prisma Client.
Use Prisma Client from the backend.
```

A migration is a set of SQL instructions that changes the database structure.

For example, when a `Ticket` model is eventually added, the migration will create the corresponding `Ticket` table in PostgreSQL.

The immediate lesson is not to memorize every Prisma command. The immediate lesson is to understand the direction of flow:

```text
Prisma schema defines the intended database structure.
Migrations update the real database.
Prisma Client lets TypeScript code talk to that database.
```

Checkpoint: you should understand what migrations are before the course starts creating real models.

---

## 22. Create a reusable Prisma Client export

Claude may create a database utility file in the server source folder.

A likely path is:

```text
server/src/db.ts
```

The file should export a Prisma Client instance:

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

This gives the backend one reusable object for talking to the database.

Later, API routes or services will import `prisma` from this file instead of creating new Prisma Client instances everywhere.

Checkpoint: by the end of this step, the backend has a simple Prisma Client export.

Common Claude mistake: Claude may scatter Prisma Client creation across multiple files. Prefer one shared export unless there is a specific reason to do otherwise.

---

## 23. Commit the Prisma setup

Once Prisma is configured and unnecessary generated code has been removed, commit the work.

Run:

```bash
git add .
git commit -m "Add Prisma"
```

This creates a clean checkpoint after the database tooling setup.

Checkpoint: by the end of this step, Git contains a commit for the initial app setup and another commit for Prisma.

---

## 24. Current expected project state

At this point, the project should contain these planning files:

```text
project-scope.md
techstack.md
plan.md
CLAUDE.md
```

It should contain a frontend folder:

```text
client/
```

It should contain a backend folder:

```text
server/
```

The backend should expose:

```text
GET /api/health
```

The frontend should call:

```text
http://localhost:3000/api/health
```

The frontend should display something equivalent to:

```text
Service status: ok
```

The backend should have Prisma configured.

The backend should have an environment variable for the database connection:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/helpdesk"
```

The repository should include an example environment file:

```text
server/.env.example
```

The repository should not commit the real `.env` file.

The repository should have at least these Git commits:

```text
Initial commit
Add Prisma
```

This is the correct stopping point before moving on to the next section of the course.

---

## 25. The core discipline of the workflow

The most important technical habit in these lessons is not React, Express, PostgreSQL, or Prisma. The most important habit is controlled progression.

At every step, ask:

```text
What is the current problem?
What is the smallest useful change?
How do I verify that it worked?
What generated code should I remove?
What should I postpone until the proper phase?
```

This is why Tailwind and React Router are postponed. They are useful, but not needed to prove that the client and server can communicate.

This is why Prisma models are postponed. They are necessary later, but not needed before the application reaches authentication, users, sessions, or tickets.

This is why generated demo routes are removed. They create noise and false progress.

This is why the health check endpoint is useful. It gives a minimal, objective way to verify that the backend works.

This is why the client calls the health check endpoint. It proves the first real full-stack connection before any business complexity is added.

This is also why Claude must be reviewed constantly. Claude is powerful, but it can overbuild, assume the wrong local environment, create unnecessary examples, or misunderstand project memory instructions.

The developer remains responsible for direction, scope, quality, and sequencing.
