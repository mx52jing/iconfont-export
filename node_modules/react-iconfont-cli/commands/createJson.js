#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var colors_1 = tslib_1.__importDefault(require("colors"));
var targetFile = path_1.default.resolve('iconfont.json');
if (fs_1.default.existsSync(targetFile)) {
    console.error(colors_1.default.red('File "iconfont.json" was created before.'));
}
else {
    // fs.copyFileSync only can be used above node v8.5.0+
    fs_extra_1.default.copySync(path_1.default.join(__dirname, '../libs/iconfont.json'), targetFile);
    console.log(colors_1.default.green('File "iconfont.json" is created now. We recommend you add it to version control.'));
}
