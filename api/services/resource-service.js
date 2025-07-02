import { model as ResourceModel } from '../database/model/resource-model.js';
import badRequestException from '../errors/bad-request-exception.js';
import NotFoundException from '../errors/not-found-exception.js';

export default class ResourceService {
  async createResource(resourceData) {
    try {
      return await ResourceModel.create({ ...resourceData, createdAt: new Date() });
    } catch (error) {
      throw new badRequestException(error.message);
    }
  }

  async getAllResources() {
    return await ResourceModel.find({});
  }

  async getResourceById(id) {
    const resource = await ResourceModel.findById(id);
    if (!resource) {
      throw new NotFoundException('Resource not found.');
    }
    return resource;
  }

  async updateResource(id, resourceData) {
    const updatedResource = await ResourceModel.findByIdAndUpdate(
      id,
      { ...resourceData, lastModifiedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      throw new NotFoundException('Resource not found.');
    }
    return updatedResource;
  }

  async deleteResourceById(id) {
    const deletedResource = await ResourceModel.findByIdAndDelete(id);
    if (!deletedResource) {
      throw new NotFoundException('Resource not found.');
    }
    return deletedResource;
  }
}