export default class PathNotExistsException extends Error {
    message: string;
    name = "path not exists";

    constructor() {
        super();
        this.name = this.constructor.name;
    }
}
