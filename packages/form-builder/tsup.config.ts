import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/form-schema.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true
});