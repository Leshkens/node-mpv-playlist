import * as fs from 'fs';

export default class RegFileGenerator {

    nodePath;
    scriptFilePath;
    filePath;
    regFileName;

    constructor(nodePath, scriptFilePath, filePath, regFileName = 'mpv-playlist-context-menu') {
        this.scriptFilePath = scriptFilePath;
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
            '[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\mpv-playlist]\n' +
            '"Extended"=""\n' +
            '@="MPV-player playlist"\n' +
            '\n' +
            '[HKEY_CLASSES_ROOT\\Directory\\Background\\shell\\mpv-playlist\\command]\n' +
            '@="\\"'+this.nodePath.replace(/\\/g, '\\\\')+'\\" \\"'+this.scriptFilePath.replace(/\\/g, '\\\\')+'\\""\n' +
            '\n' +
            '[HKEY_CLASSES_ROOT\\SystemFileAssociations\\.txt\\shell\\mpv-playlist]\n' +
            '@="Play playlist in mpv"\n' +
            '\n' +
            '[HKEY_CLASSES_ROOT\\SystemFileAssociations\\.txt\\shell\\mpv-playlist\\command]\n' +
            '@="\\"'+this.nodePath.replace(/\\/g, '\\\\')+'\\" \\"'+this.scriptFilePath.replace(/\\/g, '\\\\')+'\\"' +
            ' \\"play\\" \\"-pl\\" \\"%V\\""\n' +
            '\n';
    }
}
