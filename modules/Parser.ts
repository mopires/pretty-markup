import Tokenizer from "./Tokenizer";
import Element from "../interface/Element";
import Build from "../interface/Build";
import {
    log
} from "console";
const os = require("os"),
    chalk = require("chalk"),
    fs = require('fs');;

class Parser {

    linkedFiles: Array<object> = [];
    htmlCompiled: string = "<!DOCTYPE html>";
    prettyMarkup: Array<Element> = [];

    constructor(SyntaxExpression: Tokenizer) {
        this.prettyMarkup = SyntaxExpression.syntaxExpression;
    }

    processFeature(element: Element) {
        // A feature is a htmlpp keyword/tag
        let feature = ["//", "icon", "style", "javascript", "$", element.Symbol];
        let feature_tag = feature.indexOf(element.Symbol) > -1 ? feature[feature.indexOf(element.Symbol)] : "";
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
                tag = "<link rel=\"stylesheet\" " + element.attr + " />" + os.EOL;
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
            case "string":
                return element.String?.toString()
                    .replace("\"", "")
                    .replace("\"", "")
                    .replace("\'", "")
                    .replace("\'", "");
                break;
            default:
                return null;
                break;
        }

    }

    getLinkedFilePath(linked_file: any) {
        let path_htmlpp = process.cwd() + "/src/" + linked_file[0]
            .replace("href", "")
            .replace("src", "")
            .replace("=", "")
            .replace("\"", "")
            .replace("\"", "")
            .replace("\'", "")
            .replace("\'", "");
        let path_for_build = process.cwd() + "/public/" + linked_file[0]
            .replace("href", "")
            .replace("src", "")
            .replace("=", "")
            .replace("\"", "")
            .replace("\"", "")
            .replace("\'", "")
            .replace("\'", "");
        if (path_htmlpp.indexOf("http") > -1 == true) {
            return;
        }
        if (fs.existsSync(path_htmlpp) == false) {
            log(chalk.yellowBright("Warning: "), chalk.yellow(path_htmlpp + " not found"));
        } else {
            this.linkedFiles.push({
                path_htmlpp,
                path_for_build
            })
        }
    }

    createElement(element: Element) {
        let tag = "";
        if (element.Symbol !== "!DOCTYPE") {
            let attributes = element.attr !== undefined ? element.attr.join(" ") : "";
            tag = "<" + element.Symbol + " " + attributes + ">" + os.EOL;
            return tag;
        }
    }

    compile() {
        this.prettyMarkup.filter((element: Element) => element.Symbol != undefined || element.String != undefined);
        this.prettyMarkup.forEach((element: Element) => {
            this.htmlCompiled += this.processFeature(element) != null ? this.processFeature(element) : this.createElement(element);
        });
        let build: Build = {htmlCompiled: this.htmlCompiled, LinkedFiles: this.linkedFiles};
        return build;
    }


}

export default Parser;