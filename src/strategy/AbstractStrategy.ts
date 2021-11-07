import { scanFolder } from "../files/ScanFolder";
import * as fs from "fs";
import PathNotExistsException from "../exception/PathNotExistsException";
import logger, { LOGGER_PREFIX } from "../utils/Logger";
import * as FileType from "file-type";
import { fixExifDateString, isValidDateString } from "../utils/Helpers";
import * as exiftool from "exiftool";
import * as path from "path";
import * as cliProgress from "cli-progress";
import { Spinner } from "cli-spinner";

/**
 * a cli-progress
 */
const statusBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic,
);

/**
 * increment the statusbar
 */
const updateStatusBar = (): void => {
    statusBar.increment();
};

/**
 *
 */
export default abstract class AbstractStrategy {
    sourceFolder: string;
    destinationFolder: string;
    fileType: string;
    files: Array<string>;

    /**
     *
     * @param {string} sourceFolder
     * @param {string} destinationFolder
     */
    constructor(
        sourceFolder: string,
        destinationFolder: string,
        fileType: string,
    ) {
        try {
            this.pathExists(sourceFolder);
        } catch (error) {
            logger.error(LOGGER_PREFIX, "Source folder dose not exists");
            process.exit(1);
        }

        try {
            this.pathExists(destinationFolder);
        } catch (error) {
            logger.error(LOGGER_PREFIX, "destination folder dose not exists");
            process.exit(1);
        }

        this.sourceFolder = sourceFolder;
        this.destinationFolder = destinationFolder;
        this.fileType = fileType;
    }

    /**
     * start sorting images
     */
    public async sort() {
        const spinner = new Spinner("searching files... %s");
        spinner.setSpinnerString("|/-\\");
        spinner.start();
        try {
            this.files = this.scanSourceFolder();
        } catch (error) {
            logger.error(LOGGER_PREFIX, error);
            spinner.stop();
            process.exit(1);
        }
        spinner.stop();
        await this.processFiles();
    }

    /**
     * process all files found
     * after each file update the statusbar
     */
    private async processFiles() {
        statusBar.start(this.files.length, 0);
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            await this.processFile(file);
            updateStatusBar();
        }
        statusBar.stop();
    }

    /**
     * process a file
     *
     * 1. check the mimetype
     * 2. extract the exif or ctime date from file
     * 3. create the destination folder if not exist
     * 4. move the file to destination folder
     *
     * @param {string} file
     */
    private async processFile(file: string): Promise<void> {
        try {
            if (await this.checkMimeType(file)) {
                const createdDate = await this.getCreatedTime(file);
                const destionFolder = this.buildDestinationPath(createdDate);
                this.moveFile(file, destionFolder + "/" + path.basename(file));
            }
        } catch (error) {
            logger.error(LOGGER_PREFIX, error);
        }
    }

    abstract buildDestinationPath(fileDate: Date): string;

    /**
     * scan the source folder recursive for files
     *
     * @returns {Array<string>}
     */
    private scanSourceFolder(): Array<string> {
        return scanFolder(this.sourceFolder, []);
    }

    /**
     * check if a file is from type in this.fileType
     *      -> current types are image or video
     *
     * @param {string} filePath
     * @returns {Promise<boolean>}
     */
    private async checkMimeType(filePath: string): Promise<boolean> {
        const type = await FileType.fromFile(filePath),
            mimeTypeRegex = new RegExp(this.fileType);
        if (type && mimeTypeRegex.test(type.mime)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * check if a folder path exists
     *
     * @param {string} filePath
     * @returns {void}
     * @throws {PathNotExistsException}
     */
    protected pathExists(path: string): void {
        try {
            fs.lstatSync(path).isDirectory();
        } catch (error) {
            throw new PathNotExistsException();
        }
    }

    /**
     * create a folder path
     *
     * @param {string} path
     */
    protected createPath(path: string) {
        fs.mkdirSync(path, { recursive: true });
    }

    /**
     * move a file
     *
     * @param {string} sourceFile
     * @param {string} destinationFile
     */
    private moveFile(sourceFile: string, destinationFile: string) {
        if (sourceFile !== destinationFile) {
            fs.renameSync(sourceFile, destinationFile);
        }
    }

    /**
     * try to extract the ctime of a file via imagemagic
     *
     * @param {string} sourceFile
     * @returns {Promise<Date>}
     */
    private getCreatedTime(sourceFile: string): Promise<Date> {
        return new Promise((resolve, reject) => {
            const data = fs.readFileSync(sourceFile);
            exiftool.metadata(data, (err, metadata) => {
                let dateTimeString: string;
                if (err) {
                    reject(err);
                } else {
                    if (
                        metadata.createDate &&
                        isValidDateString(
                            fixExifDateString(metadata.createDate),
                        )
                    ) {
                        dateTimeString = fixExifDateString(metadata.createDate);
                    } else if (
                        metadata.profileDateTime &&
                        isValidDateString(
                            fixExifDateString(metadata.profileDateTime),
                        )
                    ) {
                        dateTimeString = fixExifDateString(
                            metadata.profileDateTime,
                        );
                    } else if (
                        metadata["date/timeOriginal"] &&
                        isValidDateString(
                            fixExifDateString(metadata["date/timeOriginal"]),
                        )
                    ) {
                        dateTimeString = fixExifDateString(
                            metadata["date/timeOriginal"],
                        );
                    } else {
                        dateTimeString = fs
                            .statSync(sourceFile)
                            .ctime.toDateString();
                    }
                    resolve(new Date(dateTimeString));
                }
            });
        });
    }
}
