
## Pretty Markup: Write HTML Like Poetry

Imagine crafting elegant, semantic HTML structures without the clutter of angle brackets (really human-friendly).  Pretty Markup, a revolutionary preprocessor like Sass for CSS or TypeScript for JavaScript, Pretty Markup takes HTML to the next level.

## Why Pretty Markup?

* **Goodbye `< >`, Hello Readability:** Pretty Markup reimagines HTML syntax, potentially using a more natural language-like approach. This could make writing HTML a breeze, boosting developer productivity.
* **Semantic Powerhouse:**  Focus on the meaning of your content, not just its presentation. Pretty Markup encourage semantic best practices, ensuring your HTML is not only beautiful but also machine-readable.
* **A Superset of HTML?**  Think of it as a layer on top of regular HTML. Write clean, concise code in Pretty Markup, and it seamlessly translates into standard, browser-compatible HTML under the hood. It represents a potential future where writing HTML is an expressive and enjoyable experience.

![Pretty Markup](https://raw.githubusercontent.com/mopires/pretty-markup/main/assets/gif/intellisense.gif)

## Get started 

###  Project use (manual)
1. Create a folder __./src__.
2. Create the files with the extension `.pm`
3. Then, run:

```bash
  pm 
```

> To use the `pm` command, install it globally. Or, use `npx pm`

## Programmatic use
```ts
  import { compiler } from 'pretty-markup';
  const pm = "h1 \"Hey! This's a Heading 1\" /h1"
  const html = compiler(pm)
  console.log(html);

  // Output
  // <!DOCTYPE html>
  // <h1>
  //   Hey! This's a Heading 1</h1>
  //
```


## Official syntax highlighter 
- **Pretty Markup Language Basics** is available to installation on [VS code]("https://marketplace.visualstudio.com/items?itemName=mopires.pretty-markup-language-basics") you can search for `Pretty Markup` and install the extension. Open VSCode and type ctrl+P, type this:

```bash
  ext install mopires.pretty-markup-language-basics
```

### How to Contribute 
We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how you can help improve the project.

### Issues and improvements 
Report bugs or improvements at https://github.com/mopires/pretty-markup/issues

### ⚖️ License 
This project is licensed under the [MIT License](LICENSE.txt).