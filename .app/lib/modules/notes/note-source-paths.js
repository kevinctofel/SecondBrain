import { readdirSync, statSync } from "fs";
import { join, relative } from "path";
import slugify from "slugify";

/**
 * Module-level map from Eleventy page.filePathStem -> actual source path
 * (relative to the content root, without extension).
 *
 * Eleventy 3's page.filePathStem preserves the source filename's original
 * case and does NOT strip date prefixes, while the published permalink
 * (page.fileSlug) does strip a leading "YYYY-MM-DD-". So a note whose file is
 * "Articles/2021-02-28-wish-me-luck-im-gonna-need-it.md" has
 * page.filePathStem "Articles/2021-02-28-wish-me-luck-im-gonna-need-it" and
 * is published at the slug "wish-me-luck-im-gonna-need-it". This map keys on
 * the raw filePathStem so the "edit this page" filter can resolve back to the
 * real (date-prefixed) source file.
 *
 * Populated synchronously by ensureSourcePaths(), called from the _notes
 * collection callback. Eleventy computes collections before rendering any
 * template, so the map is ready by the time the filter runs. Eleventy 3.x
 * filters only receive the template context, so the map lives here as module
 * state rather than in global data or collections.
 * @type {Map<string, string>}
 */
export const sourcePathsMap = new Map();

/**
 * Removes a leading "YYYY-MM-DD-" date prefix from a slug, matching
 * @11ty/eleventy's TemplateFileSlug._stripDateFromSlug.
 * @param {string} slug
 * @returns {string}
 */
export const stripDatePrefix = (slug) => {
  const match = slug.match(/\d{4}-\d{2}-\d{2}-(.*)/);
  return match ? match[1] : slug;
};

/**
 * The content root defaults to the repo root (the Eleventy input dir is
 * ".app", one level down) and can be overridden with the SECOND_BRAIN_ROOT
 * environment variable.
 * @returns {string}
 */
const getContentRoot = () =>
  process.env.SECOND_BRAIN_ROOT ?? join(process.cwd(), "..");

/**
 * Recursively walks the content root and records a map entry for every
 * markdown note. Runs synchronously so the map is complete before any
 * template is rendered.
 * @returns {void}
 */
export const ensureSourcePaths = () => {
  if (sourcePathsMap.size > 0) return;

  const contentRoot = getContentRoot();
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (name.startsWith(".")) continue;
      const full = join(dir, name);
      let stat;
      try {
        stat = statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        if (name === "node_modules") continue;
        walk(full);
      } else if (
        stat.isFile() &&
        name.endsWith(".md") &&
        !name.startsWith("_")
      ) {
        const stem = relative(contentRoot, full).replace(/\\+/g, "/");
        const stemNoExt = stem.replace(/\.[^.]+$/, "");
        const parts = stemNoExt.split("/");
        const fileName = stripDatePrefix(parts[parts.length - 1]);
        const key = parts.slice(0, -1).concat(fileName).join("/").toLowerCase();
        sourcePathsMap.set(key, stemNoExt);
      }
    }
  };

  walk(contentRoot);
};
