![pretty-logo.svg](pretty-logo.svg)


If you came here from <a href="https://www.npmjs.com/package/htmlpp-com-github-mopires">HTMLPP</a>, there is good news for you! Pretty Markup is the production version of HTMLPP. Soon enough this package will be available to use.
- __Alfa comming soon!__

> You can keep posted by following <a href='https://twitter.com/_mopires'>@_mopires</a> on twitter and <a href='https://github.com/mopires'>@mopires</a> on github.

Pretty Markup is a HTML __preprocessor__ that make it more semantic to write html. The concept remains the same, but without the "< > </>", like Sass, but different. You can see this as a super set of HTML, like TypeScript. 

# Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta description="This is a page made with htmlpp!">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/index.css" />
  </head>
  <body class="bg-dark">
    <main class="container pt-1">
      <div class="row">
        <div class="col text-white">
          <h1>
            Pretty Markup
          </h1>
        </div>
      </div>
      <div class="row text-white">
        <p class='p-1'>
          Modern way to write html. The concept remains the same, but without the " <>
            < />". It's like Sass, but different.<br>
            To concatenate something is simple.</p>
        <div class="col">
          <p id='about'>
            HTMLpp is a HTML preprocessor.</p>
        </div>
      </div>
      <div class="row bg-white">
        <p>
          To write text without variables use quotes. Single quotes or normal quotes</p>
      </div>
    </main>
  </body>
</html>
```

## Pretty Markup

```pretty-markup
html lang="en"
    head
        meta description="This is a page made with htmlpp!"
        style href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        style href="css/index.css"
    closehead
    body class="bg-dark"
        main class="container pt-1"
            div class="row"
                div class="col text-white"
                    h1 $hero closeh1
                /div
            /div
            div class="row text-white"
                p class='p-1'
                    $description br $concat
                /p
                div class="col"
                    p id='about'
                        $about
                    /p
                /div
            /div
            div class="row bg-white"
                p
                    "To write text without variables use quotes. "
                    'Single quotes or normal quotes'
                /p
            /div
        /main
    /body
/html
```

## Syntax Highlighter Available!
- You can still use the highlighter of htmlpp. 

On [Visual Code Editor]("https://code.visualstudio.com/") you can search for HTMLPP and install the extension and enjoy it!

> ext install mopires-htmlpp.htmlpp

- In the future this extension will be also updated.

# That is it!

### Thank you

You can keep posted by following <a href='https://twitter.com/_mopires'>@_mopires</a> on twitter and <a href='https://github.com/mopires'>@mopires</a> on github.