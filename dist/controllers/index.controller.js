"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.editData = exports.searchByEmail = exports.getResult = exports.formSubmission = exports.pingCall = void 0;
const fs = require("fs");
const pingCall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send("True");
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.pingCall = pingCall;
const formSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = 0;
        const newSubmission = req.body;
        userId += 1;
        fs.readFile("db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: "Error reading database file" });
            }
            let submissions = JSON.parse(data || "[]");
            submissions.push(newSubmission);
            submissions.push(userId);
            fs.writeFile("db.json", JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        status: false,
                        message: "Error writing to database file",
                    });
                }
                res
                    .status(200)
                    .json({ status: true, message: "Submission received" });
            });
        });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.formSubmission = formSubmission;
const getResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.query.index, 10);
        if (isNaN(index)) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid index parameter" });
        }
        fs.readFile("db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: "Error reading database file" });
            }
            let submissions = JSON.parse(data || "[]");
            if (index < 0 || index >= submissions.length) {
                return res
                    .status(404)
                    .json({ status: false, message: "Submission not found" });
            }
            res.status(200).json({
                status: true,
                data: submissions[index],
                message: "Data retrieved successfully3",
            });
        });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.getResult = getResult;
const searchByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            return res
                .status(400)
                .json({ status: false, message: "Email query parameter is required" });
        }
        fs.readFile("db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: "Error reading database file" });
            }
            let submissions = JSON.parse(data || "[]");
            const results = submissions.filter((submission) => submission.email === email);
            if (results.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "No submissions found for the given email",
                });
            }
            res.status(200).json({
                status: true,
                data: results,
                message: "Data via email fetched",
            });
        });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.searchByEmail = searchByEmail;
const editData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.body.index, 10);
        const updatedSubmission = req.body.updatedSubmission;
        if (isNaN(index)) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid index parameter" });
        }
        if (!updatedSubmission) {
            return res
                .status(400)
                .json({
                status: false,
                message: "Updated submission data is required",
            });
        }
        fs.readFile("db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: "Error reading database file" });
            }
            let submissions = JSON.parse(data || "[]");
            if (index < 0 || index >= submissions.length) {
                return res
                    .status(404)
                    .json({ status: false, message: "Submission not found" });
            }
            submissions[index] = updatedSubmission;
            fs.writeFile("db.json", JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({
                        status: false,
                        message: "Error writing to database file",
                    });
                }
                res
                    .status(200)
                    .json({ status: true, message: "Submission updated successfully" });
            });
        });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.editData = editData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const index = parseInt(req.body.index, 10);
        if (isNaN(index)) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid index parameter" });
        }
        fs.readFile("db.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ status: false, message: "Error reading database file" });
            }
            let submissions = JSON.parse(data || "[]");
            if (index < 0 || index >= submissions.length) {
                return res
                    .status(404)
                    .json({ status: false, message: "Submission not found" });
            }
            submissions.splice(index, 1);
            fs.writeFile("db.json", JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res
                        .status(500)
                        .json({
                        status: false,
                        message: "Error writing to database file",
                    });
                }
                res
                    .status(200)
                    .json({
                    status: false,
                    message: "Submission deleted successfully",
                });
            });
        });
    }
    catch (err) {
        res.status(500).json({ status: false, message: "Internal server error" });
    }
});
exports.deleteData = deleteData;
