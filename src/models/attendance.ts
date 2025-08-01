export interface Attendance {
  id?: string;
  userId: string;
  subjectId: string;
  tenantId: string;
  comment: string;
  status:
    | "present"
    | "late"
    | "absent"
    | "excused"
    | "unexcused"
    | "left_early"
    | "remote"
    | "incomplete";
  isActive?: boolean;
  created?: Date;
  updated?: Date;
  deleted?: Date;
}
