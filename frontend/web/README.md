# Depositify Web Frontend

Go back to [README](../../README.md)

## Overview

This is the web frontend for Depositify, a modern banking platform. The website serves as the primary interface for customers, providing information about our services, promotional materials, and interactive tools to enhance the banking experience (most of it is not implemented yet, and never will be). It is built using TypeScript and Vue 3.

## Features

- Informational pages about our banking services (Not implemented yet)
- Promotional materials and special offers (Not implemented yet)
- Interactive UI widgets, including:
  - Deposit Calculator (_Implemented_)
  - Loan Calculator (Not implemented yet)
  - Repayment Calculator (Not implemented yet)

## Technology Stack

- TypeScript
- Vue 3
- Vue Router for navigation
- Vue Use hooks

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Run the development server:

   ```
   npm run dev --filter @depositify/web
   ```

3. Build for production:
   ```
   npm run build --filter @depositify/web
   ```
