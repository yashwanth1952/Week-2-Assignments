/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

module.exports = app;

const getFiles = (req, res, next) => {
  fs.readdir("./files/", (err, dirFiles) => {
    if (err) res.status(500).send();
    res.status(200).send(dirFiles);
  });
};

const getFile = (req, res, next) => {
  const filename = req.params.filename;
  fs.readdir("./files/", (err, dirFiles) => {
    if (err) res.status(500).send();
    let temp = dirFiles.filter((dirFile) => dirFile === filename);
    if (temp.length === 0) {
      res.status(404).send("File not found");
    }
    fs.readFile("./files/" + temp[0], "utf8", (err, data) => {
      res.status(200).send(data);
    });
  });
};

const getNotFound = (req, res, next) => {
  res.status(404).send("Route not found");
};

app.get("/files", getFiles);
app.get("/file/:filename", getFile);
app.use(getNotFound);
// app.listen(PORT, () => console.log("SERVER STARTED AT PORT"));
