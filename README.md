![logo](../assets/logo.png?raw=true)

# JustLines - Chrome extension
> Draw lines in your browser changing colors and pen sizes scrolling the mouse wheel
<p align="center">
  <img src="../assets/demo.gif?raw=true" alt="demo" />
</p>

JustLines is a Chrome extension to quickly draw simple colored lines in your browser. You can do it on remote or local sites and even pdf files.

You can use it during presentation to highlight some contents or draw simple schemas.

I like to use these kind of tools during presentations and I needed a quick way to change colors and pen size without using popups or options menu but do it keeping the mouse at the current position on the draw. So I decided to use mouse wheel as main controller to change colors and pen size.

## Getting started

* automatic installation: directly from [Chrome Web Store](https://chrome.google.com/webstore/detail/justlines/bcknpenfnepljiliemadceoinjajphco)
* manual installation:
  * download and extract the archive of the [latest release](https://github.com/camandel/JustLines/releases/latest)
  * or clone the repository:
    ```shell
    git clone https://github.com/camandel/JustLines.git
    ```
  * Enable `Developer mode` in [Chrome extension](chrome://extensions/)
  * Press `Load unpacked` and select the direcotry `extension` from the previously cloned repo
  * Open a web page and click on the icon <img src="../assets/icon-disabled.png?raw=true" alt="icon-disabled" /> to enter drawing mode
  * Change color (scrolling `mouse wheel`) and pen size (press `Shift` while scrolling `mouse wheel`)
  * Press `left button` and start moving the mouse to draw a line


## Features

* press `Ctrl+Shit+S` or click on the extension icon to enable/disable drawing mode
* you can also press `ESC` to disable drawing mode
* keep `left button` pressed and move the mouse to draw
* change pen colors scrolling the `mouse wheel`
* change pen size pressing `Shift` and scroll the `mouse wheel`
* clear draw pressing `Space` or leaving drawing mode


## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.


## Links

- Repository: https://github.com/camandel/JustLines
- Issue tracker: https://github.com/camandel/JustLines/issues
- Demo video: https://www.youtube.com/watch?v=hXOa06qxchw

## Licensing

The code in this project is licensed under GNU General Public License v3.0.
