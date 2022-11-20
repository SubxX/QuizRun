import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BcryptService } from '@api/app/shared/bcrypt.service';
import { CreateOrganizationDto } from './dto/organization.dto';
import { OrganizationDetails } from './interface/organization.interface';
import { Organization, OrganizationDocument } from './schema/organization.schema';

@Injectable()
export class OrganizationService {

  constructor(
    @InjectModel(Organization.name) private readonly orgModel: Model<OrganizationDocument>,
    private readonly bcrypt: BcryptService,
  ) { }

  _getOrganizationDetails(organization: OrganizationDocument): OrganizationDetails {
    return {
      _id: organization._id,
      name: organization.name,
      email: organization.email,
      website: organization.website,
      information: organization.information,
      address: organization.address,
      logo: organization.logo,
      departments: organization.departments,
    }
  }

  async findByEmail(email: string) {
    return this.orgModel.findOne({ email })
  }

  getOrganizationByEmail(email: string) {
    return this.orgModel.findOne({ email })
  }

  getOrganizationById(id: Types.ObjectId | string, populate?: 'departments') {
    return this.orgModel.findById(id).populate(populate)
  }

  async register(payload: CreateOrganizationDto) {
    const { password, ...rest } = payload

    const existing = await this.getOrganizationByEmail(rest.email)
    if (existing) throw new HttpException({ status: HttpStatus.CONFLICT, error: 'Organization already exists' }, HttpStatus.CONFLICT);

    const hashedPassword = await this.bcrypt.hashPassword(password)
    const newOrg = new this.orgModel({ ...rest, password: hashedPassword })
    const newOrgData = await newOrg.save()
    return this._getOrganizationDetails(newOrgData)
  }

  async getOrganization(id: string) {
    const organization = await this.getOrganizationById(id, 'departments')
    if (!organization) throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'No Organization found' }, HttpStatus.NO_CONTENT);
    return this._getOrganizationDetails(organization)
  }

  async getAllOrganizations() {
    const allOrganizations = await this.orgModel.find({}, { password: 0 })
    return allOrganizations
  }


  // [TODO] add checking only organization owner can make changes to their organization
  async addDepartments(organization_id: string, departmenentIds: string | string[]) {
    const updatedDepartment = await this.orgModel.findOneAndUpdate({ _id: organization_id }, {
      $addToSet: {
        departments: Array.isArray(departmenentIds) ? { $each: departmenentIds } : departmenentIds
      }
    }, { new: true, populate: 'departments' })
    return this._getOrganizationDetails(updatedDepartment)
  }

  async removeDepartments(organization_id: string, departmenentIds: string | string[]) {
    const updatedDepartment = await this.orgModel.findOneAndUpdate({ _id: organization_id }, {
      $pull: {
        departments: Array.isArray(departmenentIds) ? { $in: departmenentIds } : departmenentIds
      }
    }, { new: true, populate: 'departments' })
    return this._getOrganizationDetails(updatedDepartment)
  }
}
