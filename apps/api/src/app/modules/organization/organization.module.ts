import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schema/organization.schema';
import { Department, DepartmentSchema } from '../department/schema/department.schema';
import { BcryptService } from '@api/app/shared/bcrypt.service';
import { DepartmentService } from '../department/department.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Department.name, schema: DepartmentSchema }
    ]),
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    DepartmentService,
    BcryptService
  ]
})
export class OrganizationModule { }
