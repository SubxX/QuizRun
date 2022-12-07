import { JwtGuard } from '@api/app/guard/jwt.guard';
import { OrganizationGuard } from '@api/app/guard/organization.guard';
import { Body, Controller, Post, Get, Param, Patch, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrganizationDto, AddRemoveDepartmentDto, AddRemoveTeacher } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Get('all')
  async getAllOrganizations() {
    return this.organizationService.getAllOrganizations()
  }

  @Get(':id') // :id refers to organization id
  async getOrganizationById(@Param() params) {
    return this.organizationService.getOrganization(params.id)
  }

  @UseGuards(JwtGuard)
  @Post('new')
  async new(@Request() req, @Body() payload: CreateOrganizationDto) {
    return this.organizationService.create({ ...payload, created_by: req?.user?._id })
  }

  @UseGuards(JwtGuard, OrganizationGuard)
  @Patch(':id/add-department')
  async addDeptToOrg(@Request() req, @Param() params, @Body() payload: AddRemoveDepartmentDto) {
    return this.organizationService.addDepartments(params.id, payload?.departments ?? [])
  }

  @UseGuards(JwtGuard, OrganizationGuard)
  @Patch(':id/remove-department')
  async removeDeptFromOrg(@Request() req, @Param() params, @Body() payload: AddRemoveDepartmentDto) {
    return this.organizationService.removeDepartments(params.id, payload?.departments ?? [])
  }

  @UseGuards(JwtGuard, OrganizationGuard)
  @Patch(':id/add-teacher')
  async addTeacherToOrg(@Request() req, @Param() params, @Body() payload: AddRemoveTeacher) {
    return this.organizationService.addTeacherToOrganization(params.id, payload.email)
  }

}
