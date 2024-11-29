import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'P001', description: 'Unique code for the product' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category of the product',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 999.99, description: 'Price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
