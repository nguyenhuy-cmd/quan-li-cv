import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../entities/user.entity.js";

export class CreateUserDto {
  @IsString({ message: "Họ tên phải là chuỗi" })
  @IsNotEmpty({ message: "Họ tên phải bắt buộc" })
  Full_name: string;

  @IsString({ message: "Email là chuỗi" })
  @IsNotEmpty({ message: "Email phải bắt buộc" })
  email: string;

  @IsString({ message: "Mật khẩu phải là chuỗi" })
  @IsNotEmpty({ message: "Mật khẩu phải bắt buộc" })
  password: string;

  @IsOptional({ message: "Vai trò không bắt buộc phải điền" })
  @IsEnum(UserRole, { message: "Vai trò không hợp lệ" })
  role?: UserRole;
}

export class RegisterUserDto {
  @IsString({message: "Họ tên phải là chuỗi"})
  @IsNotEmpty({message: "Họ tên phải bắt buộc"})
  Full_name: string;

  @IsString({message: "Email phải là chuỗi"})
  @IsNotEmpty({message: "Email phải bắt buộc"})
  email: string;

  @IsString({message: "Password phải là chuỗi"})
  @IsNotEmpty({message: "Password phải bắt buộc"})
  password: string;

  @IsOptional({message:"Vai trò không bắt buộc phải điền"})
  @IsEnum(UserRole, { message: "Vai trò không hợp lệ" })
  role?: UserRole;
}
