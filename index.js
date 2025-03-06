import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;


app.get('/', (req, res) => {
    // Resolve the path to the JSON file
    const jsonPath = path.resolve('data/mock.json');

    // Read the file and parse it as JSON
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }

        try {
            const parsedData = JSON.parse(data); // Parse the JSON content
            res.json(parsedData); // Send the parsed JSON as response
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

app.post('/create', (req, res) => {
    res.send('This is a POST request at /create')
});

app.put('/edit', (req, res) => {
    res.send('This is a PUT request at /edit')
});

app.delete('/delete', (req, res) => {
    res.send('This is a DELETE request at /delete')
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});