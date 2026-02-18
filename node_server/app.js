const express = require('express');
const app = express();
const offer1Payload = require('./offer1_payload');
const offer2Payload = require('./offer2_payload');

const PORT = 3000;
const HOST = '0.0.0.0';

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/offers1', (req, res) => {
    res.status(200).json(offer1Payload.response);
});


app.get('/offers2', (req, res) => {
    res.status(200).json(offer2Payload);
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, HOST, () => console.log(`API running at http://${HOST}:${PORT}`));