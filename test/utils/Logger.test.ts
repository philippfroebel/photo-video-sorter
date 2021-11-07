import logger, { LOGGER_PREFIX } from "../../src/utils/Logger";

describe("test Logger", () => {
    it("should be the LOGGER_PREFIX", () => {
        expect(LOGGER_PREFIX).toBe("pvs");
        expect(logger).toBeInstanceOf(Object);
    });

    it("logger.error should be defined", () => {
        expect(logger.error).toBeDefined();
        expect(logger.error).toBeInstanceOf(Function);
    });

    it("logger.info should be defined", () => {
        expect(logger.info).toBeDefined();
        expect(logger.info).toBeInstanceOf(Function);
    });

    it("logger.warn should be defined", () => {
        expect(logger.warn).toBeDefined();
        expect(logger.warn).toBeInstanceOf(Function);
    });

    it("logger.log should be defined", () => {
        expect(logger.log).toBeDefined();
        expect(logger.log).toBeInstanceOf(Function);
    });
});
