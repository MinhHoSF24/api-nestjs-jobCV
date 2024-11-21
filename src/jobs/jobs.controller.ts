import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage("Create a Job")
  async create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    let job = await this.jobsService.create(createJobDto,user);
    return {
      _id: job?._id,
      createdAt: job?.createdAt
    }
  }

  @Public()
  @Get()
  @ResponseMessage("Fetch List Job with Paginate")
  findAll(
    @Query("current") currentPage: string, // const currentPage: string  = req.query.page
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @UseGuards()
  @Get(':id')
  @ResponseMessage("Fetch a Job by id")
  async findOne(@Param('id') id: string) {
    const foundJob = await this.jobsService.findOne(id);
    if(!foundJob){
      return "Not Found Job";
    }
    return foundJob;
  }

  @Patch(':id')
  @ResponseMessage("Update a job")
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser
  ) {
    let updatedJob = await this.jobsService.update(id,updateJobDto,user);
    return updatedJob;
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.jobsService.remove(id, user);
  }
}
