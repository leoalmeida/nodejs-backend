import { model as UserModel } from '../database/model/user-model.js';
import badRequestException from '../errors/bad-request-exception.js';
import NotFoundException from '../errors/not-found-exception.js';

export default class UserService {
  async createUser(userData) {
    try {
      return await UserModel.create({ ...userData, createdAt: new Date() });
    } catch (error) {
      throw new badRequestException(error.message);
    }
  }

  async getAllUsers() {
    return await UserModel.find({});
  }

  async getUserById(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async updateUser(id, userData) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...userData, lastModifiedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }
    return updatedUser;
  }

  async deleteUserById(id) {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found.');
    }
    return deletedUser;
  }
}