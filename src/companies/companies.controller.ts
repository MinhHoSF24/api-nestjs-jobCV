import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ResponseMessage("Create a Company")
  async create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    let newCompany = await this.companiesService.create(createCompanyDto,user);
    return {
      _id: newCompany._id,
      createdAt: newCompany?.createdAt
    };
  }

  @Public()
  @Get()
  @ResponseMessage("Fetch List Company with Paginate")
  findAll(
    @Query("current") currentPage: string, // const currentPage: string  = req.query.page
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.companiesService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @UseGuards()
  @Get(':id')
  @ResponseMessage("Fetch a Company by id")
  async findOne(@Param('id') id: string) {
    const foundCompany = await this.companiesService.findOne(id);
    if(!foundCompany){
      return "Not Found Company";
    }
    return foundCompany;
  }

  @Patch(':id')
  @ResponseMessage("Update Company")
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser
  ) {
    return this.companiesService.update(id,updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete Company")
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.companiesService.remove(id, user);
  }
}
