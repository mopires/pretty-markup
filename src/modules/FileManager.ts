import path from "path";
import fs from "fs";
import Tokenizer from "./Tokenizer";
import Parser from "./Parser";
import Build from "../interface/Build";
import IFile from "../interface/File";
import * as config from "../config/env.json";

export default class FileManager {
  private srcFolder = "/src/";

  constructor() {
    this.srcFolder = config.build.production ? "src" : "src_dev";
  }

  GetFiles(
    subfolder: string = `${process.cwd()}/${this.srcFolder}/`,
    prettyMarkupFiles: Array<object> = []
  ) {
    let folders;
    const path = subfolder;
    folders = fs.readdirSync(path);
    folders.forEach((folder: string): void => {
      if (!fs.statSync(path + folder).isDirectory()) {
        if (this.isPrettyFile(folder)) {
          prettyMarkupFiles.push({
            name: folder,
            path: path.replace("./", "")
          });
        }
      } else {
        if (!this.isReservedFolder(folder)) {
          folder = path + folder + "/";
          prettyMarkupFiles = this.GetFiles(folder, prettyMarkupFiles);
        }
      }
    });

    return prettyMarkupFiles;
  }
  /**
   * read each .pm file and call funcion to
   * write HTML
   * @param prettyMarkupFiles Array<object>
   * @returns void
   */
  ReadPrettyFile(prettyMarkupFiles: Array<object>): void {
    prettyMarkupFiles.forEach((file: any): void => {
      const FileContent = fs.readFileSync(file.path + file.name, "utf-8");
      const parser = new Parser(new Tokenizer(FileContent));
      const build: Build = parser.compile();
      this.WriteHTML(build, file);
    });
  }

  private isReservedFolder(folder: string) {
    const protectedDir = [".git", ".github", ".idea", "public", "node_modules"];
    return protectedDir.indexOf(folder) !== -1;
  }

  private isPrettyFile(file: string) {
    const fileExtension = file.split(".")[file.split(".").length - 1];
    if (fileExtension === "pm") {
      return true;
    }
  }

  private swipeExtension(file: string) {
    return file.replace(".pm", ".html");
  }

  readFile(File: string): string | undefined {
    try {
      const file_content = fs.readFileSync(File, { encoding: "utf8" });
      return file_content;
    } catch (err) {
      console.error(err);
    }
  }

  private WriteHTML(build: Build, File: IFile) {
    const fileBuild: IFile = File;
    fileBuild.path = File.path.replace(this.srcFolder, "public");

    if (!fs.existsSync("./public")) {
      fs.mkdirSync("./public");
    }

    if (!fs.existsSync(fileBuild.path)) {
      fs.mkdirSync(fileBuild.path);
    }

    fs.writeFileSync(
      `${File.path.replace(this.srcFolder, "public")}${this.swipeExtension(File.name)}`,
      build.htmlCompiled
    );
    this.copyFilesToBuildFolder(build.LinkedFiles);
  }

  copyFilesToBuildFolder(file_paths: Array<object>) {
    file_paths.forEach((file: any) => {
      if (fs.existsSync(path.dirname(file.path_for_build)) == false) {
        fs.mkdirSync(path.dirname(file.path_for_build));
      }
      fs.copyFile(file.path_pretty, file.path_for_build, (e: any) => {
        if (e) throw e;
      });
    });
  }
}
