"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    const fileContents = fs_1.default.readFileSync(path_1.default.join(__dirname, "app.html"));
    res.contentType("text/html").send(fileContents);
});
app.get('/frontend', (req, res, next) => {
    res.contentType("text/javascript").sendFile(path_1.default.join(__dirname, "frontend.js"));
});
app.get('/sensors', (req, res, next) => {
    const sensorsResult = (0, child_process_1.execSync)('sensors').toString('utf-8');
    res.send({
        sensorsResult
    });
});
app.listen(config_1.PORT, () => {
    console.log(`Server started at port ${config_1.PORT}`);
});
