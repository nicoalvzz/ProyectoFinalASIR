# 🧪 Proyecto Final ASIR – Automatización QA con CI/CD

Este repositorio contiene un **entorno completo de pruebas automatizadas** para validar la calidad de una aplicación web basada en una arquitectura Dockerizada con frontend, backend y base de datos. Está orientado a realizar pruebas sobre el frontend conectado a una API REST y MongoDB.

## 📁 Estructura del proyecto

```
📂 ProyectoFinalASIR
├── .github/workflows/               # Pipeline de CI para ejecutar pruebas
├── KarateProject/                   # Pruebas automatizadas con Karate (API y Frontend)
│   └── KarateProject/PruebasKarate
├── PruebaCypress/                   # Pruebas E2E con Cypress
│   └── PruebaCypress/cypress-e2e-framework
├── PruebasPlaywright/              # Pruebas automatizadas con Playwright (UI)
│   └── PruebasPlaywright
├── ProyectoDockerizado/            # Entorno con API, frontend y base de datos (MongoDB)
```

## 🔧 Herramientas utilizadas

- **Cypress**: Para pruebas E2E de la UI, comprobando funcionalidades como creación, edición y eliminación de películas.
- **Playwright**: Para automatización de pruebas en distintos navegadores (Chrome, Firefox, WebKit).
- **Karate**: Para pruebas de APIs y validaciones de endpoints HTTP o carga del frontend.
- **Node.js + Express**: Backend de la aplicación, expone una API REST.
- **MongoDB**: Base de datos no relacional que guarda la información de las películas.
- **React + Vite**: Frontend rápido y ligero, totalmente conectado a la API.
- **Docker + Docker Compose**: Contenerización de todos los servicios.
- **Caddy**: Proxy inverso para exponer el entorno en HTTPS.
- **GitHub Actions**: Automatización de pruebas mediante un pipeline CI/CD.

## 🚀 Pipeline de Integración Continua (CI)

Este proyecto cuenta con un pipeline automatizado creado con **GitHub Actions**. Cada vez que se realice un `push` o `pull_request` sobre la rama `main`, se ejecutarán automáticamente **las pruebas de Karate, Cypress y Playwright**.

### ✔️ Pipeline: `.github/workflows/[archivo].yml`

```yaml
name: Ejecutar pruebas de Playwright, Cypress y Karate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  karate:
    name: Ejecutar pruebas Karate
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: KarateProject/KarateProject/PruebasKarate
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'adopt'
      - run: mvn test -Dtest=KarateRunner

  cypress:
    name: Ejecutar pruebas Cypress
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: PruebaCypress/PruebaCypress/cypress-e2e-framework
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm install --save-dev cypress
      - run: npx cypress run --spec "cypress/e2/**/*.cy.{js,ts}"

  playwright:
    name: Ejecutar pruebas Playwright
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: PruebasPlaywright/PruebasPlaywright
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

## 🎯 Objetivo del Proyecto

- Garantizar la calidad del software de forma continua.
- Validar funcionalidades del frontend conectado con una API real.
- Automatizar la ejecución de pruebas en cada cambio del repositorio.
- Implementar un entorno profesional basado en herramientas actuales del mundo DevOps y QA.

## 👨‍💻 Autor

**Nicolás Álvarez Aliaga**

## 🌐 Webgrafía

- Cypress.io  
- Playwright.dev  
- Karate Labs  
- Docker.com  
- Nodejs.org  
- MongoDB.com  
- ViteJS.dev  
- GitHub Actions Docs  

> ⭐ Este proyecto simula un flujo real de trabajo en QA y DevOps, integrando pruebas automatizadas en un entorno dockerizado con ejecución CI continua en GitHub.
