import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
};

export default config;
