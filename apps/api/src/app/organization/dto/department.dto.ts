import { Types } from "mongoose";

export class CreateDepartmentDto {
    name: string;
    icon?: string;
    description: string;
    organization: Types.ObjectId; // organization id
}