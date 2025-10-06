# Iron Wing TMS - Developer Guide


## **1. Overview**

This document outlines the architectural decisions, technology stack, and development strategy for the Iron Wing TMS project. The project is structured as a **monorepo** to manage the backend, desktop, and mobile applications within a single repository.

The backend is a **Headless API** using a **Feature-Based** directory structure. This approach supports a decoupled frontend architecture (Electron for desktop, React Native for mobile) while maximizing code organization and scalability.


## **2. Monorepo Structure**

This project utilizes a monorepo to manage multiple related packages and applications in one repository. This approach offers several advantages:

*   **Code Sharing**: Simplifies sharing code for types, UI components, and utilities across the backend, desktop, and mobile apps.
*   **Atomic Commits**: Changes across multiple parts of the system can be made in a single commit, ensuring consistency.
*   **Simplified Dependency Management**: Dependencies are managed centrally, reducing versioning conflicts.

The main applications are located in the `apps/` directory:
-   `apps/backend`: The Node.js API.
-   `apps/desktop`: The Electron desktop application.
-   `apps/mobile`: The React Native mobile application.

Shared packages are in the `packages/` directory.


## **3. Tech Stack**

### **3.1. Core Technologies**

-   **Language**: JavaScript (Node.js)
-   **Backend Framework**: Express.js
-   **Frontend Frameworks**: Electron (Desktop), React Native (Mobile)
-   **Database**: PostgreSQL
-   **ORM**: Prisma

### **3.2. State Management**

-   **React Query**: For server state management and caching.
-   **React's Built-In State (useState, useReducer)**: For local UI state management.

### **3.3. Caching & Real-Time Features**

-   **Redis**: Caches frequently requested data and handles real-time events with Redis Pub/Sub.
-   **Socket.IO**: Real-time updates for driver tracking and job status changes.

### **3.4. Authentication & Authorization**

-   **Strategy**: A unified, stateless JWT (JSON Web Token) approach is used for all clients.
    -   **Desktop Client (Electron):** JWT is delivered via a secure, `HttpOnly` cookie.
    -   **Mobile Client (React Native):** JWT is delivered in the JSON response body.
-   **Authorization**: Role-Based Access Control (RBAC) is managed by **Casl**.

### **3.5. Observability, Deployment & Testing**

-   **Observability**: **Prometheus** and **Grafana**.
-   **Containerization**: **Docker**.
-   **CI/CD**: **GitHub Actions**.
-   **Testing**: **Jest**, **React Testing Library**, and **Supertest**.


## **4. Architecture**

### **4.1. Backend Architecture: Feature-Based**

The backend follows a **Feature-Based** architecture ("Vertical Slicing"), not a traditional MVC pattern. The codebase is organized by business features (e.g., `auth`, `forms`) under the `src/features/` directory. This ensures related code (routes, controllers, services) is co-located, improving maintainability and scalability.

### **4.2. Comprehensive Architecture Overview**

```
+---------------------------------------------------+
|                   Presentation Layer               |
|             (Electron, React Native)               |
|  - UI Components built with React                  |
|  - Sends JWT in Authorization Header               |
|  - Shared Components for Consistent UI              |
+---------------------------------------------------+
                   │
                   │ JWT in Authorization Header
                   ▼
+---------------------------------------------------+
|                  Application Layer                 |
|                  (Use Cases)                       |
|  - Orchestrates Requests                           |
|  - Validates JWT and extracts claims                |
|  - Manages Business Logic Flow                      |
+---------------------------------------------------+
                   │
                   │ User Claims (Roles, Permissions)
                   ▼
+---------------------------------------------------+
|                  Core Domain Layer                  |
|  - Business Rules and Application Logic             |
|  - Uses Casl to check permissions                   |
|  - Decoupled from Frameworks and Infrastructure     |
+---------------------------------------------------+
                   │
                   │ Database Queries and Integrations
                   ▼
+---------------------------------------------------+
|                 Infrastructure Layer                |
|  - Repositories with Prisma                         |
|  - PostgreSQL for Data Persistence                  |
|  - Redis for Caching and Real-Time Pub/Sub           |
|  - Socket.IO for Real-Time Communication             |
|  - Integrations with Custom JWT Service              |
+---------------------------------------------------+
                   │
                   │ Containerization and Deployment
                   ▼
+---------------------------------------------------+
|           Containerization and Deployment           |
|  - Docker for Consistent Environments               |
|  - GitHub Actions for CI/CD                         |
|  - Prometheus and Grafana for Monitoring             |
|  - Scalable Deployment with Docker Compose           |
+---------------------------------------------------+
```


## **5. Development Roadmap**

### **Phase 0: Environment Setup (ETA: 2 Weeks)**
- Infrastructure Setup (Hetzner, CI/CD, Docker, Prometheus/Grafana)
- Security and Compliance (JWT, RBAC)
- Database and Caching Setup (PostgreSQL, Redis)

### **Phase 1: Backend Build-Up (ETA: 4 Weeks)**
- API Development and Real-Time Communication
- Core Business Logic and Authentication
- Database Models and Repositories
- Testing and Quality Assurance

### **Phase 2: Core Features (ETA: 6 Weeks)**
- Hours of Service (HOS) Integration
- CRM and Workflow Orchestration
- Job Assignment and Status Management
- Real-Time Driver Tracking

### **Phase 3: Frontend Development (ETA: 4 Weeks)**
- Component Architecture
- UI and State Management
- Map-Centric GUI Development

### **Phase 4: Enhancements and Optimizations (ETA: 4 Weeks)**
- Fuel Optimization and Cost Calculation
- Advanced Reporting and Route Optimization
- Caching and Performance Improvements

### **Phase 5: Future Enhancements (ETA: TBD)**
- ELD Integration


## **6. Testing Strategy in a Monorepo**

The monorepo uses a workspace-specific testing strategy. Each application (`apps/backend`, `apps/desktop`, `apps/mobile`) contains its own test scripts and configurations, allowing for isolated testing.

To run all tests across the entire monorepo, use the following command from the root directory. This command will execute the test scripts in each workspace.

```bash
npm test
```

To run tests for a specific application, navigate to its directory and run its test command:

```bash
cd apps/backend
npm test