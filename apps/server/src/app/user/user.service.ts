import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Find a user by email
   * @param email - The email of the user to find
   * @returns User or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Create a new user
   * @param createUserDto - Data to create the user
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  /**
   * Find a user by their ID
   * @param id - The ID of the user to find
   * @returns User or null if not found
   */
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  /**
   * List all users (optional: exclude sensitive information)
   * @returns List of users
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find({}, '-password').exec(); // Exclude passwords
  }
}
