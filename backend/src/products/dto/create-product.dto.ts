import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity!: number;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;
}
