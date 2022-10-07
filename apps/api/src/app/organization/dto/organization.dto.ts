import { Types } from "mongoose";

export class CreateOrganizationDto {
    name: string;
    email: string;
    password: string;
    website?: string;
    information: string;
    address: string;
    logo?: string;
    departments?: Types.ObjectId[]; // department ids
}