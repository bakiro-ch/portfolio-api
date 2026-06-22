"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
async function main() {
    const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
    const prisma = new client_1.PrismaClient({ adapter });
    console.log('🌱 Starting seed...');
    await prisma.project.deleteMany({});
    console.log('🗑️  Deleted old projects');
    await prisma.project.createMany({
        data: [
            {
                title: 'Portfolio API',
                slug: 'portfolio-api',
                description: 'RESTful API built with NestJS for managing developer portfolio projects.',
                status: 'published',
                isFeatured: true,
                imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
                demoLink: 'https://portfolio-api-demo.com',
                githubLink: 'https://github.com/yourusername/portfolio-api',
                technologies: ['NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'JWT'],
                setupGuide: `# Portfolio API\n\n## Setup\nnpm install\nnpm run start:dev`
            },
            {
                title: 'E-Commerce Dashboard',
                slug: 'ecommerce-dashboard',
                description: 'Modern admin dashboard for e-commerce with real-time analytics.',
                status: 'published',
                isFeatured: true,
                imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                demoLink: 'https://ecommerce-dashboard-demo.com',
                githubLink: 'https://github.com/yourusername/ecommerce-dashboard',
                technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Recharts'],
                setupGuide: `# E-Commerce Dashboard\nnpm install\nnpm run dev`
            },
            {
                title: 'Task Management App',
                slug: 'task-management-app',
                description: 'Collaborative task management with real-time updates.',
                status: 'draft',
                isFeatured: false,
                imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
                demoLink: 'https://task-management-demo.com',
                githubLink: 'https://github.com/yourusername/task-management',
                technologies: ['Vue.js', 'Firebase', 'Pinia', 'TailwindCSS'],
                setupGuide: `# Task App\nnpm install\nnpm run serve`
            }
        ]
    });
    console.log('✅ Seeding completed successfully!');
    await prisma.$disconnect();
}
main()
    .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map