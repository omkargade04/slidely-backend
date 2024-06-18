"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = require("../controllers/index.controller");
const routes = express_1.default.Router();
routes.get("/ping", index_controller_1.pingCall);
routes.post("/submit", index_controller_1.formSubmission);
routes.get("/read", index_controller_1.getResult);
routes.post("/search", index_controller_1.searchByEmail);
routes.put("/edit", index_controller_1.editData);
routes.delete("/delete", index_controller_1.deleteData);
module.exports = routes;
