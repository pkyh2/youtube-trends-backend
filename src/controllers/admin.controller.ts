import { Request, Response } from "express";
import { adminService } from "../services/admin.service";

export class AdminController {
  async createShortsStory(req: Request, res: Response): Promise<void> {
    try {
      const { fullScript, title, category } = req.body;

      if (typeof fullScript !== "string" || fullScript.trim().length === 0) {
        res.status(400).json({
          error: "fullScript is required and must be a non-empty string",
        });
        return;
      }

      if (title !== undefined && typeof title !== "string") {
        res.status(400).json({
          error: "title must be a string",
        });
        return;
      }

      if (category !== undefined && typeof category !== "string") {
        res.status(400).json({
          error: "category must be a string",
        });
        return;
      }

      const createdStory = await adminService.createShortsStory({
        fullScript,
        title,
        category,
      });

      res.status(201).json({
        success: true,
        data: {
          id: createdStory.id,
          category: createdStory.category,
          title: createdStory.title,
          fullScript: createdStory.full_script,
          status: createdStory.status,
          createdAt: createdStory.created_at,
          updatedAt: createdStory.updated_at,
        },
      });
    } catch (error) {
      console.error("Error creating shorts story:", error);
      res.status(500).json({
        error: "Failed to create shorts story",
      });
    }
  }

  async updateShortsStoryFullScript(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { fullScript } = req.body;

      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({
          error: "Invalid story id",
        });
        return;
      }

      if (typeof fullScript !== "string" || fullScript.trim().length === 0) {
        res.status(400).json({
          error: "fullScript is required and must be a non-empty string",
        });
        return;
      }

      const updatedStory = await adminService.updateShortsStoryFullScript(
        id,
        fullScript
      );

      if (!updatedStory) {
        res.status(404).json({
          error: "Shorts story not found",
        });
        return;
      }

      res.json({
        success: true,
        data: {
          id: updatedStory.id,
          fullScript: updatedStory.full_script,
          updatedAt: updatedStory.updated_at,
        },
      });
    } catch (error) {
      console.error("Error updating shorts story full_script:", error);
      res.status(500).json({
        error: "Failed to update shorts story full_script",
      });
    }
  }
}

export const adminController = new AdminController();
