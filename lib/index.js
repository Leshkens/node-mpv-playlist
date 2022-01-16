import * as fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export default class MkvPlaylist {

    path;
    name;
    extensions;

    constructor(path, name = 'mpv_playlist', extensions = ['.mp4', '.mkv', '.avi']) {
        this.path = path;
        this.name = name+'.txt';
        this.extensions = extensions;
    }

    #allFiles() {
        return fs.readdirSync(this.path);
    }

    #videoFiles() {
        return this.#allFiles()
            .filter(file => this.extensions.includes(path.extname(file)))
            .sort();
    }

    create() {
        let name = this.name;
        let files = this.#videoFiles();

        if (files.length === 0) {
            console.log('No video files found.');
        } else {
            try {
                if (fs.existsSync(name)) {
                    fs.rmSync(name);
                }
                let fd = fs.openSync(name, 'a+');
                for (let i = 0; i < files.length; ++i) {
                    fs.writeFileSync(fd, files[i]+'\n');
                }
                fs.closeSync(fd);
            } catch (e) {
                console.error(e);
            }
        }
        return this;
    }

    play() {
        let pl = this.path+'\\'+this.name;
        try {
            spawn('mpv', ['--playlist='+pl], {
                stdio: 'inherit'
            });
        } catch (e) {
            console.error(e);
        }
    }
}
