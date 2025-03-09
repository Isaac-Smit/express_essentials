import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const jsonPath = path.resolve('data/mock.json');
let jsonData = [];

fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    try {
        jsonData = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

app.use(express.static("public"));

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/profile-create", (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.use('/images', express.static("images"));

app.route('/user-profile')
    .get((req, res) => {
    res.send('This is a POST request at /user-profile')
})  .put((req, res) => {
    res.send('This is a PUT request at /user-profile')
})  .delete((req, res) => {
    res.send('This is a DELETE request at /user-profile')
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("something is broken!");
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

app.get('/', (req, res) => {
    res.json(jsonData);
});

app.get('/redirect', (req, res) => {
    res.redirect("http://www.linkedin.com");
});

app.get('/download', (req, res) => {
    res.download("images/mc-jugger-nuggets.gif");
});

app.get("/next", (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next();
}, (req, res) => {
    res.send("I just set up a route with a second callback.")
}
);

app.get("/class/:id", (req, res,) => {
    const studentId = Number(req.params.id);
    const student = jsonData.filter((student) => student.id === studentId);
    if (student.length > 0) {
        res.json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
});

