import { execSync } from 'child_process';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { PORT } from './config';

type Sensor = {
    sensorName: string;
    command: string;
}

const app = express();

app.use(express.json({
    limit: "50mb"
}));

app.get('/', (req, res, next) => {
    const fileContents = fs.readFileSync(path.join(__dirname, "app.html"));
    res.contentType("text/html").send(fileContents);
});


app.get('/frontend', (req, res, next) => {
    res.contentType("text/javascript").sendFile(path.join(__dirname, "frontend.js"));
});

app.post('/sensors', (req, res, next) => {
    const sensors = req.body.sensors as Sensor[];

    const result: {[key: string]: string} = {};
    sensors.map(sensorData => {
        const sensorOutput = execSync(sensorData.command).toString('utf-8').split("\n").join("<br />");
        result[sensorData.sensorName] = sensorOutput;
        return result[sensorData.sensorName];
    });

    res.contentType("application/json").send(result);
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});