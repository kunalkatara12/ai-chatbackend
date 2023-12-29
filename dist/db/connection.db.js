"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDBConnection = exports.connectToDB = void 0;
const mongoose_1 = require("mongoose");
async function connectToDB() {
    const mongoURL = process.env.MONGODB_URL || "";
    if (mongoURL === "") {
        console.log("MongoDB URL not found in .env file");
        throw new Error("MongoDB URL not found in .env file");
    }
    try {
        await (0, mongoose_1.connect)(mongoURL);
        console.log("Connected to MongoDB successfully!");
    }
    catch (err) {
        console.log("Error connecting to database in connection.ts:", err);
        throw new Error("Error connecting to database in connection.ts");
    }
}
exports.connectToDB = connectToDB;
async function closeDBConnection() {
    try {
        await (0, mongoose_1.disconnect)();
        console.log("Connection closed successfully!");
    }
    catch (err) {
        console.log("Error closing connection in connection.ts:", err);
        throw new Error("Error closing connection in connection.ts");
    }
}
exports.closeDBConnection = closeDBConnection;
//# sourceMappingURL=connection.db.js.map