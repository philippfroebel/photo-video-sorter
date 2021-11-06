

## Usage: pvs [options]
```
Options:
  -s, --strategy <monthYear|dayMonthYear|year>  the strategy for sorting files into folder (default: "monthYear")
  -sf, --sourceFolder <path>                    the sourceFolder to scan for files
  -df, --destinationFolder <path>               the destination folder for the sorted files
  -t, --fileType <image | video>                the file type looking for (default: "image")
  -h, --help                                    display help for command
```

## Examples
```
pvs -s dayMonthYear -sf /Users/..../Photos -df /Valumes/Photos -t image

pvs -s dayMonthYear -sf /Users/..../Videos -df /Valumes/Videos -t video
```