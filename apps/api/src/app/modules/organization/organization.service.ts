import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrganizationDto } from './dto/organization.dto';
import { Organization, OrganizationDocument } from './schema/organization.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class OrganizationService {

  constructor(
    @InjectModel(Organization.name) private readonly orgModel: Model<OrganizationDocument>,
    private userService: UserService
  ) { }

  findByEmail(email: string) {
    return this.orgModel.findOne({ email })
  }

  findById(id: Types.ObjectId | string, populate?: 'departments') {
    return this.orgModel.findById(id).populate(populate)
  }

  async create(payload: CreateOrganizationDto) {
    const existing = await this.findByEmail(payload.email)
    if (existing) throw new HttpException({ error: 'Organization already exists' }, HttpStatus.CONFLICT);

    const user = await this.userService.findById(payload.created_by)

    if (user?.my_organization) throw new HttpException({ error: 'User can create one Organization at max' }, HttpStatus.CONFLICT);

    const newOrg = new this.orgModel(payload)
    const newOrgData = await newOrg.save()

    await user.update({ my_organization: newOrgData._id })

    return newOrgData
  }

  async getOrganization(id: string) {
    const organization = await this.findById(id, 'departments')
    if (!organization) throw new HttpException({ error: 'No Organization found' }, HttpStatus.NOT_FOUND);
    return organization
  }

  async getAllOrganizations() {
    const allOrganizations = await this.orgModel.find({})
    return allOrganizations
  }

  async addTeacherToOrganization(orgId: string, email: string) {
    const organization = await this.findById(orgId)
    if (!organization) throw new HttpException({ error: 'No Organization found' }, HttpStatus.NO_CONTENT);

    const user = await this.userService.findByEmail(email)
    if (!user) throw new HttpException({ error: 'No User found' }, HttpStatus.NO_CONTENT);

    if (user.id === organization.created_by) throw new HttpException({
      error: 'Organization owner is already treated as a teacher!'
    }, HttpStatus.BAD_REQUEST)

    if (organization.teachers.includes(user._id)) throw new HttpException({
      error: 'Teacher already exist'
    }, HttpStatus.BAD_REQUEST)

    await organization.updateOne({
      $addToSet: {
        teachers: user._id
      }
    })

    return { message: "Teacher added successfully" }
  }


  // [TODO] add checking only organization owner can make changes to their organization
  async addDepartments(organization_id: string, departmenentIds: string | string[]) {
    const updatedDepartment = await this.orgModel
      .findOneAndUpdate({ _id: organization_id }, {
        $addToSet: {
          departments: Array.isArray(departmenentIds) ? { $each: departmenentIds } : departmenentIds
        }
      }, { new: true, populate: 'departments' })
    return updatedDepartment
  }

  async removeDepartments(organization_id: string, departmenentIds: string | string[]) {
    const updatedDepartment = await this.orgModel.findOneAndUpdate({ _id: organization_id }, {
      $pull: {
        departments: Array.isArray(departmenentIds) ? { $in: departmenentIds } : departmenentIds
      }
    }, { new: true, populate: 'departments' })
    return updatedDepartment
  }
}
