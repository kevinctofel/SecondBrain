import { sharedModule } from "./lib/shared/index.js";
import { customPropsModule } from "./lib/modules/custom-props/index.js";
import { dynamicContentModule } from "./lib/modules/dynamic-content/index.js";
import { notesModule } from "./lib/modules/notes/index.js";
import { searchModule } from "./lib/modules/search/index.js";
import { sidebarModule } from "./lib/modules/sidebar/index.js";
import { tagsModule } from "./lib/modules/tags/index.js";
import { tocModule } from "./lib/modules/toc/index.js";
import { wikilinksModule } from "./lib/modules/wikilinks/index.js";
import { assetsModule } from "./lib/modules/assets/index.js";
import { core } from "./lib/core/index.js";

export const config = core.configObj;

export default function (eleventyConfig) {
  sharedModule.setup(eleventyConfig);
  customPropsModule.setup(eleventyConfig);
  dynamicContentModule.setup(eleventyConfig);
  notesModule.setup(eleventyConfig);
  searchModule.setup(eleventyConfig);
  sidebarModule.setup(eleventyConfig);
  tagsModule.setup(eleventyConfig);
  tocModule.setup(eleventyConfig);
  wikilinksModule.setup(eleventyConfig);
  assetsModule.setup(eleventyConfig);

  core.setup(eleventyConfig);
  eleventyConfig.addFilter("date", (date, format) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  });
  eleventyConfig.addCollection("articles", function(collection) {
        return collection.getFilteredByGlob("Articles/*.md");
    });
}
