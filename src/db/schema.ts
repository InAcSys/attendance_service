import {
  pgTable,
  boolean,
  text,
  timestamp,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const statusEnum = pgEnum("status", [
  "present",
  "late",
  "absent",
  "excused",
  "unexcused",
  "left_early",
  "remote",
  "incomplete",
]);

export const attendances = pgTable("attendances", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),

  userId: uuid("userId").notNull(),
  subjectId: uuid("subjectId").notNull(),
  tenantId: uuid("tenantId").notNull(),

  comment: text("comment"),

  status: statusEnum("status"),

  isActive: boolean("isActive").default(true),

  created: timestamp("created")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

  updated: timestamp("updated").default(sql`CURRENT_TIMESTAMP`),

  deleted: timestamp("deleted"),
});
