const express = require('express');
const app = express();
const fs = require('fs');

function isExistFile(file) {
    try {
      fs.statSync(file);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
  }


app.use(express.json());

app.get('/', (req, res) => {
    console.log("requested")
    res.send('Simple REST API');
});

app.get('/api/v1/week/:day', (req, res) => {
    let result = null
    if(isExistFile("api/schedule_data/" + req.params.day + ".json")) {
        result = JSON.parse(fs.readFileSync("api/schedule_data/" + req.params.day + ".json"))
    }
    res.send({status: "success", result: result})
});

app.get('/api/v1/week/task/:day', (req, res) => {
    let result = null
    if(isExistFile("api/tasklist/" + req.params.day + ".json")) {
        result = JSON.parse(fs.readFileSync("api/tasklist/" + req.params.day + ".json"))
    }
    res.send({status: "success", result: result})
});

app.post('/api/v1/weekupdate', (req, res) => {
    fs.writeFileSync("api/schedule_data/" + req.body.target_week + ".json", JSON.stringify(req.body.schedules), (err) => {
        if (err) {
            res.send({status: "error"})
            throw err;
        }
        console.log('ファイルが正常に出力されました。');
    });
    res.send({status: "success"});
});

app.post('/api/v1/tasklistupdate', (req, res) => {
    fs.writeFileSync("api/tasklist/" + req.body.target_week + ".json", JSON.stringify(req.body.taskList), (err) => {
        if (err) {
            res.send({status: "error"})
            throw err;
        }
        console.log('ファイルが正常に出力されました。');
    });
    res.send({status: "success"});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));