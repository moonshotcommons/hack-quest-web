const fs = require('fs');
const path = require('path');
const { getComponentName, render, checkExists, getFileName } = require('./util');

const fileName = getFileName();

/** 生成组件类型数据，和生成导入导出数据 */
const generateTypeRenderData = (apiPath) => {
  const files = fs.readdirSync(apiPath);

  const importString = [];
  const registerMapString = [];
  const assignString = [];
  files.forEach((file) => {
    // if (file === 'index.tsx') return;
    // if (file === 'type.tsx') return;
    // file = file.replace('.tsx', '');
    // typeString.push(`'${file}'`);
    const iconName = getComponentName(file);
    const importStringItem = `import ${iconName}Api from './webApi/${file}';`;
    importString.push(importStringItem);
    const register = `  ${file}Api: ${iconName}Api;`;
    registerMapString.push(register);
    const assign = `    this.${file}Api = new ${iconName}Api(this.service);`;
    assignString.push(assign);
  });

  return {
    importStr: importString.join('\n'),
    registerStr: `${registerMapString.join('\n')}`,
    assignStr: assignString.join('\n')
  };
};

const renderApiModule = () => {
  const moduleName = getComponentName(fileName);
  // const moduleName = fileName;
  const template = fs.readFileSync(path.resolve(__dirname, 'template/apiModule/apiModuleTemplate.ejs'), 'utf8');
  const filePath = path.resolve(__dirname, `../service/webApi/${moduleName.toLowerCase()}`);

  // const nextApiPath = path.resolve(
  //   __dirname,
  //   `../pages/api/${moduleName.toLowerCase()}`
  // );

  const nextApiTemplate = fs.readFileSync(path.resolve(__dirname, 'template/apiModule/nextApi.ejs'), 'utf8');

  checkExists(filePath);

  checkExists(nextApiPath);

  fs.mkdirSync(nextApiPath);

  fs.mkdirSync(filePath);

  render(template, path.resolve(filePath, 'index.ts'), {
    name: moduleName
  });

  render(nextApiTemplate, path.resolve(nextApiPath, 'index.ts'));

  fs.writeFileSync(path.resolve(filePath, 'type.ts'), 'export interface Response { id: string };');
};

const renderType = (renderData) => {
  const typeTemplate = fs.readFileSync(path.resolve(__dirname, 'template/icon/type.ejs'), 'utf8');
  const typeFilePath = path.resolve(__dirname, `../components/Common/Icon/type.tsx`);
  render(typeTemplate, typeFilePath, { type: renderData.type });
};

const renderIconImport = (renderData) => {
  const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'template/apiModule/index.ejs'), 'utf8');
  const indexFilePath = path.resolve(__dirname, `../service/index.ts`);
  render(indexTemplate, indexFilePath, {
    importStr: renderData.importStr,
    registerStr: renderData.registerStr,
    assignStr: renderData.assignStr
  });
};

(function () {
  const apiPath = path.resolve(__dirname, `../service/webApi`);

  renderApiModule();
  const renderData = generateTypeRenderData(apiPath);
  renderIconImport(renderData);
})();
