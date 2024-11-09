const express = require('express');
const pseudodata = require('./config/pseudodata.json');

// MySql
const mysql = require("mysql2");

const dbconfig = require("./config/db.json");
const connection = mysql.createConnection(dbconfig);

// GigaChat
const clientKey = require('./config/gigachad.json').clientKey;
const promptBegin = require('./config/gigachad.json').promptBegin;
const GigaChat = require('gigachat-node').GigaChat;

const client = new GigaChat(
    clientSecretKey = clientKey,
    isIgnoreTSL = true,
    isPersonal = true,
    autoRefreshToken = true
);

async function GCprepare() {
    await client.createToken();
}

async function GCmsg(message) {
    const responce = await client.completion({
        "model": "GigaChat:latest",
        "messages": [{
            role: "user",
            content: message
        }]
    });

    return responce.choices[0].message.content;
}

const app = express();
const jsonParser = express.json();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Get section
app.get('/', async(req, res) => {
    let touristflow, touristdist, taxreveniue;

    const data = {
        tourist_flow: {
            "plan": pseudodata.touristflow.plan,
            "fact": pseudodata.touristflow.fact
        },
        tourist_dist: {
            "A": pseudodata.touristdist.A,
            "B": pseudodata.touristdist.B,
            "C": pseudodata.touristdist.C,
            "D": pseudodata.touristdist.D,
            "E": pseudodata.touristdist.E,
            "F": pseudodata.touristdist.F
        }
    };
    res.render('index', data);
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Post section
app.post('/make-report', jsonParser, async(req, res) => {
    await GCprepare();
    const msg = await GCmsg(promptBegin + `Поток туристов в Шерегеше: План: ${pseudodata.touristflow.plan}, Факт: ${pseudodata.touristflow.fact}. 
                                           Сделай вывод, и если факт меньше плана, то дай совет по развитию.` +
        ` Также представлено распределение туристов Шерегеша по секторам: A: ${pseudodata.touristdist.A}, 
                                           B: ${pseudodata.touristdist.B}, 
                                           C: ${pseudodata.touristdist.C}, 
                                           D: ${pseudodata.touristdist.D},
                                           E: ${pseudodata.touristdist.E}, 
                                           F: ${pseudodata.touristdist.F}.
                                           Что может помочь увеличить количество туристов в секторах с наименьшим числом туристов?`);
    console.log(msg);
    res.send(msg);
});

// App listen
const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, 511, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
})