import { execSync } from 'child_process';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { PORT } from './config';

const app = express();

app.get('/', (req, res, next) => {
    const fileContents = fs.readFileSync(path.join(__dirname, "app.html"));
    res.contentType("text/html").send(fileContents);
});


app.get('/frontend', (req, res, next) => {
    res.contentType("text/javascript").sendFile(path.join(__dirname, "frontend.js"));
});

app.get('/sensors', (req, res, next) => {
    const hostInfo = execSync('uname -mrs').toString('utf-8');
    const sensorsResult = execSync('sensors').toString('utf-8');
    res.contentType("application/json").send({
        hostInfo,
        sensorsResult
    });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});