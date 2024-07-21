
## Pretty Markup: Write HTML Like Poetry

Imagine crafting elegant, semantic HTML structures without the clutter of angle brackets. Pretty Markup, a revolutionary preprocessor like Sass for CSS or TypeScript for JavaScript, Pretty Markup takes HTML to the next level.

**But how?**

* **Goodbye `< >`, Hello Readability:** Pretty Markup reimagines HTML syntax, potentially using a more natural language-like approach. This could make writing HTML a breeze, boosting developer productivity.
* **Semantic Powerhouse:**  Focus on the meaning of your content, not just its presentation. Pretty Markup encourage semantic best practices, ensuring your HTML is not only beautiful but also machine-readable.
* **A Superset of HTML?**  Think of it as a layer on top of regular HTML. Write clean, concise code in Pretty Markup, and it seamlessly translates into standard, browser-compatible HTML under the hood. It represents a potential future where writing HTML is an expressive and enjoyable experience.
* **Every tag is supported:**

![Pretty Markup](./assets/gif/intellisense.gif)

# Get started 🤔
To start developing with Pretty Markup, create a folder called __src__ at the root of your project. After that, just start creating your pretty files with the extension `.pm`. 

```bash
  index.pm
```

Every HTML tag is supported here. Although, no attribute has default values. For example, the default value of the attribute `checked` in traditional HTML is true. Pretty Markup **does not** set any value to it. You have to specify it.

For example:
```html
  <input type="checkbox" checked/>
```

```pretty-markup
  input type="checkbox" checked="true"
```

https://w3schools.com have excellent HTML reference that can be used in Pretty Markup.

# Compile ⚙️
To compile with CLI you can install it globally.
```bash
  npm i pretty-markup -g
```
And then
```bash
  pm 
```
To compile it.

## Official syntax highlighter ❤️‍🔥
- Pretty Markup Language Basics is available to installation on [VS code]("https://marketplace.visualstudio.com/items?itemName=mopires.pretty-markup-language-basics") you can search for `Pretty Markup` and install the extension. Open VSCode and type ctrl+P, type this:

```bash
  ext install mopires.pretty-markup
```

## How to Contribute 🙏🏻
We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how you can help improve the project.

## Issues and improvements 🔧
Report bugs or improvements at https://github.com/mopires/pretty-markup/issues

## License ⚖️
This project is licensed under the [MIT License](LICENSE.txt).