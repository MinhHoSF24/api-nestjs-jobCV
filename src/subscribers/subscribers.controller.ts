import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage("Create Subscriber ")
  async create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser,
  ) {
    let subscriber = await this.subscribersService.create(
      createSubscriberDto,
      user,
    );
    return subscriber;
  }

  // @Public()
  @Get()
  @ResponseMessage("Fetch List Job with Paginate")
  findAll(
    @Query("current") currentPage: string, // const currentPage: string  = req.query.page
    @Query("pageSize") limit: string,
    @Query() qs: string
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }

  // @Public()
  // @UseGuards()
  @Get(':id')
  @ResponseMessage("Fetch a Subscriber by id")
  async findOne(@Param('id') id: string) {
    const foundSubscriber = await this.subscribersService.findOne(id);
    if(!foundSubscriber){
      return "Not Found Subscriber";
    }
    return foundSubscriber;
  }

  @Patch(':id')
  @ResponseMessage("Update a subscriber")
  async update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser
  ) {
    let updatedSubscriber = await this.subscribersService.update(id,UpdateSubscriberDto,user);
    return updatedSubscriber;
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.subscribersService.remove(id, user);
  }
}
