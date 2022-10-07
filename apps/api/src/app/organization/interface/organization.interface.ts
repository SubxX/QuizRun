import { CreateOrganizationDto } from "../dto/organization.dto"
import { Department } from "../schema/department.schema"


export type OrganizationDetails = Omit<CreateOrganizationDto, 'password' | 'departments'> & {
    _id: string,
    departments: Department[]
}