import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  test: {
    // @ts-expect-error
    global: true,
    setupFiles: ["./__test__/setup.ts"],
  },
});
