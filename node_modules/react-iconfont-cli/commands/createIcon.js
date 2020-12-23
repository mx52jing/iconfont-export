#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var colors_1 = tslib_1.__importDefault(require("colors"));
var getConfig_1 = require("../libs/getConfig");
var iconfont_parser_1 = require("iconfont-parser");
var generateComponent_1 = require("../libs/generateComponent");
var config = getConfig_1.getConfig();
iconfont_parser_1.fetchXml(config.symbol_url).then(function (result) {
    generateComponent_1.generateComponent(result, config);
}).catch(function (e) {
    console.error(colors_1.default.red(e.message || 'Unknown Error'));
    process.exit(1);
});
