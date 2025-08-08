# Overview

This is a modern full-stack web application for calculating SGPA (Semester Grade Point Average). The application features a multi-stage user interface built with React and TypeScript, styled with Tailwind CSS and shadcn/ui components. It guides students through a step-by-step process: collecting personal information, entering subject details with marks and credits, displaying calculated results, and showing the final SGPA score with motivational feedback.

The application uses a monorepo structure with shared types and schemas between frontend and backend, implements form validation with Zod schemas, and includes comprehensive grade point calculations following standard academic grading systems.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side application is built using React with TypeScript and follows a component-based architecture:

- **UI Framework**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks (useState) for local component state
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

The application implements a multi-stage wizard pattern using conditional rendering and state lifting, with components organized by feature (personal-info-stage, subjects-stage, results-stage, final-results-stage).

## Backend Architecture

The server-side uses Express.js with TypeScript in an ESM configuration:

- **Web Framework**: Express.js with middleware for JSON parsing and request logging
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development Setup**: Vite SSR middleware for development with HMR support
- **Build Process**: esbuild for server bundling and production builds

The backend follows a modular structure with separate route registration and storage abstraction, allowing for easy testing and future database migrations.

## Data Storage Solutions

The application is configured to use PostgreSQL through Neon Database serverless:

- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Shared schema definitions using Zod for validation
- **Development**: In-memory storage implementation for rapid prototyping
- **Migrations**: Drizzle Kit for database schema migrations

The storage interface abstracts CRUD operations, currently implementing user management with methods for creating and retrieving users by ID or username.

## Form Validation and Data Flow

The application implements comprehensive client-side validation:

- **Validation Library**: Zod schemas for runtime type checking and validation
- **Form Library**: React Hook Form for performant form handling
- **Shared Types**: TypeScript interfaces shared between client and server
- **Grade Calculation**: Custom utility functions for converting marks to grade points and calculating SGPA

The data flows through validation layers ensuring type safety from form input to final calculation, with shared schemas preventing client-server data mismatches.

# External Dependencies

## UI and Styling
- **@radix-ui/***: Comprehensive accessible UI primitives for dialogs, forms, navigation
- **shadcn/ui**: Pre-built component library built on Radix UI
- **tailwindcss**: Utility-first CSS framework with custom design tokens
- **class-variance-authority**: Type-safe variant handling for component styling
- **lucide-react**: Modern icon library for consistent iconography

## Data Management
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant form handling with minimal re-renders
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **zod**: Runtime type validation and schema definition

## Database and Backend
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration
- **drizzle-kit**: Database migration and introspection tools
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development and Build Tools
- **vite**: Fast build tool with HMR and optimized bundling
- **@vitejs/plugin-react**: React plugin for Vite with Fast Refresh
- **esbuild**: JavaScript bundler for server-side code
- **tsx**: TypeScript execution environment for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Utilities
- **date-fns**: Modern date utility library
- **wouter**: Lightweight React router
- **clsx** and **tailwind-merge**: Utility functions for conditional CSS classes
- **nanoid**: URL-safe unique string ID generator