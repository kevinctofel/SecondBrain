// @ts-check
import { defineConfig, createNotesQuery } from "./.app/app-config.js";

export default defineConfig({
  title: "My Second Brain",
  description:
    "Everything important that my brain can't hold.",

  sidebar: {
    sections: [
      {
        label: "Notes",
        groups: [
          {
            query: createNotesQuery({
	      tree: true,
	    }), 
	  },
        ],
      },
    ],
  },
});
