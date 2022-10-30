import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from '../department/schema/department.schema';

import { DepartmentService } from '../department/department.service';
import { DepartmentController } from './department.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema }
    ]),
  ],
  controllers: [
    DepartmentController
  ],
  providers: [
    DepartmentService,
  ],
})
export class DepartmentModule { }
