import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schema/organization.schema';
import { Department, DepartmentSchema } from '../department/schema/department.schema';
import { DepartmentService } from '../department/department.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: Department.name, schema: DepartmentSchema }
    ]),
    UserModule
  ],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    DepartmentService
  ],
  exports: [
    OrganizationService
  ]
})
export class OrganizationModule { }
