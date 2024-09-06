# nujin Boilerplate

This is a Nuxt 3 boilerplate project with advanced features and integrations, designed to kickstart your web application development.

## Features

- **Nuxt 3**: The latest version of the intuitive Vue framework
- **TypeScript**: Full TypeScript support for enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Tailwind CSS component library for beautiful and responsive designs
- **Supabase Integration**: For backend services, authentication, and database management
- **PWA Support**: Progressive Web App capabilities for offline access and improved performance
- **Vue Router**: For seamless navigation in your single-page application
- **VueUse**: Collection of essential Vue Composition Utilities
- **AOS (Animate on Scroll)**: For smooth and attractive scroll animations

## Project Structure

```
.
├── components/
│   └── Dashboard/
│       ├── Header.vue
│       ├── NotificationDropdown.vue
│       ├── RevenueCard.vue
│       ├── Sidebar.vue
│       ├── Stats.vue
│       ├── TransactionsCard.vue
│       └── UserDropdown.vue
├── layouts/
│   └── app.vue
├── middleware/
│   └── auth.global.ts
├── pages/
│   ├── app/
│   │   ├── index.vue
│   │   └── settings.vue
│   ├── confirm.vue
│   ├── index.vue
│   └── login.vue
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── robots.txt
├── server/
│   └── tsconfig.json
├── .env.example
├── .gitignore
├── app.vue
├── nuxt.config.ts
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your Supabase credentials
4. Run the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run generate`: Generate a static version of the application
- `npm run preview`: Preview the built application
- `npm run postinstall`: Run Nuxt preparation steps after installation

## Configuration

The project uses `nuxt.config.ts` for its main configuration. Key settings include:

- Custom meta tags and favicons
- Supabase integration
- Runtime configuration for environment variables
- Tailwind CSS and other module integrations
- PWA configuration

## Deployment

To deploy your Nuxt 3 application:

1. Build your application:
   ```
   npm run build
   ```
2. Deploy the `.output` directory to your hosting provider

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
