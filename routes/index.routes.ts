import express, { Router } from 'express';
import { pingCall, formSubmission, getResult, searchByEmail, editData, deleteData } from '../controllers/index.controller';
const routes: Router = express.Router();

routes.get("/ping", pingCall);
routes.post("/submit", formSubmission);
routes.get("/read", getResult);
routes.get("/search", searchByEmail);
routes.put("/edit", editData);
routes.delete("/delete", deleteData);


module.exports = routes;