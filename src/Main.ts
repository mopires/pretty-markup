#!/usr/bin/env node
import FileManager from './modules/FileManager';

class Main {
  constructor() {
    this.Start();
  }

  Start() {
    let fileManager: FileManager = new FileManager();
    let files: Array<object> = fileManager.GetFiles();
    fileManager.ReadPrettyFile(files);
  }
}
new Main();
