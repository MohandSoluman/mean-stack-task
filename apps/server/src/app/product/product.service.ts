import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  // Create a new product
  async createProduct(
    userId: string,
    createProductDto: CreateProductDto
  ): Promise<Product> {
    const newProduct = new this.productModel({ ...createProductDto, userId });
    return newProduct.save();
  }

  // Get products for a specific user
  async getProducts(userId: string): Promise<Product[]> {
    return this.productModel.find({ userId }).exec();
  }

  // Update a product by ID
  async updateProduct(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate(
      { _id: productId, userId }, // Ensure the product belongs to the user
      updateProductDto,
      { new: true } // Return the updated product
    );

    if (!product) {
      throw new NotFoundException('Product not found or unauthorized');
    }

    return product;
  }

  // Delete a product by ID
  async deleteProduct(userId: string, productId: string): Promise<void> {
    const result = await this.productModel
      .deleteOne({ _id: productId, userId })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Product not found or unauthorized');
    }
  }

  // Search for products by name, category, or code
  async searchProducts(userId: string, query: string): Promise<Product[]> {
    return this.productModel
      .find({
        userId,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { code: { $regex: query, $options: 'i' } },
        ],
      })
      .exec();
  }
}
