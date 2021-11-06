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
