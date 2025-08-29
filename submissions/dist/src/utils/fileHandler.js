"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
exports.getId = getId;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dataPath = path_1.default.join(process.cwd(), "data/dataset.json");
const readData = async () => {
    const data = await fs_1.promises.readFile(dataPath, "utf-8");
    return JSON.parse(data);
};
exports.readData = readData;
const writeData = async (data) => {
    await fs_1.promises.writeFile(dataPath, JSON.stringify(data, null, 2));
};
exports.writeData = writeData;
function getId(items) {
    const ids = items.map((item) => Number(item.id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}
