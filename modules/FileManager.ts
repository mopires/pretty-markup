import Tokenizer from './Tokenizer';
import Parser from './Parser';
import Build from '../interface/Build';
import path = require('path');
const fs = require('fs');

class FileManager {
  constructor() {}

  GetFiles(
    subfolder: string = process.cwd() + '/src/',
    prettyMarkupFiles: Array<object> = []
  ) {
    let folders;
    let path = subfolder;
    folders = fs.readdirSync(path);
    folders.forEach((folder: string): void => {
      if (!fs.statSync(path + folder).isDirectory()) {
        if (this.isPrettyFile(folder)) {
          prettyMarkupFiles.push({
            name: folder,
            path: path.replace('./', '')
          });
        }
      } else {
        if (!this.isReservedFolder(folder)) {
          folder = path + folder + '/';
          prettyMarkupFiles = this.GetFiles(folder, prettyMarkupFiles);
        }
      }
    });

    return prettyMarkupFiles;
  }

  ReadPrettyFile(prettyMarkupFiles: Array<object>): void {
    prettyMarkupFiles.forEach((file: any): void => {
      var FileContent = fs.readFileSync(file.path + file.name, 'utf-8');
      let parser = new Parser(new Tokenizer(FileContent, file));
      let build: Build = parser.compile(); //pretty(parser.compile());
      this.WriteHTML(build, file);
    });
  }

  private isReservedFolder(folder: string) {
    let protectedDir = ['.git', '.github', '.idea', 'public', 'node_modules'];
    return protectedDir.indexOf(folder) !== -1;
  }

  private isPrettyFile(file: string) {
    let fileExtension = file.split('.')[file.split('.').length - 1];
    if (fileExtension === 'pm') {
      return true;
    }
  }

  private swipeExtension(file: string) {
    return file.replace('.pm', '.html');
  }

  readFile(File: string) {
    try {
      const file_content = fs.readFileSync(File, { encoding: 'utf8' });
      return file_content;
    } catch (err) {
      console.error(err);
    }
  }

  private WriteHTML(build: Build, File: any) {
    if (!fs.existsSync('./public')) {
      fs.mkdirSync('./public');
    }
    fs.writeFileSync(
      File.path.replace('src', 'public') + this.swipeExtension(File.name),
      build.htmlCompiled,
      (e: any) => {
        if (e) throw e;
      }
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

export default FileManager;
