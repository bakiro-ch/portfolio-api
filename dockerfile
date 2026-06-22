FROM node:20-alpine AS builder

WORKDIR /app

# 1. نسخ التبعيات أولاً للاستفادة من كاش Docker
COPY package*.json ./

# 2. تثبيت جميع التبعيات (بما فيها devDependencies الضرورية للتوليد)
RUN npm ci

# 3. نسخ المشروع كاملاً (بما فيه prisma/schema.prisma و prisma.config.ts و tsconfig.json)
COPY . .

# 4. الآن نولد Prisma Client - وهو يملك السياق الكامل ليولد كود إنتاج صحيح ✅
RUN npx prisma generate

# 5. نبني المشروع
RUN npm run build

# ==========================================
# مرحلة الإنتاج النهائية
# ==========================================
FROM node:20-alpine
WORKDIR /app

# تثبيت التبعيات الإنتاجية فقط
COPY package*.json ./
RUN npm ci --omit=dev

# نسخ الملفات المبنية والمُولدة من مرحلة builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

# تشغيل التطبيق
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]