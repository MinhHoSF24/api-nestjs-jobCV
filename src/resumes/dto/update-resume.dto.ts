import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsArray, isArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';

class UpdatedBy{
    @IsNotEmpty()
    _id: Types.ObjectId;

    @IsNotEmpty()
    @IsEmail()
    email: Types.ObjectId;
}
class History{
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    updatedAt: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UpdatedBy)
    updatedBy: UpdatedBy;
}


export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsNotEmpty({message: "history không được để trống!"})
    @IsArray({message: "history phải có định dạng là array"})
    @ValidateNested()
    @Type(() => History)
    history: History[];
}
