import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products') // Group endpoints in Swagger
@ApiBearerAuth() // Add JWT authentication to Swagger
@UseGuards(JwtAuthGuard) // Protect all routes
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductDto
  ) {
    const userId = req.user.userId; // Extract user ID from the JWT
    return this.productService.createProduct(userId, createProductDto);
  }

  @Get()
  async getProducts(@Request() req) {
    const userId = req.user.userId;
    return this.productService.getProducts(userId);
  }

  @Patch(':id')
  async updateProduct(
    @Request() req,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const userId = req.user.userId;
    return this.productService.updateProduct(userId, id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.productService.deleteProduct(userId, id);
  }

  @Get('search')
  async searchProducts(@Request() req, @Query('query') query: string) {
    const userId = req.user.userId;
    return this.productService.searchProducts(userId, query);
  }
}
