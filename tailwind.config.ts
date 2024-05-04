import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // './app/(auth)/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-50": "#fdf4ff",
        "primary-100": "#fae8ff",
        "primary-200": "#f5d0fe",
        "primary-300": "#f0abfc",
        "primary-400": "#e879f9",
        "primary-500": "#d946ef",
        "primary-600": "#c026d3",
        "primary-700": "#a21caf",
        "primary-800": "#86198f",
        "primary-900": "#701a75",
        "neutral-50": "#F8FAFC",
        "neutral-100": "#F3F4F6",
        "neutral-200": "#E5E7EB",
        "neutral-300": "#CBD5E1",
        "neutral-400": "#94A3B8",
        "neutral-500": "#6B7280",
        "neutral-600": "#4B5563",
        "neutral-700": "#374151",
        "neutral-800": "#1F2937",
        "neutral-900": "#111827",
        "secondary-50": "#fefce8",
        "secondary-100": "#fef9c3",
        "secondary-200": "#fef08a",
        "secondary-300": "#f0abfc",
        "secondary-400": "#facc15",
        "secondary-500": "#eab308",
        "secondary-600": "#ca8a04",
        "secondary-700": "#a16207",
        "secondary-800": "#854d0e",
        "secondary-900": "#713f12",
        "rose-50": "#FFF1F2",
        "rose-400": "#FB7185",
        "rose-600": "#E11D48",
        "amber-100": "#FEF3C7",
        "amber-400": "#F59E0B",
        "amber-600": "#D97706",
        "teal-50": "#F0FDFA",
        "teal-400": "#2DD4BF",
        "teal-600": "#0D9488",
      },
    },
  },
  plugins: [],
};
export default config;
