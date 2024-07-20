import fs from "fs";
import * as config from "./env.json";

let build = config.build;
build.production = true;

fs.writeFileSync("./src/config/env.json", JSON.stringify({ build }));
