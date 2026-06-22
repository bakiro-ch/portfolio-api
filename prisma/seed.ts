// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  console.log('🌱 Starting portfolio seed...');
  
  if (process.env.NODE_ENV === 'production' && !process.env.FORCE_SEED) {
    console.log('⏭️ Skipping destructive seed in production. Set FORCE_SEED=true to override.');
    await prisma.$disconnect();
    return;
  }

  await prisma.project.deleteMany({});
  console.log('🗑️  Cleared old projects');

  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio API',
        slug: 'portfolio-api',
        description: 'RESTful backend for developer portfolio with JWT auth, file uploads, and dynamic project management.',
        status: 'published',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
        demoLink: 'https://portfolio-api-demo.onrender.com',
        githubLink: 'https://github.com/bakiro-ch/portfolio-api',
        technologies: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT', 'Cloudinary'],
        setupGuide: `# Portfolio API\n\n## Setup\nnpm install\ncp .env.example .env\nnpx prisma migrate dev\nnpm run start:dev`
      },
      {
        title: 'TaskFlow Dashboard',
        slug: 'taskflow-dashboard',
        description: 'Real-time collaborative task manager with drag-and-drop, team assignments, and analytics dashboard.',
        status: 'published',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
        demoLink: 'https://taskflow-dashboard-demo.vercel.app',
        githubLink: 'https://github.com/bakiro-ch/taskflow-dashboard',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Socket.io', 'Zustand', 'NestJS'],
        setupGuide: `# TaskFlow\nnpm install\nnpm run dev`
      },
      {
        title: 'E-Commerce Microservices',
        slug: 'ecommerce-microservices',
        description: 'Scalable e-commerce backend with separate services for auth, products, orders, and payments using RabbitMQ.',
        status: 'draft',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&auto=format&fit=crop',
        demoLink: 'https://ecommerce-microservices-demo.onrender.com',
        githubLink: 'https://github.com/bakiro-ch/ecommerce-microservices',
        technologies: ['NestJS', 'TypeScript', 'RabbitMQ', 'Docker', 'Redis', 'Stripe API'],
        setupGuide: `# E-Commerce Backend\ndocker-compose up -d\nnpm run start:dev`
      },
      {
        title: 'WeatherPulse Mobile',
        slug: 'weatherpulse-mobile',
        description: 'Cross-platform weather app with location-based forecasts, severe alerts, and beautiful animated UI.',
        status: 'published',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop',
        demoLink: 'https://weatherpulse-demo.netlify.app',
        githubLink: 'https://github.com/bakiro-ch/weatherpulse-mobile',
        technologies: ['Flutter', 'Dart', 'OpenWeather API', 'Geolocator', 'Provider'],
        setupGuide: `# WeatherPulse\nflutter pub get\nflutter run`
      },
      {
        title: 'DevNotes API',
        slug: 'devnotes-api',
        description: 'Markdown-based note-taking API with rich text support, tagging, sharing, and version history.',
        status: 'published',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
        demoLink: 'https://devnotes-api-demo.onrender.com',
        githubLink: 'https://github.com/bakiro-ch/devnotes-api',
        technologies: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Markdown-it', 'JWT'],
        setupGuide: `# DevNotes API\nnpm install\nnpx prisma migrate dev\nnpm run start:dev`
      },
      {
        title: 'AI Prompt Library',
        slug: 'ai-prompt-library',
        description: 'Community-driven platform for sharing, rating, and discovering effective AI prompts with smart search.',
        status: 'draft',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
        demoLink: 'https://ai-prompt-library-demo.vercel.app',
        githubLink: 'https://github.com/bakiro-ch/ai-prompt-library',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Algolia', 'Clerk Auth'],
        setupGuide: `# AI Prompts\nnpm install\nnpx prisma migrate dev\nnpm run dev`
      },
      {
        title: 'CodeSnippet Manager',
        slug: 'code-snippet-manager',
        description: 'Personal code snippet library with syntax highlighting, language filtering, and cloud sync.',
        status: 'published',
        isFeatured: false,
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop',
        demoLink: 'https://codesnippet-manager-demo.vercel.app',
        githubLink: 'https://github.com/bakiro-ch/code-snippet-manager',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Prisma', 'PostgreSQL', 'Highlight.js'],
        setupGuide: `# Code Snippets\ncd client && npm install && npm run dev\ncd server && npm install && npm run start:dev`
      },
      {
        title: 'Formanova University Project',
        slug: 'formanova-university',
        description: 'Full-stack form builder with dynamic fields, conditional logic, and real-time response analytics.',
        status: 'published',
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        demoLink: 'https://formanova-demo.onrender.com',
        githubLink: 'https://github.com/bakiro-ch/formanova-university',
        technologies: ['NestJS', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'React Hook Form'],
        setupGuide: `# Formanova\ncd backend && npm install && npx prisma migrate dev && npm run start:dev\ncd frontend && npm install && npm run dev`
      }
    ]
  });

  console.log('✅ Seeding completed: 8 projects added');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Seed error:', e);
  process.exit(1);
});