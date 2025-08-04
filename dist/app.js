"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const public_1 = __importDefault(require("./routes/public"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const passpost_1 = require("./config/passpost");
const database_1 = require("./config/database");
const api_1 = __importDefault(require("./routes/api"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Connect to database
(0, database_1.connectDatabase)();
(0, passpost_1.initializePassport)(); //passport initialization
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_routes_1.default); // auth routes
app.use("/", public_1.default);
app.use("/api", api_1.default);
exports.default = app;
