import { Injectable, Logger } from '@nestjs/common';
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

  async getAll() {
    return this.departmentModel.find({})
  }

  async seed() {
    const departments = [
      {
        name: 'Computer Science',
        description: 'It is the study of computers and computational systems.',
      },
      {
        name: 'Mechanical',
        description: 'It is an engineering branch that combines engineering physics and mathematics.'
      },
      {
        name: 'Electrical',
        description: 'It is an engineering discipline concerned with the study, design, and application of electronic devices.'
      },
    ]

    const promises = departments.map((d) => this.create(d))
    await Promise.allSettled(promises)
    return `[SEED] create:departments ran successfully`
  }
}
