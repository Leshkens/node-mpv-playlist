import * as fs from 'fs';
export default class RegFileGenerator {

    nodePath;
    contextMenuTitle;
    scriptFilePath
    filePath;
    regFileName;

    constructor(nodePath, scriptFilePath, filePath, contextMenuTitle = 'mpv-playlist', regFileName = 'mpv-playlist-context-menu') {
        this.contextMenuTitle = contextMenuTitle
        this.scriptFilePath = scriptFilePath
        this.nodePath = nodePath;
        this.filePath = filePath;
        this.regFileName = regFileName;
    }

    generate() {
        let file = this.filePath + '\\' + this.regFileName + '.reg';
        try {
            if (fs.existsSync(file)) {
                fs.rmSync(file);
            }
            let fd = fs.openSync(file, 'a');
            fs.writeFileSync(fd, this.#regFileContent());
            fs.closeSync(fd);
        } catch (e) {
            console.error(e);
        }
    }

    #regFileContent() {
        return 'Windows Registry Editor Version 5.00\n' +
            '\n' +
            '[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\'+this.contextMenuTitle+']\n' +
            '"Extended"=""\n' +
            '\n' +
            '[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\'+this.contextMenuTitle+'\\command]\n' +
            '@="\\"'+this.nodePath.replace(/\\/g, '\\\\')+'\\" \\"'+this.scriptFilePath.replace(/\\/g, '\\\\')+'\\""\n' +
            '\n';
    }
}