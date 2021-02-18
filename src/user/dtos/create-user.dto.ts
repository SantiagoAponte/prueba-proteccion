import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Gallery } from "../../galery/entities";
import { IsNull } from "typeorm";

export class CreateUserDto {

    @MaxLength(30)
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsObject()
    profileImage:Gallery;



}
