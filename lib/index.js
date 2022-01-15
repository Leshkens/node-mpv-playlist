import * as fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export default class MkvPlaylist {

    path;
    fileName;
    extensions;

    constructor(path, fileName = 'playlist.txt', extensions = ['.mp4', '.mkv', '.avi']) {
        this.path = path;
        this.fileName = fileName;
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
        let name = this.fileName;
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
                    fs.writeFileSync(fd, files[i] + '\n');
                }
                fs.closeSync(fd);
            } catch (e) {
                console.error(e);
            }
        }
    }

    play() {
        try {
            spawn('mpv', ['--playlist=' + this.fileName], {
                stdio: 'inherit'
            });
        } catch (e) {
            console.error(e);
        }
    }

    createAndPlay() {
        this.create();
        this.play();
    }
}
