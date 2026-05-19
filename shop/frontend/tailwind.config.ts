import type { Config } from "tailwindcss";

export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            background: "#09090b",
            panel: "#18181b",
            border: "#27272a",
            accent: "#22d3ee",
            accentHover: "#67e8f9",
         },
      },
   },
   plugins: []
} satisfies Config;
