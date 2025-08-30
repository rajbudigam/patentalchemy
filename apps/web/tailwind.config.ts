import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["ui-sans-serif", "system-ui"] },
      colors: { ink: "#0A0A0B", sugar: "#EDEEF3" },
      boxShadow: { glass: "0 10px 40px rgba(0,0,0,0.25)" },
      borderRadius: { xl2: "1.25rem" },
      animation: {
        float: "float 12s ease-in-out infinite",
        blob: "blob 24s linear infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(2%)" }
        },
        blob: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(10%, -5%) scale(1.05)" },
          "66%": { transform: "translate(-10%, 5%) scale(0.95)" },
          "100%": { transform: "translate(0,0) scale(1)" }
        }
      }
    }
  },
  plugins: []
};
export default config;
