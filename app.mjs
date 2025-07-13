// @ts-check
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  title: "My Second Brain",
  description:
    "Everything important that my brain can't hold.",
  theme: {
    color: "blue",
  },
  wikilinks: {
    // What label to use for wikilinks without a label
    // - "ref"       Use the reference
    // - "title"     Use the title of the note (fallback fileSlug)
    // - "fileSlug"  Use the file slug
    autoLabel: "title",
    },
  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
	    query: createNotesQuery({
	      tree: {
		expanded: false,
		replace: {
      		  "^/Images/": "",
		  "^/Posts/": ""
   		},
	      },	
	    }), 
	  },
        ],
      },
    ],
  },
});
