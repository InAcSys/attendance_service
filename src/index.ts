import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { attendanceRoutes } from "./routes/attendance.route";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

await new Promise((res) => setTimeout(res, 5000));

await migrate(db, { migrationsFolder: "drizzle" });

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .listen(5174)
  .use(attendanceRoutes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
