const express = require("express");
const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "counter.json");

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1><a href='/about'>Go to About</a>");
    fs.readFile(pathToFile, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const counter = JSON.parse(data);
        counter.main++;
        console.log(`Пользователь посетил страницу Home ${counter.main} раз`);
        fs.writeFileSync (pathToFile, JSON.stringify(counter, null, 2));
    })
    
});

app.get("/about", (req, res) => {
    res.send("<h1>About page</h1><a href='/'>Go to Home</a>");
    fs.readFile(pathToFile, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        const counter = JSON.parse(data);
        counter.about++;
        console.log(`Пользователь посетил страницу About ${counter.about} раз`);

        fs.writeFileSync(
          pathToFile,
          JSON.stringify(counter, null, 2)
        );
      });
    
});

const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});