import { JwtGuard } from '@api/app/guard/jwt.guard';
import { Body, Controller, Post, Get, Param, Patch, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { CreateOrganizationDto, AddRemoveDepartmentDto } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('register')
  async register(@Body() payload: CreateOrganizationDto) {
    return this.organizationService.register(payload)
  }

  @Get('all')
  async getAllOrganizations() {
    return this.organizationService.getAllOrganizations()
  }

  @Get(':id') // :id refers to organization id
  async getOrganizationById(@Param() params) {
    return this.organizationService.getOrganization(params.id)
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add-department')
  async addDeptToOrg(@Request() req, @Param() params, @Body() payload: AddRemoveDepartmentDto) {
    if (params.id !== req.user._id) throw new HttpException({
      status: HttpStatus.UNAUTHORIZED, error: "Permission deined"
    }, HttpStatus.UNAUTHORIZED)
    return this.organizationService.addDepartments(params.id, payload?.departments ?? [])
  }

  @UseGuards(JwtGuard)
  @Patch(':id/remove-department')
  async removeDeptFromOrg(@Request() req, @Param() params, @Body() payload: AddRemoveDepartmentDto) {
    console.log(req.user._id, params.id)
    if (params.id !== req.user._id) throw new HttpException({
      status: HttpStatus.UNAUTHORIZED, error: "Permission deined"
    }, HttpStatus.UNAUTHORIZED)
    return this.organizationService.removeDepartments(params.id, payload?.departments ?? [])
  }

}
