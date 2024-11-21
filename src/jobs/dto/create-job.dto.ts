import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";


class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    logo: string;
  }

export class CreateJobDto {
    @IsNotEmpty({
        message: "Name không được để trống!"
    })
    name: string;
    @IsNotEmpty({
        message: "Skill không được để trống!"
    })
    @IsArray({ message: "Skills phải có định dạng là array"})
    // @IsString({ message: "Skill phải có định dạng là string"})
    skills: string[];
    @IsNotEmpty({
        message: "Location không được để trống!"
    })
    location: string;
    @IsNotEmpty({
        message: "Description không được để trống!"
    })
    description: string;
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;
    @IsNotEmpty({
        message: "Salary không được để trống!"
    })
    salary: number;
    @IsNotEmpty({
        message: "Quantity không được để trống!"
    })
    quantity: number;
    @IsNotEmpty({
        message: "Level không được để trống!"
    })
    level: string;
    @IsNotEmpty({
        message: "Start Date không được để trống!"
    })
    @Transform(({value}) => new Date(value))
    @IsDate({
        message: "Start Date phải đúng định dạng ngày!"
    })
    startDate: Date;
    @IsNotEmpty({
        message: "Start Date không được để trống!"
    })
    @Transform(({value}) => new Date(value))
    @IsDate({
        message: "End Date phải đúng định dạng ngày!"
    })
    endDate: Date;
    @IsNotEmpty({
        message: "isActive không được để trống!"
    })
    @IsBoolean({message: "isActive phải có định dạng là boolean"})
    isActive: boolean;
}
