import { transformParser } from "./parser.js";
import fs from "fs";
import path from "path";

export const assetsModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addTransform(`assets-transform-parser`, transformParser);

    // After the build completes, copy Images/ from repo root to dist
    config.on("eleventy.after", async () => {
      const inputDir = path.resolve(process.cwd(), "../");
      const imagesSrc = path.join(inputDir, "Images");
      const imagesDest = path.join(process.cwd(), "dist", "Images");

      if (fs.existsSync(imagesSrc)) {
        fs.cpSync(imagesSrc, imagesDest, { recursive: true });
      }
    });
  },
};
