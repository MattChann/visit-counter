const fs = require("fs");
const express = require('express');
const app = express();


app.get('/count.svg', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');

    try {
        const count = fs.readFileSync('./count.txt');
        res.send(
            `<svg width="50" height="10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <text x="0" y="10" fill="white">${count}</text>
            </svg>`
        );
        try {
            fs.writeFileSync('./count.txt', parseInt(count) + 1)
        } catch (err) {
            return;
        };
    } catch (err) {
        return;
    };
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));