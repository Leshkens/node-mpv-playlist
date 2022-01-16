# WIP

## Requirements:
- **Windows 10**
- [**mpv**](https://mpv.io/) player
- **Nodejs** >= 14

## Install
`npm i -g leshkens/node-mpv-playlist`

## Usage
Execute `mpv-playlist` in the directory with the desired video (.avi, .mkv, .mp4) files

## Adding link to the Windows context menu (shift+right click on directory space)
You need to generate the registry file, to do this run:
`mpv-playlist create-reg-file <dir>`
where **dir** is the location where the .reg file will be saved