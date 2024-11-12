"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const export_1 = __importDefault(require("./export"));
const PPM_EXT = '.ppm';
class PPMExport extends export_1.default {
    constructor(fileName, directory = 'output') {
        super();
        this.filePath = this.generateUniqueFilePath(fileName, directory);
    }
    generateUniqueFilePath(fileName, directory) {
        let filePath = path_1.default.join(process.cwd(), directory, `${fileName}${PPM_EXT}`);
        let counter = 1;
        while (fs_1.default.existsSync(filePath)) {
            filePath = path_1.default.join(process.cwd(), directory, `${fileName}-${counter}${PPM_EXT}`);
            counter++;
        }
        return filePath;
    }
    export(data) {
        fs_1.default.writeFileSync(this.filePath, data, 'utf8');
    }
}
exports.default = PPMExport;
//# sourceMappingURL=ppm-export.js.map