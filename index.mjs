#!/usr/bin/env -S node --experimental-modules --no-warnings

import { parseFormat } from "./bin/functions/parseFormat.mjs";
import { createFolder } from "./bin/functions/createFolder.mjs";
import { getFromApi } from "./bin/functions/getFromApi.mjs";
import { createPage } from "./bin/functions/createPage.mjs";
import { writeTokens } from "./bin/functions/writeTokens.mjs";

import rimraf from "rimraf";
import dotenv from "dotenv";
dotenv.config();

const [, , ...args] = process.argv;
const format = parseFormat(args[0]);

(async () => {
  rimraf("./tokens", () => {});
  rimraf("./figma", () => {});

  createFolder("tokens");
  createFolder("figma");

  const data = await getFromApi();
  const tokens = createPage(data.document.children);
  writeTokens(tokens.children, format);
})();
