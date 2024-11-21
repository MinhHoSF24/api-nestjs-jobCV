import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage("Create a Resume")
  async create(@Body() createUserCvDto: CreateUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createUserCvDto, user);
  }

  // @Public()
  @Get()
  @ResponseMessage("Fetch All Resume with Paginate")
  findAll(
    @Query("current") currentPage: string, // const currentPage: string  = req.query.page
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }

  // @Public()
  @Get(':id')
  @ResponseMessage("Get Resume by id")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Post('by-user')
  @ResponseMessage("Get Resume by User")
  getResumeByUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }

  @Patch(':id')
  @ResponseMessage("Update status Resume")
  updateStatus(@Param('id') id: string, @Body("status") status: string, @User() user: IUser) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete Resume")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
