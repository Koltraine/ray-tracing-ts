"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = __importDefault(require("./export"));
class JPGExport extends export_1.default {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    export(content) {
        // TODO
    }
}
exports.default = JPGExport;
//# sourceMappingURL=jpg-export.js.map