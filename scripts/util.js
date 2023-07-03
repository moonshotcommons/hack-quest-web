const ejs = require('ejs');
const fs = require('fs');

const getFileName = () => {
  return process.argv[2].trim().toLowerCase();
};

const getComponentName = (name) => {
  const fields = name.split('-');
  fields.forEach((field, index) => {
    fields[index] = field.replace(field[0], field[0].toUpperCase());
  });
  return fields.join('');
};

const render = (templatePath, renderPath, data) => {
  const res = ejs.render(templatePath, data);
  fs.writeFileSync(renderPath, res);
};

const checkExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    throw new Error('同名组件已经存在，请更换组件名！');
  }
};

module.exports = {
  getFileName,
  getComponentName,
  render,
  checkExists
};
