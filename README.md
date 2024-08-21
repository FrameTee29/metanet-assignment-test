# Metanet Assignment Test

This repository contains the Metanet assignment test project. Follow the instructions below to get started with the project.

## Getting Started

### Prerequisites

Ensure that you have the following installed on your system:

- Git
- Bash (for running shell scripts)
- Any other dependencies required by your project (e.g., Node.js, etc.)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/FrameTee29/metanet-assignment-test.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd metanet-assignment-test
   ```

## Initial Environment Setup

To set up the initial development environment, follow these steps:

1. **Make the `initial-devtools.sh` script executable**:

   ```bash
   chmod +x ./initial-devtools.sh
   ```

2. **Run the `initial-devtools.sh` script**:

   ```bash
   ./initial-devtools.sh
   ```

3. **Make the `initial-all-project.sh` script executable**:

   ```bash
   chmod +x ./initial-all-project.sh
   ```

4. **Run the `initial-all-project.sh` script**:

   ```bash
   ./initial-all-project.sh
   ```

## Run the project

### Paytanet service (Service A)

```bash
cd paytanet-serivce
npm run start:dev
```

Stop the process, then seed data:

```bash
npm run seed:run
```
Run again:
```bash
npm run start:dev
```

Open the API 📚[http://localhost:4001/api](http://localhost:4001/api)

### Paytanet frontend (Frontend A)
```bash
cd paytanet-frontend
npm run dev
```
Open the API 📚[http://localhost:3001](http://localhost:3001)

### Metify shop service (Service B)
```bash
cd metify-shop-serivce
npm run start:dev
```

Stop the process, then seed data:

```bash
npm run seed:run
```

Run again:
```bash
npm run start:dev
```
📚[http://localhost:4002/api](http://localhost:4002/api)

### Metify shop frontend (Frontend B)
```bash
cd metify-shop-frontend
npm run dev
```
Open the API 📚[http://localhost:3002](http://localhost:3002)
