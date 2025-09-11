# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 admin panel for the Cubita platform, built with React 19, TypeScript, and GraphQL. The project serves as an administrative interface for managing a delivery/logistics platform with features for orders, partners, articles, locations, and user management.

## Development Commands

### Core Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript compiler without emitting

### Testing

- `npm test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode

### Version Control

- `npm run commit` - Use Commitizen for conventional commits
- Pre-commit hooks automatically run lint-staged for code quality

## Architecture

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **State Management**: Zustand (global state), Apollo Client (GraphQL state)
- **GraphQL**: Apollo Client with authentication middleware
- **UI Components**: shadcn/ui with Lucide icons
- **Animation**: Framer Motion
- **Testing**: Vitest with jsdom, Testing Library React
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

### Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/lib/` - Shared utilities and configurations
  - `apollo.ts` - GraphQL client configuration
  - `utils.ts` - General utilities
  - `validations.ts` - Zod validation schemas
- `src/stores/` - Zustand state management
- `src/types/` - TypeScript type definitions
- `schema.graphql` - Complete GraphQL schema with delivery/logistics domain

### Key Features Based on Schema

The GraphQL schema reveals this is a comprehensive delivery/logistics admin panel with:

- **Order Management**: Delivery and wrapping orders with status tracking
- **Location Hierarchy**: Countries → States/Provinces → Cities → Municipalities → Neighborhoods
- **Article Management**: Products with variants and pricing rules
- **Partner System**: Partner-based business model with user roles
- **User Management**: Client, Driver, Partner, and Staff user types
- **Payment Processing**: Cards and partner balance payment methods

### Configuration

- **ESLint**: Next.js + TypeScript rules with strict configurations
- **Prettier**: 2-space indentation, single quotes, semicolons
- **shadcn/ui**: New York style, neutral base color, CSS variables enabled
- **Vitest**: jsdom environment with React testing setup
- **Path Aliases**: `@/` points to `src/` directory

### Authentication Flow

Apollo Client is configured with:

- Bearer token authentication from localStorage
- SSR-safe token handling
- Error policies for graceful degradation
- Configurable GraphQL endpoint via `NEXT_PUBLIC_GRAPHQL_ENDPOINT`

### Development Workflow

- Husky manages Git hooks
- lint-staged runs on pre-commit for staged files
- Conventional commits enforced via Commitizen
- TypeScript strict mode enabled
- Automated code formatting and linting

## Important Notes

- The app uses Spanish language in the UI (`lang="es"`)
- Built for production deployment on modern platforms
- Comprehensive GraphQL schema suggests complex business logic
- Uses modern React patterns with hooks and functional components
