"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.addData = exports.getDataById = exports.getAllData = void 0;
const fileHandler_js_1 = require("../utils/fileHandler.js");
const getAllData = async (page = 1, limit = 10) => {
    try {
        const data = await (0, fileHandler_js_1.readData)();
        const total = data.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const results = data.slice(start, end);
        if (data.length === 0) {
            return {
                code: 400,
                success: false,
                message: "Data not available",
                data: null,
            };
        }
        return {
            code: 200,
            success: true,
            message: "Data retrieved successfully",
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNext: end < total,
            hasPrev: page > 1,
            data: results,
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
        return {
            code: 500,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
};
exports.getAllData = getAllData;
const getDataById = async (id) => {
    try {
        const data = await (0, fileHandler_js_1.readData)();
        if (!id) {
            return {
                code: 404,
                success: false,
                message: "Provide data ID",
                data: null,
            };
        }
        return data.find((d) => d.id === id);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
        return {
            code: 500,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
};
exports.getDataById = getDataById;
const addData = async (data) => {
    try {
        const datum = await (0, fileHandler_js_1.readData)();
        const newDatum = {
            id: (0, fileHandler_js_1.getId)(datum),
            author: data.author,
            date: data.date,
            title: data.title,
            description: data.description,
            image: data.image,
            comments: data.comment,
            views: data.views,
            likes: data.likes,
            readMore: data.readMore,
        };
        datum.push(newDatum);
        await (0, fileHandler_js_1.writeData)(datum);
        return {
            code: 201,
            success: true,
            message: "New data added successfully",
            data: newDatum
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
        return {
            code: 500,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
};
exports.addData = addData;
const updateData = async (id, updates) => {
    try {
        const data = await (0, fileHandler_js_1.readData)();
        const index = data.findIndex((set) => set.id === id);
        if (index === -1)
            return null;
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) {
                data[index][key] = updates[key];
            }
        });
        await (0, fileHandler_js_1.writeData)(data);
        return {
            code: 200,
            success: true,
            message: "Data updated successfully",
            Updated: data[index]
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
        return {
            code: 500,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
};
exports.updateData = updateData;
const deleteData = async (id) => {
    try {
        let data = await (0, fileHandler_js_1.readData)();
        if (!id) {
            return {
                code: 404,
                success: false,
                message: "No id provided",
                data: null
            };
        }
        const datum = data.find((set) => set.id === id);
        if (!datum) {
            return {
                code: 404,
                success: false,
                message: "Data not found",
                data: null,
            };
        }
        data = data.filter((d) => d.id !== id);
        await (0, fileHandler_js_1.writeData)(data);
        return {
            code: 200,
            success: true,
            message: "Data deleted successfully",
            Deleted: datum
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failure to get all documents";
        return {
            code: 500,
            success: false,
            message: errorMessage,
            data: null,
        };
    }
};
exports.deleteData = deleteData;
