# Overview

BoomerHub is a modern Next.js-based blog and content platform that combines traditional content management with AI-powered tools. The platform serves as a comprehensive resource for insights on finance, technology, social media, and business growth. It features a headless CMS architecture using Sanity, integrated AI capabilities through Google's Genkit, and a responsive design built with ShadCN/UI and Tailwind CSS.

The platform targets users interested in financial literacy, technology trends, and online business opportunities, providing both informational content and practical AI tools for decision-making and productivity.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses Next.js 15 with the App Router pattern for modern React development. The frontend implements a component-based architecture with:
- Server-side rendering for optimal SEO and performance
- Client-side interactivity where needed using the 'use client' directive
- TypeScript for type safety throughout the codebase
- ShadCN/UI component library for consistent design patterns
- Tailwind CSS for utility-first styling with custom design tokens

## Content Management System
The platform employs a headless CMS architecture using Sanity Studio:
- Content types include posts, authors, categories, pages, and predictions
- Rich text content handled through Portable Text with custom components
- Image management with automatic optimization and URL generation
- Admin interface accessible at `/admin` route
- Real-time content updates and collaborative editing capabilities

## AI Integration Layer
AI functionality is implemented using Google's Genkit framework:
- Multiple AI flows for different use cases (search, financial advice, match analysis, translation)
- Rate limiting service to prevent API abuse
- Server-side AI processing with client-side form interfaces
- Structured input/output schemas using Zod for type safety

## Data Architecture
The system uses a combination of data sources:
- Sanity CMS for primary content storage
- In-memory caching for rate limiting and temporary data
- Static JSON files for configuration data and placeholder content
- No traditional database - relies on Sanity's managed backend

## Deployment and Performance
Optimized for Netlify deployment with:
- Static site generation where possible
- Serverless functions for form handling and newsletter signup
- Progressive Web App (PWA) capabilities
- Image optimization through Next.js Image component
- CDN integration for global content delivery

# External Dependencies

## Content Management
- **Sanity**: Headless CMS for content management with project ID `qbb85k0a`
- **@sanity/client**: JavaScript client for Sanity API integration
- **@sanity/image-url**: Image URL generation and optimization
- **next-sanity**: Next.js specific Sanity integrations

## AI Services
- **Google AI (Gemini)**: Primary AI model for content generation and analysis
- **@genkit-ai/googleai**: Google AI integration for Genkit
- **@genkit-ai/next**: Next.js specific Genkit utilities

## Email Services
- **Resend**: Email service for newsletter functionality
- Requires API key and Audience ID configuration

## Advertising Networks
- **Adsterra**: Display advertising integration
- **Monetag**: Additional advertising network
- **Hilltop Ads**: Pop-under advertising

## UI and Styling
- **@radix-ui**: Comprehensive UI component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **next-themes**: Theme switching functionality

## Development Tools
- **TypeScript**: Type safety and developer experience
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting (implied by common Next.js setup)

## Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms and API inputs
- **@hookform/resolvers**: Zod integration with React Hook Form

## Deployment Platform
- **Netlify**: Hosting platform with serverless function support
- **Netlify Functions**: Serverless backend for form processing