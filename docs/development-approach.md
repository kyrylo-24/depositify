# Development Approach

Back to [README](../README.md)

> For this project, I've decided to focus on setting up frontend and backend apps in a monorepo structure with proxy server and dockerised setup. I've added a couple different tests to showcase different approaches to testing: unit and integration tests for backend, and unit and E2E tests for frontend.x

## 1. Project Structure

Depositify is organized as a monorepo using Turborepo and npm workspaces. Why monorepo?

Pros:

- Shared components, utilities, types, etc.
- Easy to develop and test shared libraries and then use them in the frontend and backend.
- Easier to onboard new developers, they don't need to setup multiple projects and figure out how to run / build / test them.

Cons:

- Could be hard to setup monorepo for the first time, especially if team is not familiar with it.
- CI/CD setup could be a bit more complex, but Turborepo makes it easier.

## 2. Tech Stack

### Frontend

**TypeScript** - I use Typescript by default for new projects, type safety goes whroom!

**Vue 3** - I wanted to try out Vue 3 and it's new composable API, so I decided it's a good chance to use it. Last time I used Vue it was version 2 for a startup project, so I had quite a few expereince with it.

I'd pick it for small to medium size projects, fairly easy to onboard new developers, good performance and easy to learn. Version 3 seems to be more performant and has better DX than 2.

Vuex -> Pinia change was a breath of fresh air, really like the new syntax and composition API is really nice.

Alternatives:

React - industry standard, but I wanted to try something new. Also, I find that for new small - medium size projects React is a bit of overkill and tends to be over-engineered. If there's no need for specific React features / ecosystem it's just easier to develop with Vue / Svelte.

Svelte - second candidate, would be great alternative, especially with SvelteKit.

Angular - never used it commercially, so it would have pretty high learning curve to start new project with.

**VueUse** for composable utilities - nice collection of useful composables

### Backend

**TypeScript** - typesafety still goes whroom!

**Nest.js** - my go to Node.js framework, it's battle tested and has a huge community. Especially I like that it's opinionated and has a huge set of tools and plugins out of the box. No need to reinvent the wheel with another Express.js custom project architecture.

**REST API** - I've been a fan of GraphQL for a while, but recently came to conclusion that for most of the projects REST API is more than enough. GraphQL is a great tool and provides quite a lot of cool features, but requires more overhead to setup and maintain. Also, it's very improtant that all devs on the project are familiar with it, which might not always be the case.

### Reverse Proxy

- Caddy server - used it previously, like how easy it was to setup and configure.

## 3. Backend

### 3.1 System Architecture

The backend follows a microservices architecture, with each service responsible for a specific domain or functionality. This approach allows for:

- Scalability: Services can be scaled independently based on demand.
- Modularity: Easy to develop, test, and maintain individual services.
- Technology Flexibility: Different services can use different technologies if needed.

For this task, I assumed that these types of calculations, such as Cash Deposit calculation, will be used by several clients, so it's a good candidate for a separate microservice that will provide single point of implementation for all related calculations.

Clients for this service might be:

- Frontend applications or widgets, such as calculations widget for Depositify website
- Internal microservices that need to perform calculations for some internal logic
- External clients / partners that use Depositify API

Cons of this approach:

- Network overhead - each client will have to connect to the calculation service and perform the calculation. This might be a problem if the calculation service is not performant or if the network is slow.
- Calculations are not performed locally on the client side, so no immediate feedback on the calculation result. For UI applications it might affect the user experience.

### 3.2 Project Structure - Modular Microservice

Calculations service follows a modular structure, enforced by Nest.js application architecture. And

For this service I've created following modules:

`calculators` - contains implementation for each calculator, each calculator has it's own implementation and can be used across different REST API modules.

`deposits-savings-calculator` - provides REST API for deposits and savings calculator in web application.

## 4. Infrastructure

### 4.1 Docker Compose

Docker Compose is used to run the application in a containerized environment. It's a local setup, so it's not used in production. I provided two docker compose files, one for local Caddy setup that points to local backend and frontend apps (outside of docker network) and one for dockerized setup with Caddy as a reverse proxy for backend and frontend services (inside of docker network).

### 4.2 Caddy

Caddy is used as a reverse proxy for backend services and also proxies to frontend server.

### 5. System Architecture

For this project, I've desided to implement microservices architecture.

Personally, starting new project, I'd start with a modular monolith, because it's easier to develop and test. Also, it is so much easier to deploy as a single unit, however scalability and elasticity problems should be kept in mind.

As project grows, it can be refactored into a microservices architecture or service-based architecture. Again, I'd start with a bigger service and then refactor it into smaller services, only if it's really needed. Service-based architecture, utilising principles of bounded context and domain-driven design, is a good approach for a large project, especially when different parts of the system are developed by different teams, but at the same time it's still easier than microservices.

For Depositify, I've assumed that there would be multiple clients for the calculations functionality, and context of the calculation is one of the most important parts of the platform, so it would be good to have it's own service. It can be easily reused by other services and it's own domain logic is quite complex.

Also, it would be easier to scale this service as it's own unit, as it can be used by multiple clients and can be scaled independently.

Caddy proxies request to the calculations service and doesn't perform any auth / data validation / transformation, it just proxies the request and returns the response. It means that if we'd need to add authorisation, we should consider using JWT, so each service can validate token without making costly request to the other auth service.

## 6. Things to improve

I've spent most of the time on the backend, so there's plenty of things I'd like to improve on the frontend app, if I had more time. For backend part, I'm quite happy with the current architecture and structure, it's easy to understand and follow.

### 6.1 Frontend

1. Add proper UI; I spent quite some time to figure out what would be the best approach for Vue3, so decided to omit adding any styling. I planned to use library like PrimeVue https://primevue.org/, but didn't have enough time to setup and integrate it.
2. Implement other calculators.
3. Add local form validation to improve user experience.
4. Add loading state to the form; It's implemented now in pretty barebone way, just to show that it's possible.
5. Potentially move some logic to the store to make it more reactive and easier to maintain.
6. Add error handling and feedback to the user.

## 7. Time spent

I've spent some time to setup monorepo and dockerised setup, I find it always time consuming, but I really wanted to try to setup Turbo + Caddy + Docker compose in microservices architecture.

The backend took around 1 hour, as with Nest.js it's really easy to get up and running with a simple CRUD application and most of the time I spent on figuring out what formula for compound interest calculation to use.

Frontend took around 3 hours, cause I haven't built any frontend application with Vue 3 yet, so had to spend some time to figure out how to setup the project and get used to the new syntax and features. Firstly, I used Pinia for state management, but then switched to Vue Use fetch hook as it's more reactive and easier to use.
