import NativeModule from 'module';

function trueFn() {
  return true;
}

function findModuleById(compilation, id) {
  const { modules, chunkGraph } = compilation;

  for (const module of modules) {
    const moduleId =
      typeof chunkGraph !== 'undefined'
        ? chunkGraph.getModuleId(module)
        : module.id;

    if (moduleId === id) {
      return module;
    }
  }

  return null;
}

function evalModuleCode(loaderContext, code, filename) {
  const module = new NativeModule(filename, loaderContext);

  module.paths = NativeModule._nodeModulePaths(loaderContext.context); // eslint-disable-line no-underscore-dangle
  module.filename = filename;
  module._compile(code, filename); // eslint-disable-line no-underscore-dangle

  return module.exports;
}

function compareIds(a, b) {
  if (typeof a !== typeof b) {
    return typeof a < typeof b ? -1 : 1;
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function compareModulesByIdentifier(a, b) {
  return compareIds(a.identifier(), b.identifier());
}

const MODULE_TYPE = 'css/mini-extract';
const AUTO_PUBLIC_PATH = '__MINI_CSS_EXTRACT_PLUGIN_PUBLIC_PATH__';

export {
  trueFn,
  findModuleById,
  evalModuleCode,
  compareModulesByIdentifier,
  MODULE_TYPE,
  AUTO_PUBLIC_PATH,
};
