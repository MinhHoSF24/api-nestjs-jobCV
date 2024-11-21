import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
    @IsNotEmpty({ message: "name không được bỏ trống"})
    name: string;

    @IsNotEmpty({ message: "description không được bỏ trống"})
    description: string;

    @IsNotEmpty({ message: "isActive không được bỏ trống"})
    @IsBoolean({message: "isActive có giá trị boolean"})
    isActive: boolean;

    @IsNotEmpty({ message: "name không được bỏ trống"})
    @IsMongoId({each: true, message: "each permission là mongo object id"})
    @IsArray({message: "permisstions có định dạng là array"})
    permissions: mongoose.Schema.Types.ObjectId[];
}
