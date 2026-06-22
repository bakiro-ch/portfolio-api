import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';

async function init() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL!;
  const pass = process.env.ADMIN_PASSWORD!;

    if(!email || !pass){
        console.error('❌ We can find your account informations.');
        process.exit(1);
    }


  const exists = await prisma.user.count({ where: { role: 'ADMIN' } });
  if (exists > 0) {
    console.log('✅ Admin already exsit.');
    await prisma.$disconnect();
    return;
  }

  await prisma.user.create({
    data: { email, password: await argon2.hash(pass), role: 'ADMIN' },
  });

  console.log('✅ Admin has successfully created.');
  await prisma.$disconnect();
}

init().catch(console.error);