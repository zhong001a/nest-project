import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UPdateItemDto extends PartialType(CreateItemDto) {}
