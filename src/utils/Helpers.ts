import { isValid, parseISO } from "date-fns";

/**
 * check date string for validity
 *
 * @param dateString
 * @returns {boolean}
 */
export const isValidDateString = (dateString: string): boolean => {
    const date = parseISO(dateString);
    return isValid(date);
};

/**
 *
 * @param exifDateString
 * @returns {string} for js well formated date string 2021-12-24
 */
export const fixExifDateString = (exifDateString: string) => {
    return exifDateString.split(" ")[0].split(":").splice(0, 3).join("-");
};
