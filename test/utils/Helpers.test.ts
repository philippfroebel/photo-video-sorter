import { isValidDateString } from "../../src/utils/Helpers";

describe("test isValidDateString helper", () => {
    it("should be a valid date string", () => {
        expect(isValidDateString("1970-01-10 00:00:00")).toBeTruthy();
    });

    it("should not be a valid date string", () => {
        expect(isValidDateString("1970:01:10 00:00:00")).toBeFalsy();
    });
});
