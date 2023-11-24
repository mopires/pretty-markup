![pretty-logo.svg](https://github.com/mopires/pretty-markup/blob/main/pretty-logo.svg)

## Pretty Markup is a HTML __preprocessor__ that make it more semantic to write html. The concept remains the same, but without the "< > </>", like Sass, but different. You can see this as a super set of HTML, like TypeScript. 

> You can keep posted by following <a href='https://twitter.com/_mopires'>@_mopires</a> on twitter and <a href='https://github.com/mopires'>@mopires</a> on github.

> # npm i -g pretty-markup

# Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>
        Pretty Markup File!
    </title>
</head>
<body style="font-family: system-ui;font-size: 1.2rem; color: #222;">
    <img src="pretty-logo.svg">
    <h1>
        Hello World!</h1>
    <small>
        This page was create with a <a href="https://www.npmjs.com/package/pretty-markup">
            Pretty Markup</a>
    </small>
    <h2>
        Usage</h2>
    <p>
        Pretty Markup carry the same aspects of the traditional HTML document,
        except the use of characters, that sometimes, can make the document
        ugly to declare markups.</p>
    <div class="code-example">
        <p>Hello world!</p>
    </div>
    <p>
        With Pretty Markup, It's more clear to understand what's going on. &#128516</p>
    <div class="code-example">
        p 'Hello world!' /p
    </div>
</body>
</html>
```

## Pretty Markup

```pretty-markup
html
    head
        title "Pretty Markup File!" /title
    /head
    body style="font-family: system-ui;font-size: 1.2rem; color: #222;"
        img src="pretty-logo.svg"
        h1 "Hello World!" /h1
        small "This page was create with a " a href="https://www.npmjs.com/package/pretty-markup" 
        "Pretty Markup" /a
        /small

        h2 "Usage" /h2
        p 
            "Pretty Markup carry the same aspects of the traditional HTML document, 
            except the use of characters, that sometimes, can make the document
            ugly to declare markups." 
        /p

        div class="code-example"
           "<p>Hello world!</p>"
        /div

        p 
            "With Pretty Markup, It's more clear to understand what's going on. &#128516"
        /p
        
        div class="code-example"
            "p 'Hello world!' 
        /p"
        /div
    /body
/html
```

# Get started

To start developing with Pretty Markup, create a folder called __src__ at the root of your project. After that, just start creating your files with the extension __.pm__.
- index.pm

To compile the files with the comand pm, you have to install it globally.
> npm i -g pretty-markup

## Syntax Highlighter Available!
- You can still use the highlighter of htmlpp (Previous version of this package). 

On [Visual Code Editor]("https://code.visualstudio.com/") you can search for HTMLPP and install the extension and enjoy it!

> ## ext install mopires-htmlpp.htmlpp

- In the future this extension will be also updated.

You can keep posted by following <a href='https://twitter.com/_mopires'>@_mopires</a> on twitter and <a href='https://github.com/mopires'>@mopires</a> on github.