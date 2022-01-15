#!/usr/bin/env node

import MkvPlaylist from '../lib/index.js';
import RegFileGenerator from '../lib/reg_file_generator.js';
import { cwd, argv, execArgv } from 'process';

let args = argv.splice(execArgv.length + 2);

if (args[0] === undefined) {
    new MkvPlaylist(cwd())
        .createAndPlay();
} else {

    if (args[0] === 'generate-reg') {
        new RegFileGenerator(argv[0], argv[1], args[1], args[2], args[3])
            .generate();
    }
}
