#!/usr/bin/env node
import FileManager from "./modules/FileManager";

class Main {
  constructor() {
    this.Start();
  }

  Start() {
    const fileManager: FileManager = new FileManager();
    const files: Array<object> = fileManager.GetFiles();
    fileManager.ReadPrettyFile(files);
  }
}
new Main();
