"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes = require("../routes/index.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use(routes);
app.get('/', (req, res) => {
    res.status(200).send("Server running...");
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
