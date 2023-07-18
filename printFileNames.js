const fs = require("fs");

function getFilesRecursively(sourceFolderPath) {
  const fileNameList = [];
  const files = fs.readdirSync(sourceFolderPath);
  for (const file of files) {
    const filePath = `${sourceFolderPath}/${file}`;

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const subFileNameList = getFilesRecursively(filePath);
      fileNameList.push(...subFileNameList);
    } else {
      fileNameList.push(filePath);
    }
  }
  return fileNameList;
}

module.exports = {
  getFilesRecursively,
};
