# Usa la imagen oficial de Bun
FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install && bun run build && bunx drizzle-kit generate
RUN bunx drizzle-kit push

EXPOSE 5174

# Comando para correr la app
CMD ["bun", "run", "start"]
