import { Attendance } from "../models/attendance";
import { Response } from "../models/general";
import {
  createAttendance,
  getAttendance,
  getAttendanceByStudentId,
} from "../services/attendance.service";

type IdParamsContext = {
  params: {
    id: string;
    tenantId: string;
  };
};

type CreateContext = {
  body: Attendance;
};

type GetAttendanceByStudentContext = {
  params: {
    studentId: string;
  };
  query: {
    subjectId: string;
    tenantId: string;
  };
};

type CreateAttendancesContext = {
  params: {
    subjectId: string;
  };
  body: {
    attendances: [
      {
        userId: string;
        status:
          | "present"
          | "late"
          | "absent"
          | "excused"
          | "unexcused"
          | "left_early"
          | "remote"
          | "incomplete";
        comment: string;
      }
    ];
    tenantId: string;
  };
};

export const show = async ({ params }: IdParamsContext): Promise<Response> => {
  const attendance = await getAttendance(params.id, params.tenantId);

  if (!attendance)
    return {
      message: "Attendance not found",
      status: 404,
    };

  return {
    data: attendance,
    message: "Attendance retrieved successfully",
    status: 200,
  };
};

export const create = async ({ body }: CreateContext): Promise<Response> => {
  const attendance = await createAttendance(body);

  if (!attendance)
    return {
      message: "Attendance could not be recorded.",
      status: 400,
    };

  return {
    data: attendance,
    message: "Attendance was recorded successfully.",
    status: 201,
  };
};

export const createAttendancesBySubjectId = async ({
  params,
  body,
}: CreateAttendancesContext): Promise<Response> => {
  const results = await Promise.all(
    body.attendances.map(async (attendance) => {
      const attendanceToCreate: Attendance = {
        userId: attendance.userId,
        subjectId: params.subjectId,
        tenantId: body.tenantId,
        status: attendance.status,
        comment: attendance.comment,
      };

      const response = await createAttendance(attendanceToCreate);
      return response !== null;
    })
  );

  if (results.every((r) => r === true))
    return {
      message: "The attendance record was successfully completed.",
      status: 200,
    };
  else
    return {
      message: "Attendance registration was not completed successfully.",
      status: 400,
    };
};

export const getAttendanceByStudent = async ({
  params,
  query,
}: GetAttendanceByStudentContext) => {
  const response = await getAttendanceByStudentId(
    params.studentId,
    query.subjectId,
    query.tenantId
  );

  if (response)
    return {
      message: "Attendance found",
      data: response,
      status: 200,
    };
  else
    return {
      message: "Attendance not found",
      status: 404,
    };
};
