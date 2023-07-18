const fs = require("fs");
const { createCanvas, loadImage, registerFont } = require("canvas");
const { getFilesRecursively } = require("./printFileNames");

const fontFolderPath = "./fonts";
const outputFolderPath = "./output/";

const givenString = "Hamburgevons";
const alphabetString = "abcdefghijklmnopqrstuvwxyz";
const allCapsString = alphabetString.toUpperCase();
const numbersString = "0123456789";
const specialCharsString = "!@#$%^&*()_+{}[];':\",./<>?\\|`~-=";

const textColor = "#3c3c3c"; // Red color for the string
const backgroundColor = "#FcFcFc"; // White color for the background

const fileNameList = getFilesRecursively(fontFolderPath).filter(
  (file) =>
    file.toLowerCase().endsWith(".ttf") || file.toLowerCase().endsWith(".otf")
);

for (const file of fileNameList) {
  console.log(`processing ${file}...`);
  const fontNameWithoutExt = getFileNameFromPath(file); // .replace(/\.[^/.]+$/, "");

  if (
    file.toLowerCase().endsWith(".ttf") ||
    file.toLowerCase().endsWith(".otf")
  ) {
    registerFont(file, { family: `${fontNameWithoutExt}` });

    try {
      const canvas = createCanvas(7500, 2000);
      const context = canvas.getContext("2d");

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = textColor;

      // context.font = "400px Arial";
      // context.font = "400px CustomFont";

      // HAMBURGEVONS
      context.font = "1000px " + fontNameWithoutExt;
      context.fillText(givenString, 100, 1000);

      // font name
      context.font = "200px " + fontNameWithoutExt;
      context.fillText(fontNameWithoutExt, 100, 200);

      // alphabet
      context.font = "200px " + fontNameWithoutExt;
      context.fillText(alphabetString, 100, 1500);
      context.fillText(allCapsString, 3000, 1500);
      context.fillText(numbersString, 100, 1700);
      context.fillText(specialCharsString, 3000, 1700);

      const imageBuffer = canvas.toBuffer("image/jpeg");
      const outputFilePath =
        outputFolderPath +
        getFileNameFromPath(file).replace(/\.[^/.]+$/, "") +
        ".jpg";

      fs.writeFileSync(outputFilePath, imageBuffer);
      console.log(`Image created for ${file}`);
    } catch (error) {
      console.error(`Error creating image for ${file}:`, error);
    }
  }
}

function getFileNameFromPath(path) {
  return path.split("/").pop().split(".").shift();
}

function getFileNameFromPathWithExt(path) {
  return path.split("/").pop();
}
