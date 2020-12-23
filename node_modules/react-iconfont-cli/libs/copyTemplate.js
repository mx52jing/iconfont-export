"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
exports.copyTemplate = function (fromFile, toFile) {
    return fs_1.default.copyFileSync(path_1.default.join(__dirname, "../templates/" + fromFile + ".template"), toFile);
};
