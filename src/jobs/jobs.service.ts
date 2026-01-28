import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { Job, JobDocument } from './schemas/job.schema';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  /**
   * Tạo một công việc mới
   * @param createJobDto - Dữ liệu để tạo công việc
   * @param user - Thông tin người dùng tạo công việc
   * @returns Promise<Job> - Công việc vừa được tạo
   */
  create(createJobDto: CreateJobDto, user: IUser) {
    const {
      name, skills, company, salary, quantity,
      level, description, startDate, endDate,
      isActive, location
    } = createJobDto;
    return this.jobModel.create({
      name, skills, company, salary, quantity,
      level, description, startDate, endDate,
      isActive, location,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  /**
   * Lấy danh sách tất cả công việc với phân trang và lọc
   * @param currentPage - Trang hiện tại
   * @param limit - Số lượng bản ghi mỗi trang
   * @param qs - Query string để lọc và sắp xếp dữ liệu
   * @returns Promise<Object> - Object chứa metadata và danh sách kết quả
   */
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  /**
   * Tìm một công việc theo ID
   * @param id - ID của công việc cần tìm
   * @returns Promise<Job | string> - Công việc tìm được hoặc thông báo lỗi
   */
  async findOne(id: string) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await this.jobModel.findById(id);
    }
    return 'Not found job';
  }

  /**
   * Cập nhật thông tin công việc
   * @param id - ID của công việc cần cập nhật
   * @param updateJobDto - Dữ liệu cập nhật
   * @param user - Thông tin người dùng thực hiện cập nhật
   * @returns Promise<UpdateResult> - Kết quả của việc cập nhật
   */
  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  /**
   * Xóa mềm một công việc (soft delete)
   * @param id - ID của công việc cần xóa
   * @param user - Thông tin người dùng thực hiện xóa
   * @returns Promise<any> - Kết quả của việc xóa mềm
   */
  async remove(id: string, user: IUser) {
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.jobModel.softDelete({
      _id: id,
    });
  }
}
