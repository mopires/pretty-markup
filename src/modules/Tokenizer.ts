import chalk from "chalk";
import { log } from "console";
import FileManager from "./FileManager";
import Element from "../interface/Element";

import os from "os";

class Tokenizer {
  private fileManager = new FileManager();
  syntaxExpression: Array<Element> = [];
  private line = 0;
  private char_buffer = "";
  private column = 0;
  private parent_symbol = "";
  private token_id = "";
  private srcFolder = "";

  /**
   * Tokenizer contructor
   * @param FileContent
   * @param File
   */
  constructor(FileContent: string) {
    this.GetTokens(FileContent);
    const env = Array.from(process.cwd());
    this.srcFolder = env.includes("node_modules") ? "src" : "src_dev";
  }
  /**
   *
   * @param FileContent string
   * @param file any
   * @returns syntaxExpression: Array<Element>
   */
  private GetTokens(FileContent: string) {
    function tokenId(token_name: any) {
      return token_name + Math.floor(Math.random() * 10000);
    }

    while (this.column < FileContent.length) {
      if (!this.isSpecialCharacter(FileContent[this.column])) {
        switch (FileContent[this.column]) {
          case "/":
            if (FileContent[this.column + 1] === "/") {
              let comment = FileContent[this.column];
              while (true) {
                this.nextColumn();
                if (FileContent[this.column] !== os.EOL) {
                  comment = comment + FileContent[this.column];
                } else {
                  break;
                }
              }
              this.syntaxExpression.push({
                Comment: comment,
                Column: this.column,
                Line: this.line
              });
              this.nextColumn();
            } else {
              this.char_buffer += FileContent[this.column];
              this.nextColumn();
            }
            break;
          case " ":
            if (this.char_buffer.length > 0) {
              this.token_id = tokenId(this.char_buffer);
              this.syntaxExpression.push({
                Symbol: this.char_buffer,
                Column: this.column,
                Line: this.line
              });
              this.char_buffer = "";
            }
            this.nextColumn();
            break;
          case "\n":
            this.line = this.line + 1;
            if (this.char_buffer.length > 0) {
              if (this.char_buffer.match("close") === null) {
                this.syntaxExpression.push({
                  Symbol: this.char_buffer,
                  Column: this.column,
                  Line: this.line
                });
                this.char_buffer = "";
              } else {
                const close_tag = this.char_buffer.split("close")[1];
                this.syntaxExpression.forEach((element) => {
                  if (element.Symbol !== undefined) {
                    if (element.Symbol == close_tag) {
                      element.CloseTag = this.char_buffer;
                    }
                  }
                });
                this.syntaxExpression.push({
                  Symbol: this.char_buffer,
                  Column: this.column,
                  Line: this.line
                });
                this.char_buffer = "";
              }
            }
            this.nextColumn();
            break;
          case "\r":
            this.line = this.line + 1;
            if (this.char_buffer.length > 0) {
              if (this.char_buffer.match("close") === null) {
                this.syntaxExpression.push({
                  Symbol: this.char_buffer,
                  Column: this.column,
                  Line: this.line
                });
                this.char_buffer = "";
              } else {
                const close_tag = this.char_buffer.split("close")[1];
                this.syntaxExpression.forEach((element) => {
                  if (element.Symbol !== undefined) {
                    if (element.Symbol == close_tag) {
                      element.CloseTag = this.char_buffer;
                    }
                  }
                });
                this.syntaxExpression.push({
                  Symbol: this.char_buffer,
                  Column: this.column,
                  Line: this.line
                });
                this.char_buffer = "";
              }
            }
            this.nextColumn();
            break;
          case "=":
            this.getAttribute(FileContent);
            this.nextColumn();
            break;
          case "'":
            let single_quotes_content = FileContent[this.column];
            while (true) {
              this.nextColumn();
              single_quotes_content =
                single_quotes_content + FileContent[this.column]; //send to expression
              if (FileContent[this.column] === "'") {
                break;
              }
            }
            this.token_id = tokenId(this.char_buffer);
            this.syntaxExpression.push({
              Symbol: "single_quotes",
              String: single_quotes_content,
              Column: this.column
            });
            this.nextColumn();
            break;
          case '"':
            let quotes_content = FileContent[this.column];
            while (true) {
              this.nextColumn();
              quotes_content = quotes_content + FileContent[this.column]; //send to expression
              if (FileContent[this.column] === '"') {
                break;
              }
            }
            this.token_id = tokenId(this.char_buffer);
            this.syntaxExpression.push({
              Symbol: "quotes",
              String: quotes_content,
              Column: this.column
            });
            this.parent_symbol = this.token_id;
            this.nextColumn();
            break;
          case "$":
            console.log("special chars");
            this.nextColumn();
            break;
            let $var = FileContent[this.column];
            const column_backup = this.column;
            while (true) {
              this.nextColumn();
              $var = $var + FileContent[this.column];
              if (
                FileContent[this.column] === " " ||
                FileContent[this.column] === "\r" ||
                FileContent[this.column] === "\n"
              ) {
                break;
              } else if (
                FileContent[this.column].match(/[$&+,:;=?@#|'<>.^*()%!-]/)
              ) {
                log(
                  chalk.red(
                    `* Can't use this special chars in variables. At line ${this.line}`
                  )
                );
                process.exit();
              }
            }
            if (this.variablesExist($var)) {
              this.syntaxExpression.push({
                Symbol: "$",
                FreeText: this.GetVariableValue($var),
                Column: this.column,
                Line: this.line
              });
            }
            break;

          default:
            // If none of the condition is met,
            // It's a tag and will be added to the buffer
            this.char_buffer = this.char_buffer + FileContent[this.column];
            if (FileContent[this.column + 1] === undefined) {
              this.token_id = tokenId(this.char_buffer);
              this.syntaxExpression.push({
                Symbol: this.char_buffer,
                Column: this.column,
                Line: this.line
              });
              this.char_buffer = "";
            }
            this.nextColumn();
            break;
        }
      } else {
        this.nextColumn();
      }
    }
    return this.syntaxExpression;
  }

  nextColumn() {
    this.column = this.column + 1;
  }

  getAttribute(FileContent: string) {
    if (this.char_buffer.length > 0) {
      let value = FileContent[this.column + 1];
      const close_value_attribute = FileContent[this.column + 1];
      this.nextColumn();
      while (true) {
        this.nextColumn();
        value += FileContent[this.column];
        if (close_value_attribute === FileContent[this.column]) {
          break;
        }
      }
      if (
        !Array.isArray(
          this.syntaxExpression[this.syntaxExpression.length - 1].attr
        )
      ) {
        this.syntaxExpression[this.syntaxExpression.length - 1].attr = [];
      }
      this.syntaxExpression[this.syntaxExpression.length - 1].attr?.push(
        this.char_buffer + "=" + value
      );
      this.char_buffer = "";
    }
  }
  /**
   *
   * @param variable Collected from the getTokens()
   * @returns boolean
   */
  variablesExist(variable: string | number) {
    variable = variable.toString().trim().replace("$", "");
    const variable_file = JSON.parse(
      this.fileManager
        .readFile(`${process.cwd()}/${this.srcFolder}/var.json`)!
        .toString()
    );

    if (!variable_file[variable]) {
      log(
        chalk.red(`* Variable not defined ${chalk.underline(`${variable}`)}`)
      );
      return false;
    } else {
      return true;
    }
  }
  /**
   * Not being used yet
   * @param variable Collected from the getTokens()
   * @returns Variable value in the var.json
   */
  GetVariableValue(variable: string) {
    variable = variable.toString().trim().replace("$", "");
    const variable_file = JSON.parse(
      this.fileManager
        .readFile(`${process.cwd()}/${this.srcFolder}/var.json`)!
        .toString()
    );

    return variable_file[variable].toString();
  }
  /**
   *
   * @param character Arg to be tested
   * @returns boolean If matches the condition of special character
   */
  isSpecialCharacter(character: string) {
    return "!@#$%¨&*()_+`{^}:><¹²³£¢¬§ªº╚├?°₢\\".includes(character);
  }
}

export default Tokenizer;
