import Build from "../../interface/Build";
import Parser from "../Parser";
import Tokenizer from "../Tokenizer";
/**
 *
 * @param prettyMarkup simple string containing the markups to be compiled
 */
export function compiler(prettyMarkup: string) {
  const parser = new Parser(new Tokenizer(prettyMarkup));
  let build: Build = parser.compile();

  return build.htmlCompiled;
}
