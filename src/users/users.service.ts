import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
  create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    const hashPassword = this.hashPassword(password);
    const result = this.userModel.create({
      email,
      password: hashPassword,
      name,
    });
    return result;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'User not found!',
      };
    }
    return this.userModel.findOne({
      _id: id,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'User not found!',
      };
    }
    return this.userModel.updateOne(
      {
        _id: id,
      },
      updateUserDto,
    );
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        message: 'User not found!',
      };
    }
    return this.userModel.deleteOne({
      _id: id,
    });
  }
}
