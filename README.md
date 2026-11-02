# Portfolio CRUD (Laravel + Inertia.js + React)

Midterm Laboratory Activity - IT ELEC01 Advanced Web Development
By: Mark Anthony B. Obina

## About

My portfolio converted to Laravel + Inertia + React. The Projects section is dynamic and has full CRUD with validation.

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+

## Setup

1. Clone the repository
   git clone https://github.com/Fluff-afk/portfolio-laravel-inertia.git
   cd portfolio-laravel-inertia
2. Install dependencies
   composer install
   npm install
3. Create the environment file
   copy .env.example .env
   php artisan key:generate
4. Create the database and run migrations
   php artisan migrate
5. Link the storage folder (for uploaded images)
   php artisan storage:link
6. Run the app (two terminals)
   php artisan serve
   npm run dev
7. Open http://localhost:8000/projects

## Features

- Create, read, update, delete projects
- Server-side validation with custom messages
- Image upload (max 2 MB)
- Success messages and delete confirmation
