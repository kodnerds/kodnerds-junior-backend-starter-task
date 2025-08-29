"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.editData = exports.createData = exports.singleData = exports.allData = void 0;
const dataService = __importStar(require("../services/dataService.js"));
const allData = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const allData = await dataService.getAllData(page, limit);
    res.status(allData.code).json(allData);
};
exports.allData = allData;
const singleData = async (req, res) => {
    const id = Number(req.params.id);
    const response = await dataService.getDataById(id);
    if (!response)
        return res.status(404).json({ message: "Data was not found" });
    res.json(response);
};
exports.singleData = singleData;
const createData = async (req, res) => {
    const { title, author, date, description, image, views, comment, likes, readMore } = req.body;
    const newResponse = await dataService.addData({ author, title, date, description, image, comment, likes, views, readMore });
    res.status(newResponse.code).json(newResponse);
};
exports.createData = createData;
const editData = async (req, res) => {
    const id = Number(req.params.id);
    const updated = await dataService.updateData(id, req.body);
    if (!updated)
        return res.status(404).json({ message: 'Data not found' });
    res.status(updated.code).json(updated);
};
exports.editData = editData;
const deleteData = async (req, res) => {
    const id = Number(req.params.id);
    const deletedResponse = await dataService.deleteData(id);
    if (!deletedResponse)
        return res.status(404).json({ message: "Data not found" });
    res.status(deletedResponse.code).json(deletedResponse);
};
exports.deleteData = deleteData;
