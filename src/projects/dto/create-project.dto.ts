import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty({message: "Tên phải bắt buộc"})
    @IsString({message: 'Tên bắt buộc là 1 chuỗi'})
    name: string;

    @IsNotEmpty({message:'Miêu tả phải bắt buộc'})
    @IsString({message: 'Miêu tả bắt buộc là chuỗi'})
    description: string;

    @IsNotEmpty({message:'ID chủ sở hữu là bắt buộc'})
    @IsNumber({}, {message: 'ID chủ sở hữu phải là số'})
    ownerId: number;

}
