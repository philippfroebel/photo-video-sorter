import AbstractStrategy from "./AbstractStrategy";

export default class MonthYearStrategy extends AbstractStrategy {
    constructor(
        sourceFolder: string,
        destinationFolder: string,
        fileType: string,
    ) {
        super(sourceFolder, destinationFolder, fileType);
    }

    /**
     * build the destionation path for the given date
     *
     * example
     *      2021-12-24 -> {this.destinationFolder}/2021/12
     *
     * @param {Date} fileDate
     * @returns {string} like {this.destinationFolder}/2021/12
     */
    buildDestinationPath(fileDate: Date): string {
        const month = (fileDate.getMonth() + 1).toString().padStart(2, "0");
        const path =
            this.destinationFolder + "/" + fileDate.getFullYear() + "/" + month;

        try {
            this.pathExists(path);
        } catch (error) {
            this.createPath(path);
        }

        return path;
    }
}
