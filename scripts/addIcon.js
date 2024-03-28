const fs = require('fs');
const path = require('path');
const { getComponentName, render, checkExists, getFileName } = require('./util');

const fileName = getFileName();

/** 生成组件类型数据，和生成导入导出数据 */
const generateTypeRenderData = (iconPath) => {
  const files = fs.readdirSync(iconPath);

  const typeString = [];
  const importString = [];
  const iconsMapString = [];
  const demoString = [];
  files.forEach((file) => {
    if (file === 'index.tsx') return;
    if (file === 'type.tsx') return;
    if (file === 'example.tsx') return;
    file = file.replace('.tsx', '');
    typeString.push(`'${file}'`);
    const iconName = getComponentName(file);
    const importStringItem = `import ${iconName}Icon from './${file}'`;
    importString.push(importStringItem);
    const icon = `  ${file.indexOf('-') === -1 ? file : `'${file}'`}: <${iconName}Icon />`;
    iconsMapString.push(icon);
  });

  return {
    iconImport: importString.join('\n'),
    type: `\n  ${typeString.join(',\n  ')}\n`,
    icons: `{\n${iconsMapString.join(',\n')}\n}`
  };
};

const renderComponent = () => {
  const IconName = getComponentName(fileName);
  const iconTemplate = fs.readFileSync(path.resolve(__dirname, 'template/icon/iconTemplate.ejs'), 'utf8');
  const filePath = path.resolve(__dirname, `../components/Common/Icon/${IconName}`);

  checkExists(filePath);

  fs.mkdirSync(filePath);

  render(iconTemplate, path.resolve(filePath, 'index.tsx'), { name: IconName });
};

const renderType = (renderData) => {
  const typeTemplate = fs.readFileSync(path.resolve(__dirname, 'template/icon/type.ejs'), 'utf8');
  const typeFilePath = path.resolve(__dirname, `../components/Common/Icon/type.tsx`);
  render(typeTemplate, typeFilePath, { type: renderData.type });
};

const renderIconImport = (renderData) => {
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'template/icon/index.ejs'), 'utf8');
  const indexFilePath = path.resolve(__dirname, `../components/Common/Icon/index.tsx`);
  render(indexTemplate, indexFilePath, {
    icons: renderData.icons,
    iconsImport: renderData.iconImport
  });
};

(function () {
  const iconPath = path.resolve(__dirname, `../components/Common/Icon`);
  // 渲染Icon组件
  renderComponent();
  const renderData = generateTypeRenderData(iconPath);
  // 渲染类型
  renderType(renderData);
  // 渲染 Icon 导入导出
  renderIconImport(renderData);
})();
