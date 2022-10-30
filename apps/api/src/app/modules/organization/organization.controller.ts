import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('register')
  async register(@Body() createUserPayload: CreateOrganizationDto) {
    return this.organizationService.register(createUserPayload)
  }

  @Get(':id') // :id refers to organization id
  async getOrganizationById(@Param() params) {
    return this.organizationService.getOrganization(params.id)
  }

}
