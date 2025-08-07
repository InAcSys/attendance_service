import Elysia, { t } from "elysia";
import {
  create,
  createAttendancesBySubjectId,
  getAttendanceByStudent,
  show,
} from "../controllers/attendance.controller";

export const attendanceRoutes = new Elysia({
  prefix: "/api/attendance",
})
  .get("/:id", show)
  .get("/student/:studentId", getAttendanceByStudent)
  .post("/", create, {
    body: t.Object({
      userId: t.String(),
      subjectId: t.String(),
      tenantId: t.String(),
      comment: t.String(),
      status: t.Enum({
        PRESENT: "present",
        LATE: "late",
        ABSENT: "absent",
        EXCUSED: "excused",
        UNEXCUSED: "unexcused",
        LEFT_EARLY: "left_early",
        REMOTE: "remote",
        INCOMPLETE: "incomplete",
      }),
    }),
  })
  .post("/subject/:subjectId", createAttendancesBySubjectId, {
    body: t.Object({
      attendances: t.Array(
        t.Object({
          userId: t.String(),
          status: t.Enum({
            PRESENT: "present",
            LATE: "late",
            ABSENT: "absent",
            EXCUSED: "excused",
            UNEXCUSED: "unexcused",
            LEFT_EARLY: "left_early",
            REMOTE: "remote",
            INCOMPLETE: "incomplete",
          }),
          comment: t.String(),
        })
      ),
      tenantId: t.String(),
    }),
  });
