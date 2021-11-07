import PathNotExistsException from "../src/exception/PathNotExistsException";

describe("test path not exists exception", () => {
    it("should throw PathNotExistsException", () => {
        try {
            throw new PathNotExistsException();
        } catch (error) {
            expect(error.name).toBe("PathNotExistsException");
            expect(error.message).toBe("path not exists");
        }
    });
});
