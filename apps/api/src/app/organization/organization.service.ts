import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BcryptService } from '@api/app/shared/bcrypt.service';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';
import { CreateOrganizationDto } from './dto/organization.dto';
import { OrganizationDetails } from './interface/organization.interface';
import { Organization, OrganizationDocument } from './schema/organization.schema';

@Injectable()
export class OrganizationService {

    constructor(
        @InjectModel(Organization.name) private readonly orgModel: Model<OrganizationDocument>,
        private readonly bcrypt: BcryptService,
        private department: DepartmentService
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
        return newOrg.save()
    }

    async createDepartmentForOrganization(payload: CreateDepartmentDto) {
        if (!payload.organization) throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Organization id required' }, HttpStatus.BAD_REQUEST);

        const organization = await this.getOrganizationById(payload.organization)
        if (!organization) throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'Organization not found' }, HttpStatus.NO_CONTENT);

        const dept = await this.department.create(payload)
        const updatedOrganization = await this.orgModel.findOneAndUpdate(
            { _id: payload.organization },
            { $push: { depertments: dept._id } },
            { new: true }
        )
        return updatedOrganization
    }

    async getOrganization(id: string) {
        const organization = await this.getOrganizationById(id, 'departments')
        if (!organization) throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'No Organization found' }, HttpStatus.NO_CONTENT);
        return this._getOrganizationDetails(organization)
    }
}
