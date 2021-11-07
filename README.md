the photo-video-sorter is a small cli tool to sort photos or videos by exif date or ctime as fallback into a folder structure. 

e.g. a file with date 2021-12-24 will be moved into this folder structure by default
```
{destinationFolder}/2021/12/
```

### Why moveing files?
to keep the ctime and mtime original

## Dependencies
pvs using [exiftool](https://www.npmjs.com/package/exiftool) to extract exif date from files

so we need the exiftool package for your system

on macOS
```
sudo brew update
sudo brew install exiftool
```
[https://exiftool.org/install.html](https://exiftool.org/install.html)


## Installation

Global
```
npm install -g photo-video-sorter
```

Local
```
npm install photo-video-sorter
```

## Usage: pvs [options]
```
Options:
  -s, --strategy <monthYear|dayMonthYear|year>  the strategy for sorting files into folder (default: "monthYear")
  -sf, --sourceFolder <path>                    the sourceFolder to scan for files
  -df, --destinationFolder <path>               the destination folder for the sorted files
  -t, --fileType <image | video>                the file type looking for (default: "image")
  -h, --help                                    display help for command
```

## Examples global
```
pvs -s dayMonthYear -sf /Users/..../Photos -df /Volumes/Photos -t image

pvs -s dayMonthYear -sf /Users/..../Videos -df /Volumes/Videos -t video
```

## Examples local
```
npx pvs -s dayMonthYear -sf /Users/..../Photos -df /Volumes/Photos -t image

npx pvs -s dayMonthYear -sf /Users/..../Videos -df /Volumes/Videos -t video
```

# Development 
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```