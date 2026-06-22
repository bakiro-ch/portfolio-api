// scripts/update-admin-pass.ts
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon2 from 'argon2';

async function updatePass() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL!;
  const newPass = process.env.NEW_ADMIN_PASSWORD!;

  if(!email || !newPass){
    console.error('❌ Cannot find admin credentials in environment variables.');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email, role: 'ADMIN' } });
  if (!user) {
    console.error('❌ We can not find this admin account.');
    process.exit(1);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await argon2.hash(newPass) },
  });

  console.log('✅ The admin password has successfully updated.');
  await prisma.$disconnect();
}

updatePass().catch(console.error);