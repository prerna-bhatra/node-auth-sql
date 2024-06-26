"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
// import { AppDataSource } from './config/database';
// import authRoutes from './routes/authRoutes';
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./src/config/database");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;
database_1.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => console.log(error));
