import { IsArray, IsNotEmpty } from "class-validator";

export class CreateSubscriberDto {
    @IsNotEmpty({
        message: "Email không được để trống!"
    })
    email: string;

    @IsNotEmpty({
        message: "Name không được để trống!"
    })
    name: string;

    @IsNotEmpty({
        message: "Skill không được để trống!"
    })
    @IsArray({ message: "Skills phải có định dạng là array"})
    skills: string[];
}
