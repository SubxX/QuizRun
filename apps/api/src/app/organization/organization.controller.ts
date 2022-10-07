import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/department.dto';
import { CreateOrganizationDto } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('register')
  async register(@Body() createUserPayload: CreateOrganizationDto) {
    return this.organizationService.register(createUserPayload)
  }

  @Post('add-department')
  async addDepartment(@Body() createDepartmentPayload: CreateDepartmentDto) {
    return this.organizationService.createDepartmentForOrganization(createDepartmentPayload)
  }

  @Get(':id') // :id refers to organization id
  async getOrganizationById(@Param() params) {
    return this.organizationService.getOrganization(params.id)
  }

}
