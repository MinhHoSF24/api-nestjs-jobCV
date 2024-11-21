import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage('Create a Role')
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @User() user: IUser
  ) {
    return await this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage('Fetch List Role with Paginate')
  findAll(
    @Query('current') currentPage: string, // const currentPage: string  = req.query.page
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.rolesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch a Role by id')
  findOne(@Param('id') id: string) {
    const foundRole = this.rolesService.findOne(id);
    if (!foundRole) {
      return 'Not found role';
    }
    return foundRole;
  }

  @Patch(':id')
  @ResponseMessage('Update Role')
  update(
    @Param('id') id: string, 
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUser,
  ) {
    return this.rolesService.update(id, updateRoleDto,user);
  }

  @Delete(':id')
  @ResponseMessage('Delete Role')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }
}
