# 📊 DSVendas - Sales Dashboard Application

<div align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 17" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-Multi--Platform-cyan?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/SonarCloud-Quality%20Gate-success?style=for-the-badge&logo=sonarcloud&logoColor=white" alt="SonarCloud" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-blueviolet?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
  <a href="https://app.netlify.com/sites/felipeschirmann-sds5-projeto-vendas/deploys">
    <img src="https://api.netlify.com/api/v1/badges/8cd1c6b3-aa8e-4942-85ba-bc6e4d1d6433/deploy-status" alt="Netlify Status" />
  </a>
</div>

<p align="center">
  <b>A premium, high-performance sales dashboard ecosystem featuring a Spring Boot REST API and React.js frontend. Fully dockerized, security-hardened, and orchestrated with modern CI/CD automation.</b>
</p>

---

## 📖 Table of Contents
1. [Key Features & Architecture](#-key-features--architecture)
2. [Domain Model (UML)](#-domain-model-uml)
3. [CI/CD Workflow Architecture](#-cicd-workflow-architecture)
4. [🛠️ Local Development & Quick Start](#%EF%B8%8F-local-development--quick-start)
5. [🐳 Docker Compose Containers](#-docker-compose-containers)
6. [🎯 Testing & Verification](#-testing-&--verification)
7. [🔗 API Documentation & Useful Links](#-api-documentation--useful-links)
8. [🖼️ Application Preview](#%EF%B8%8F-application-preview)

---

## 🚀 Key Features & Architecture

* **Interactive Frontend Dashboard**: Rich data representation charts mapping total sales by seller, success rates, and paginated sales transaction tables.
* **Database Migration & Seed**: Ephemeral database seeding on target environments leveraging native Spring Boot profiles and automatic execution of SQL seed files.
* **Optimal CI/CD Restructuring**: Split testing (`ci.yml`) and container packaging/deployment (`cd.yml`) to keep builds clean, safe, and fast.
* **Rapid Multi-Stage Docker Builds**: Speeds up GHA container compilations using cached compiler WAR dependencies.
* **Post-Deployment Pruning**: Automatic prune of previous image tags to save server space, and down with volume removal for clean database states.

---

## 🗺️ Domain Model (UML)

The following diagram illustrates the relational layout of the database schema:

```mermaid
classDiagram
    class Seller {
        +Long id
        +String name
        +List~Sale~ sales
    }
    class Sale {
        +Long id
        +Integer visited
        +Integer deals
        +Double amount
        +LocalDate date
        +Seller seller
    }

    Seller "1" --> "0..*" Sale : has
```

---

## ⚙️ CI/CD Workflow Architecture

This workflow isolates Continuous Integration checks (PR validation) from Continuous Deployment runs (main branch builds):

```mermaid
graph TD
    A[Push / PR to GitHub] -->|Feature Branch / PR| B(CI Pipeline: ci.yml)
    A -->|Push to main| C(CD Pipeline: cd.yml)

    subgraph CI Pipeline
        B --> B1[Checkout Code]
        B1 --> B2[Setup JDK 17]
        B2 --> B3[Run Unit & Integration Tests]
        B3 --> B4[SonarCloud Code Analysis]
    end

    subgraph CD Pipeline
        C --> C1[Build WAR Artifact]
        C1 --> C2[Upload WAR as Workflow Artifact]
        C2 --> C3[Docker Build & Push]
        C3 -->|Download WAR & Build final JRE Image| C4[Push to Docker Hub]
        C4 --> C5[Deploy to VM]
        C5 -->|SCP Compose & Env Configs| C6[SSH Remote Command Execution]
        C6 -->|Ephemeral Cleanup| C7[Stop & Remove old volumes: down -v]
        C7 --> C8[Start dsvendas-app & dsvendas-postgres]
        C8 --> C9[Prune unused Docker Images]
    end
```

---

## 🛠️ Local Development & Quick Start

Follow these steps to set up the application in your workspace:

### 1. Runtime Environment (SDKMAN!)
We use **Java 17 (17.0.10-tem)** configured via a local `.sdkmanrc` file. 

* Ensure you have [SDKMAN!](https://sdkman.io/) installed.
* Switch to the project JVM version:
  ```bash
  sdk env
  ```

### 2. Environment Variables Configuration
The project loads configurations from local environment files. To set up your local development credentials:

1. Copy the sample environment file:
   ```bash
   cp backend/.env.homolog.example backend/.env.homolog
   ```
2. Adjust the values inside `.env.homolog` for database port bindings and other parameters.

---

## 🐳 Docker Compose Containers

We maintain separate environments optimized for development and isolated cloud verification:

### A. Local Development (Multi-Stage Build)
Compiles, tests, and builds the container from source code. Runs the API alongside a PostgreSQL service:
```bash
docker compose up --build -d
```
* **API Endpoint**: `http://localhost:8080`
* **PostgreSQL Port**: `5432`

### B. Ephemeral Homolog VM (Self-Healing Fallbacks)
Deploys pre-built Docker Hub images directly to a remote host. Features built-in environment fallbacks for zero-downtime boots even in the absence of `.env` files:
```bash
docker compose -f docker-compose-homolog.yml up -d
```
* **Homolog API Endpoint**: `http://localhost:8180` (leaves port `8080` free for other apps)
* **Homolog PostgreSQL Port**: `8181` (prevents database port conflicts)

---

## 🎯 Testing & Verification

Manage, run, and report on all automated validations:

| Command | Purpose |
| :--- | :--- |
| `./mvnw -f backend/pom.xml clean test` | Runs the full Unit Test suite |
| `./mvnw -f backend/pom.xml clean verify` | Runs Unit + Integration Tests and outputs **JaCoCo** reports |
| `docker image prune -a -f` | Cleans up intermediate images and cached builder layers |

> [!TIP]
> View coverage analytics locally in your browser by opening:
> `backend/target/site/jacoco/index.html`

---

## 🔗 API Documentation & Useful Links

When running the application locally under the `test` or `dev` profiles:

* **Swagger Interactive UI**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
* **OpenAPI Specs (JSON)**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)
* **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  * *JDBC URL*: `jdbc:h2:mem:testdb`
  * *User*: `sa`
  * *Password*: *(blank)*

---

## 🖼️ Application Preview

### Domain Conceptual Model
<img src="assets/sds3-mc.png" alt="Conceptual Model" width="600"/>

### Web Application UI
<img src="assets/felipeschirmann-sds5.png" alt="Web Application Dashboard Preview" width="800"/>
