import { Types } from "mongoose";

export class CreateOrganizationDto {
  name: string;
  email: string;
  website?: string;
  information: string;
  address: string;
  logo?: string;
  created_by: string;
  departments?: Types.ObjectId[]; // department ids
  teachers?: Types.ObjectId[]
}

export class AddRemoveDepartmentDto {
  departments: string | string[]
}

export class AddRemoveTeacher {
  email: string
}