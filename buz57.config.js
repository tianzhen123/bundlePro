const pathSep = require('path').sep;

/**
 * 打包过滤
 * @param module
 * @returns {boolean}
 */
function postProcessModulesFilter(module) {
    const projectRootPath = __dirname;
    if(module['path'].indexOf('__prelude__')>=0){
        return false;
    }
    if(module['path'].indexOf(pathSep+'node_modules'+pathSep)>0){
        if('js'+pathSep+'script'+pathSep+'virtual'==module['output'][0]['type']){
            return true;
        }
        return false;
    }
    return true;
}

/**
 * 固定模块名称和ID
 * @returns {function(*): string}
 */
function createModuleIdFactory() {
    const projectRootPath = __dirname;
    return path => {
        //console.log('path ',path);
        let name = '';
        if(path.indexOf('node_modules'+pathSep+'react-native'+pathSep+'Libraries'+pathSep)>0){
            name = path.substr(path.lastIndexOf(pathSep)+1);
        }else if(path.indexOf(projectRootPath)==0){
            name = path.substr(projectRootPath.length+1);
        }
        name = name.replace('.js','');
        name = name.replace('.png','');
        let regExp = pathSep=='\\'?new RegExp('\\\\',"gm"):new RegExp(pathSep,"gm");
        name = name.replace(regExp,'_');//把path中的/换成下划线
        return name;
    };
}


module.exports = {

    serializer: {
        createModuleIdFactory:createModuleIdFactory,
        processModuleFilter:postProcessModulesFilter
        /* serializer options */
    }
};