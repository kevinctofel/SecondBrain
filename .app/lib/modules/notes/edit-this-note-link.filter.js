import { execSync } from "child_process";
import { sourcePathsMap } from "./note-source-paths.js";

/**
 * Creates the editThisNoteLink filter.
 * Resolves the note's source path via the module-level sourcePathsMap, which
 * is keyed on the raw Eleventy page.filePathStem, so a note whose file is
 * "2020-05-30-some-post.md" still resolves to the real (date-prefixed) file.
 * Falls back to the plain filePathStem when the map has no entry.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {((page: {filePathStem: string}, config: {url: string}) => string)}
 */
export const editThisNoteLinkFilter = () => {
  const branch = getGitBranch();

  return function (page, config) {
    if (typeof config !== "object" || config === null) {
      return "";
    }
    const stem = page.filePathStem.replace(/^\//, "").toLowerCase();
    const filePath = sourcePathsMap.get(stem) ?? stem;
    const file = `${filePath}.md`;
    const url = config.url;

    return url
      .replace(/\{\{\s*branch\s*\}\}/gi, encodeURI(branch))
      .replace(/\{\{\s*file\s*\}\}/gi, encodeURI(file));
  };
};

function getGitBranch() {
  try {
    // Hide output, we don't want to show an error if it's not a git repo
    const options = { stdio: "pipe" };
    const branch = execSync("git branch --show-current", options)
      .toString()
      .trim();

    // If git is not available or in a git repo, branch will be empty
    // Fall back to the main branch
    return branch || "main";
  } catch (err) {
    // Fallback to main if git branch fails
    return "main";
  }
}
