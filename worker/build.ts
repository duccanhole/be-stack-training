const path = require('path');
const fs = require('fs');

const srcFolder = path.join(__dirname, '../src/module/search');
const desFolder = path.join(__dirname, './src/search');

if (!fs.existsSync(desFolder)) {
  fs.mkdirSync(desFolder);
}

const files = fs.readdirSync(srcFolder);
files.forEach((file) => {
  const sourcePath = path.join(srcFolder, file);
  const destinationPath = path.join(desFolder, file);
  fs.copyFileSync(sourcePath, destinationPath);
});
