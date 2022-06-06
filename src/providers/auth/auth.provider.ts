import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UserDocument } from 'src/schemas/user/user.schema';
@Injectable()
export class AuthProvider {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('-__v -confirmToken');
  }
}
