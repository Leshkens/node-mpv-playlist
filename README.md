# WIP

## Requirements:
- **Windows 10**
- [**mpv**](https://mpv.io/) player
- **Nodejs** >= 14

## Install
`npm i -g node-mpv-playlist`

## Usage
Execute `mpv-playlist` in the directory with the desired video (.avi, .mkv, .mp4) files

## Adding link to the Windows context menu
You need to generate the registry file, to do this run:
`mpv-playlist generate-reg *dir* *title*`
where _**dir**_ is the location where the .reg file will be saved and _**title**_ is the context menu title