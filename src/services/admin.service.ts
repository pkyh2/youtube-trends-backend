import { adminRepository } from "../repositories/admin.repository";
import {
  CreateShortsStoryInput,
  ShortsStoryCreateResult,
  ShortsStoryFullScriptUpdateResult,
} from "../types/admin.types";

export class AdminService {
  async createShortsStory(
    data: CreateShortsStoryInput
  ): Promise<ShortsStoryCreateResult> {
    return await adminRepository.createShortsStory(data);
  }

  async updateShortsStoryFullScript(
    id: number,
    fullScript: string
  ): Promise<ShortsStoryFullScriptUpdateResult | null> {
    return await adminRepository.updateShortsStoryFullScript(id, fullScript);
  }
}

export const adminService = new AdminService();
