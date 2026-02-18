import prisma from "../config/database";
import {
  CreateShortsStoryInput,
  ShortsStoryCreateResult,
  ShortsStoryFullScriptUpdateResult,
} from "../types/admin.types";

export class AdminRepository {
  async createShortsStory(
    data: CreateShortsStoryInput
  ): Promise<ShortsStoryCreateResult> {
    return await prisma.shortsStory.create({
      data: {
        category: data.category ?? "GENERAL",
        title: data.title ?? "Untitled Story",
        full_script: data.fullScript,
      },
      select: {
        id: true,
        category: true,
        title: true,
        full_script: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async updateShortsStoryFullScript(
    id: number,
    fullScript: string
  ): Promise<ShortsStoryFullScriptUpdateResult | null> {
    const existingStory = await prisma.shortsStory.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingStory) {
      return null;
    }

    return await prisma.shortsStory.update({
      where: { id },
      data: {
        full_script: fullScript,
      },
      select: {
        id: true,
        full_script: true,
        updated_at: true,
      },
    });
  }
}

export const adminRepository = new AdminRepository();
