const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/submit', (req, res) => {
    try {
        const jsonData = JSON.parse(req.body.jsonData);
        const htmlResponse = generateHtmlPage(jsonData);
        res.send(htmlResponse);
    } catch (error) {
        res.status(400).json({ error: 'Invalid JSON data' });
    }
});

function generateHtmlPage(jsonData) {
    const jsonHtml = Object.entries(jsonData)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>JSON Display</title>
        </head>
        <body>
            <h1>JSON Display</h1>
            ${jsonHtml}
        </body>
        </html>
    `;
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
