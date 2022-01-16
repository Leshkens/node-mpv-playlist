#!/usr/bin/env node

import MkvPlaylist from '../lib/index.js';
import RegFileGenerator from '../lib/reg_file_generator.js';
import Process from 'process';
import path from 'path';

import { Command } from 'commander/esm.mjs';
const program = new Command();

let argv = process.argv;

program
    .command('create')
    .description('Creating a playlist in the current (without -d flag) directory or the desired directory')
    .option('-d,--directory <path>', 'Desired directory path. E.g "C:\\MyPlaylists"')
    .option('-n,--name <name>', 'Playlist name')
    .action((options) => {
        new MkvPlaylist(Process.cwd(), 'name' in options ? options.name : undefined)
            .create();
    });

program
    .command('play')
    .description('Play available playlist in the current (without -pl flag) directory or the desired directory')
    .option('-pl,--playlist <path>', 'Playlist file full path. E.g "C:\\Playlists\\my_playlist.txt"')
    .action((options) => {
        let plPath = options.playlist
            ? path.dirname(options.playlist)
            : Process.cwd();
        let name = options.playlist
            ? path.basename(options.playlist, '.txt')
            : 'name' in options ? options.name : undefined;
        new MkvPlaylist(plPath, name)
            .play();
    });

program
    .command('create-reg-file')
    .description('Create windows registry file to add links to contextual menus')
    .option('-p,--path <path>', '')
    .action((options) => {
        new RegFileGenerator(argv[0], argv[1], options.path ? options.path : Process.cwd())
            .generate();
    });

program
    .command('create-and-play', { isDefault: true, hidden: true })
    .action(() => {
        new MkvPlaylist(Process.cwd())
            .create()
            .play();
    });

program.parse(argv);
