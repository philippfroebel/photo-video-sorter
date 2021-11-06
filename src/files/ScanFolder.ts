import * as fs from "fs";
import * as path from "path";
/**
 * scan directory recursive for files
 *
 * @param {string} dirPath
 * @param {Array<string>} arrayOfFiles
 * @returns {Array<string>}
 */
export const scanFolder = (
    dirPath: string,
    arrayOfFiles: Array<string>,
): Array<string> => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = scanFolder(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });
    return arrayOfFiles;
};
