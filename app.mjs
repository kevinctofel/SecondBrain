// @ts-check
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  title: "My Second Brain",
  description:
    "Everything important that my brain can't hold.",
  theme: {
    color: "blue",
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
   		},
	      },	
	    }), 
	  },
        ],
      },
    ],
  },
});
