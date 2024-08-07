import Tokenizer from "./Tokenizer";
import Element from "../interface/Element";
import Build from "../interface/Build";
import { log } from "console";
import os from "os";
import chalk from "chalk";
import fs from "fs";
import pretty from "pretty";
import * as config from "../config/env.json";

class Parser {
  linkedFiles: Array<object> = [];
  htmlCompiled: string = "<!DOCTYPE html>";
  prettyMarkup: Array<Element> = [];
  private srcFolder = "/src/";

  constructor(SyntaxExpression: Tokenizer) {
    this.prettyMarkup = SyntaxExpression.syntaxExpression;
    const env = Array.from(process.cwd());
    this.srcFolder = config.build.production ? "src" : "src_dev";
  }

  processFeature(element: Element) {
    // A feature is a keyword/tag of Pretty Markup
    const feature = ["//", "icon", "style", "javascript", "$", element.Symbol];
    const feature_tag =
      feature.indexOf(element.Symbol) > -1
        ? feature[feature.indexOf(element.Symbol)]
        : "";
    let tag = "";
    switch (feature_tag) {
      case "close" + element.Symbol?.replace("close", ""):
        tag = os.EOL + "</" + element.Symbol?.replace("close", "") + ">";
        return tag;
        break;
      case "/" + element.Symbol:
        tag = os.EOL + "</" + element.Symbol + ">";
        return tag;
        break;
      case "style":
        tag =
          '<link rel="stylesheet" ' +
          element.attr.toString().replace("src", "href") +
          " />" +
          os.EOL;
        this.getLinkedFilePath(element.attr);
        return tag;
        break;
      case "javascript":
        tag = "<script " + element.attr + "></script>";
        this.getLinkedFilePath(element.attr);
        return tag;
        break;
      case "$":
        return element.FreeText?.toString().trim();
        break;
      case "quotes":
        return element.String?.toString().replace('"', "").replace('"', "");
        break;
      case "single_quotes":
        return element.String?.toString().replace("'", "").replace("'", "");
        break;
      default:
        return null;
        break;
    }
  }

  getLinkedFilePath(linked_file: any) {
    const path_pretty = `${process.cwd()}/${this.srcFolder}/${linked_file[0]
      .replace("href", "")
      .replace("src", "")
      .replace("=", "")
      .replace('"', "")
      .replace('"', "")
      .replace("'", "")
      .replace("'", "")}`;
    const path_for_build =
      process.cwd() +
      "/public/" +
      linked_file[0]
        .replace("href", "")
        .replace("src", "")
        .replace("=", "")
        .replace('"', "")
        .replace('"', "")
        .replace("'", "")
        .replace("'", "");
    if (path_pretty.indexOf("http") > -1 == true) {
      return;
    }
    if (fs.existsSync(path_pretty) == false) {
      log(
        chalk.yellowBright("Warning: "),
        chalk.yellow(path_pretty + " not found")
      );
    } else {
      this.linkedFiles.push({
        path_pretty,
        path_for_build
      });
    }
  }

  createElement(element: Element) {
    let tag = "";
    if (element.Symbol !== "!DOCTYPE") {
      this.elementHasLinkedFiles(element);
      const attributes =
        element.attr !== undefined ? element.attr.join(" ") : "";
      tag = "<" + element.Symbol + " " + attributes + ">" + os.EOL;
      return tag;
    }
  }

  compile() {
    this.prettyMarkup = this.prettyMarkup.filter(
      (element: Element) =>
        element.Symbol != undefined || element.String != undefined
    );
    this.prettyMarkup.forEach((element: Element) => {
      this.htmlCompiled +=
        this.processFeature(element) != null
          ? this.processFeature(element)
          : this.createElement(element);
    });
    const build: Build = {
      htmlCompiled: pretty(this.htmlCompiled),
      LinkedFiles: this.linkedFiles
    };
    return build;
  }

  elementHasLinkedFiles(element: Element) {
    if (element.attr !== undefined) {
      if ((element.Symbol, element.attr.toString().indexOf("src") > -1)) {
        this.getLinkedFilePath(element.attr);
      }
      return element.attr.join(" ");
    } else {
      return "";
    }
  }
}

export default Parser;
