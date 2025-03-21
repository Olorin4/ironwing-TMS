# Iron Wing TMS Project

## **Summary**

The TMS (Transportation Management System) Project is a modern, scalable, and high-performance logistics platform designed to streamline freight management, driver tracking, and job dispatching. Built with TypeScript, React (Electron for Desktop, React Native for Mobile), and Node.js, it ensures a unified development experience, leveraging a clean architecture for maintainability and scalability.

## **Tech Stack**

### **1. Languages and Frameworks**

- **Language**: JavaScript

    - **Key Features**: Versatility for both frontend and backend development, strong community support, extensive library ecosystem, asynchronous programming with async/await.
    - **Why Use It**: Unified language across the full stack (Node.js, React Native), rapid prototyping, reduces context switching for developers.

- **Frontend Frameworks**: Electron (Desktop), React Native (Mobile)

    - **Electron**: Acts as a container for React, enabling cross-platform desktop applications outside the browser.

        - **Key Features**: Chromium-based rendering, Node.js integration, cross-platform support (Windows, macOS, Linux).
        - **Why Use It**: Consistent UI and logic across desktop platforms, full access to system APIs, reusable React components.
        - **How It Works**: Electron serves as the container, running React in the Renderer Process, while the Main Process handles system-level actions using Node.js APIs. Communication between them is managed through a secure Context Bridge.

    - **React Native**: For cross-platform mobile applications.

        - **Key Features**: Native rendering for iOS and Android, shared components with Electron.
        - **Why Use It**: Consistent UI patterns across mobile devices, reusable logic with Electron.

- **Backend Frameworks**: Node.js (with Express.js)

    - **Key Features**: Non-blocking, event-driven architecture, lightweight and fast I/O operations, scalable for real-time applications, extensive npm library ecosystem.
    - **Why Use It**: Ideal for building scalable and high-performance APIs, consistent language (TypeScript) across frontend and backend, perfect for microservices and real-time features with WebSockets.: JavaScript and TypeScript

### **2. State Management**

- **React Query**: For server state management and caching.

    - **Key Features**: Data fetching, caching, synchronization with server state, automatic background updates, and query invalidation.
    - **Why Use It**: Simplifies server state management, reduces boilerplate code, improves performance with caching, and enhances user experience with background updates.

- **React's Built-In State (useState, useReducer)**: For local UI state management without global complexity.: (useState/useReducer) for local UI state.

    - **Key Features**: Simple state management hooks for local component state.
    - **Why Use It**: Lightweight and straightforward for managing local UI state without the complexity of global state management tools.: For server state management and caching

### **3. Database**

- **PostgreSQL**: Single source of truth ensuring data consistency and integrity.
    - **Key Features**: ACID compliance, powerful SQL querying, JSON/JSONB support, advanced indexing, horizontal scalability with read replicas.
    - **Why Use It**: Reliable and consistent data storage, suitable for complex queries and transactions, supports both relational and semi-structured data.

### **4. ORM**

- **Prisma**: Modern TypeScript ORM with type-safe database queries.
    - **Key Features**: Type-safe queries, intuitive schema definition, auto-generated TypeScript types, powerful migrations and data modeling.
    - **Why Use It**: Speeds up development with type safety and auto-generated types, integrates seamlessly with TypeScript and Node.js, and improves maintainability.: Single source of truth ensuring data consistency and integrity

### **5. Caching**

- **Redis**: Caches frequently requested data and handles real-time events (e.g., driver location updates) with Redis Pub/Sub.

    - **Key Features**: In-memory data store, Pub/Sub messaging, persistence options, high availability with Redis Cluster or Redis Sentinel.

    - **Why Use It**: Improves response times by caching frequently requested data, supports real-time messaging for driver location updates, scalable solution for high-throughput systems.: Caches frequently requested data and handles real-time events (e.g., driver location updates) with Redis Pub/Sub

### **6. Real-Time Features**

- **Socket.IO**: Real-time updates for driver tracking and job status changes

### **7. Authentication**

- **Hybrid Authentication (Session-Based for Web, JWT for Mobile & APIs)**:

    - **Session-Based Authentication (Electron Admin Panel)**:
        - Uses **Passport.js with session strategy**.
        - Stores session IDs securely in **Redis**.
        - Uses **HttpOnly, Secure cookies** to prevent token theft.
    - **JWT Authentication (Mobile Users & APIs)**:
        - Uses **Passport.js with JWT strategy**.
        - Provides stateless authentication for **React Native mobile users**.
        - Works with **RESTful APIs and microservices**.
    - **Why Use It?**:
        - Provides **better security** for web users (session-based authentication is more secure).
        - Ensures **scalability** for mobile users and APIs (JWT is stateless).
        - Supports **role-based access control (RBAC) with Casl**.

- **Passport.js + JWT (JSON Web Token)**:

    - **Key Features**: Modular authentication with multiple strategies, stateless authentication, signed tokens (HMAC SHA256 or RSA), self-contained claims.
    - **Why Use It**: Provides full control over authentication, flexible and scalable, no vendor lock-in, integrates seamlessly with Express.js.
    - **Usage**: Used for username/password authentication, social logins (Google, Facebook), and API token validation.
    - **Integration**: Combined with Casl for Role-Based Access Control (RBAC) and enforced in the Core Domain Layer.

### **8. Role-Based Access Control**

- **Casl**: Flexible authorization library for complex permission management.
    - Key Features: Centralized CRUD abilities, fine-grained control, conditional rules.
    - Why Use It: Seamless integration with React and Node.js, consistent authorization.

### **9. Observability**

- **Prometheus**: Collects metrics from Node.js backend, PostgreSQL, and infrastructure.
    - Key Features: Time-series database, pull-based metrics collection, custom metrics tracking.
    - Why Use It: Detailed visibility into app performance, flexible querying with PromQL.

### **10. Monitoring**

- **Grafana**: Visualizes metrics from Prometheus in customizable dashboards.
    - Key Features: Rich visualization options, dashboard sharing, multiple data source integrations.
    - Why Use It: Centralized monitoring, customizable dashboards for TMS-specific metrics.

### **11. Containerization and Deployment**

- **Docker**:
    - **Key Features**: Consistent environments, isolated dependencies, lightweight containers, and multi-stage builds for production optimization.
    - **Why Use It**: Ensures consistency across development, testing, and production, simplifies deployment, and enhances scalability.
    - **Usage**: Used for deploying Node.js API, Redis, PostgreSQL, and Electron in isolated containers using Docker Compose.
    - **CI/CD Integration**: Facilitates consistent testing and deployment through CI/CD pipelines, ensuring identical environments across all stages.

### **12. CI/CD Pipeline**

- **GitHub Actions**:
    - **Key Features**: Automated testing, building, and deployment workflows directly from GitHub repositories.
    - **Why Use It**: Ensures consistent and automated CI/CD pipelines, reducing manual deployment errors and improving productivity.
    - **Usage**: Integrates with Docker for containerized builds, runs Jest tests for React Native and Electron components, and automates deployments to cloud platforms.

### **13. Testing Tools**

- **Jest and React Testing Library**:
    - **Key Features**: Unit, integration, and end-to-end testing for React Native and Electron components.
    - **Why Use It**: Ensures code quality through comprehensive testing coverage, catching bugs early in development.
    - **Usage**: Used with GitHub Actions for automated testing, maintaining high test quality and consistent code coverage.

## **Architecture**

### **Comprehensive Architecture Overview**

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

```

```

### 1. **MVC (Model-View-Controller) Architecture for Node.js Backend**

- **Model**:

    - Manages data and business logic.
    - Interacts with **PostgreSQL** using **Prisma** for data persistence.

- **View**:

    - UI components built with **React Native** and **Electron** for consistent cross-platform interfaces.

- **Controller**:

    - Handles HTTP requests and responses using **Express.js**.
    - Orchestrates data flow between Model and View.

- **Why Use It?**:

    - Simplicity and rapid development with clear separation of concerns.
    - Easier onboarding for new developers due to familiar and straightforward structure.
    - Ideal for MVPs with straightforward business logic.

- **State Management**:

    - **React Query**: Server state management and caching for remote data.

- **UI Layer**:

    - **Presentational Components**: Pure components for UI rendering
    - **Container Components**: State management and domain logic

- **API Layer**: Centralized API service for consistent data fetching and error handling

This architecture is optimized for the TMS Project's needs, balancing rapid development, scalability, and maintainability.
