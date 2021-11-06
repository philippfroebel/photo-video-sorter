#!/usr/bin/env node

import MonthYearStrategy from "./strategy/MonthYearStrategy";
import DayMonthYearStrategy from "./strategy/DayMonthYearStrategy";
import YearStrategy from "./strategy/YearStrategy";
import { Command } from "commander";
import logger, { LOGGER_PREFIX } from "./utils/Logger";
const program = new Command();

program
    .requiredOption(
        "-s, --strategy <monthYear|dayMonthYear|year>",
        "the strategy for sorting files into folder",
        "monthYear",
    )
    .requiredOption(
        "-sf, --sourceFolder <path>",
        "the sourceFolder to scan for files",
    )
    .requiredOption(
        "-df, --destinationFolder <path>",
        "the destination folder for the sorted files",
    )
    .requiredOption(
        "-t, --fileType <image | video>",
        "the file type looking for",
        "image",
    );

program.parse();
const options = program.opts();

switch (options.strategy) {
    case "monthYear":
        new MonthYearStrategy(
            options.sourceFolder,
            options.destinationFolder,
            options.fileType,
        ).sort();
        break;
    case "dayMonthYear":
        new DayMonthYearStrategy(
            options.sourceFolder,
            options.destinationFolder,
            options.fileType,
        ).sort();
        break;
    case "year":
        new YearStrategy(
            options.sourceFolder,
            options.destinationFolder,
            options.fileType,
        ).sort();
        break;
    default:
        logger.error(
            LOGGER_PREFIX,
            "unsupported strategy! allowed are monthYear | dayMonthYear | year",
        );
}
