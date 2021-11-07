export default class PathNotExistsException extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = "path not exists";
    }
}
