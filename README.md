# Cats App

Cats App is a TypeScript-based web application that allows users to view cat images, filter by breed, view detailed cat information, and search for a cat by ID. It's built using Vite for development and bundling.

<div style="display: flex; flex-wrap: wrap">
    <img src="src/assets/images/load.png" width="50%" />
    &nbsp;
    <img src="src/assets/images/searchByBreed.png" width="50%" />
   
</div>

## Features

- **Image Gallery:** Browse a collection of adorable cat images.
- **Breed Filters:** Filter cat images by breed, customizing your viewing experience.
- **Cat Details:** Get in-depth information about your favorite cats.
- **ID Search:** Search for specific cats by their unique ID.
- **Query Parameter Management:** Utilize the `useQueryParams` utility for efficient query parameter management.

## Tech Stack

- React: Building interactive user interfaces.
- React Router: Managing application routes.
- React Query: Simplifying data fetching and synchronization.
- TypeScript: Type-safe development.
- Vite: Efficient development and bundling.
- Playwright: Comprehensive end-to-end testing.

## Custom Configuration

- Vitest Configuration: Tailored configuration for running tests.
- Module Aliases: Simplifying imports for cleaner code.
- Query Parameter Management: Use the useQueryParams utility for precise query parameter handling.

## Getting Started

- npm install
- npm run dev

## Running Tests

End-to-End Tests:

- npx playwright test

Interactive Testing:

- npm run e2e:interactive
