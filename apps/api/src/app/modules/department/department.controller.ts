import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService
  ) { }

  @Post('create')
  async register(@Body() createDepartmentPayload: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentPayload)
  }

  @Get('all')
  async getDepartments() {
    return this.departmentService.getAll()
  }

  @Get('seed')
  async seedDepartments() {
    return this.departmentService.seed()
  }

}
