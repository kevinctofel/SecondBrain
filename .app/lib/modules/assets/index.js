import { transformParser } from "./parser.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const assetsModule = {
  /**
   * Sets up the module.
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {
    config.addTransform(`assets-transform-parser`, transformParser);

    // Copy Images/ (repo root) to dist/ after build.
    // __dirname = .app/lib/modules/assets → repo root is 4 levels up.
    config.on("eleventy.after", () => {
      const src = path.resolve(__dirname, "../../../../Images");
      const dest = path.resolve(__dirname, "../../../dist/Images");
      if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
      }
    });
  },
};
