import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto.js';

// Dùng OmitType để loại bỏ trường 'ownerId', sau đó dùng PartialType để biến các trường còn lại thành không bắt buộc
export class UpdateProjectDto extends PartialType(
    OmitType(CreateProjectDto, ['ownerId'] as const)
) {}
