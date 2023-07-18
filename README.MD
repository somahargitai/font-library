# Font Library Creator

This is a simple tool to create a font library from your font files. The script is creating JPG files from the fonts provided to let you browse your fonts easily.

## Installation

```bash
    npm install
```

If you are on a M1 Mac you need to install the following packages:

```bash
arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

## Usage

Put the font files into the `fonts` folder and run the script:

```bash
    node index.js
```
