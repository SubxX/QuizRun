import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateDepartmentDto } from './dto/department.dto';
import { Department, DepartmentDocument } from './schema/department.schema';

@Injectable()
export class DepartmentService {

    constructor(
        @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
    ) { }

    async create(payload: CreateDepartmentDto) {
        const newDepartment = new this.departmentModel(payload)
        return newDepartment.save()
    }
}
