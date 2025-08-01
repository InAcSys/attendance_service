import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { attendances } from "../db/schema";
import { Attendance } from "../models/attendance";

export const getAttendance = async (id: string, tenantId: string) => {
  const result = await db
    .select()
    .from(attendances)
    .where(and(eq(attendances.id, id), eq(attendances.tenantId, tenantId)));

  const attendance = result[0];

  return attendance ?? null;
};

export const createAttendance = async (attendance: Attendance) => {
  const exists = await db
    .select()
    .from(attendances)
    .where(
      and(
        eq(attendances.userId, attendance.userId),
        eq(attendances.subjectId, attendance.subjectId),
        eq(attendances.tenantId, attendance.tenantId)
      )
    );

  const exist = exists[0] ?? null;

  let result = null;

  if (!exist) {
    result = await db
      .insert(attendances)
      .values({
        userId: attendance.userId,
        subjectId: attendance.subjectId,
        tenantId: attendance.tenantId,
        comment: attendance.comment,
        status: attendance.status,
      })
      .returning();
  } else {
    result = await db
      .update(attendances)
      .set({
        comment: attendance.comment,
        status: attendance.status,
      })
      .where(
        and(
          eq(attendances.userId, attendance.userId),
          eq(attendances.subjectId, attendance.subjectId),
          eq(attendances.tenantId, attendance.tenantId)
        )
      )
      .returning();
  }

  const response = result[0] ?? null;

  return response;
};
