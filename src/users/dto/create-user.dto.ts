import { Type } from 'class-transformer';
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, Max, Min, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

//data transfer object
class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {  
  @IsNotEmpty({
    message: 'Name không được để trống!',
  })
  name: string;
  @IsEmail()
  @IsNotEmpty({
    message: 'Email không được để trống!',
  })
  email: string;
  @IsNotEmpty({
    message: 'Password không được để trống!',
  })
  password: string;
  @IsNotEmpty({
    message: 'Age không được để trống!',
  })
  age: number;
  @IsNotEmpty({
    message: 'Gender không được để trống!',
  })
  gender: string;
  @IsNotEmpty({
    message: 'Address không được để trống!',
  })
  address: string;
  @IsNotEmpty({
    message: 'Role không được để trống!',
  })
  @IsMongoId({message: "role có định dạng là mongo id"})
  role:  mongoose.Schema.Types.ObjectId;
  @IsNotEmpty({
    message: 'Role không được để trống!',
  })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name không được để trống!',
  })
  name: string;
  @IsEmail()
  @IsNotEmpty({
    message: 'Email không được để trống!',
  })
  email: string;
  @IsNotEmpty({
    message: 'Password không được để trống!',
  })
  password: string;
  @IsNotEmpty({
    message: 'Age không được để trống!',
  })
  age: number;
  @IsNotEmpty({
    message: 'Gender không được để trống!',
  })
  gender: string;
  @IsNotEmpty({
    message: 'Address không được để trống!',
  })
  address: string;
}
