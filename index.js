const express = require('express');
const pseudodata = require('./config/pseudodata.json');

const clientKey = require('./config/gigachad.json').clientKey;
const promptBegin = require('./config/gigachad.json').promptBegin;
const GigaChat = require('gigachat-node').GigaChat;

const client = new GigaChat(
    clientSecretKey = clientKey,
    isIgnoreTSL = true,
    isPersonal = true,
    autoRefreshToken = true
);
client.createToken();

const app = express();
const jsonParser = express.json();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// GigaChat section
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

// Get section
app.get('/', (req, res) => {
    const data = {
        tourist_flow: {
            "plan": pseudodata.touristflow.plan,
            "fact": pseudodata.touristflow.fact
        }
    };
    res.render('index', data);
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Post section
app.post('/tourist-flow', jsonParser, async(req, res) => {
    await GCprepare();
    const msg = await GCmsg(promptBegin + `Поток туристов в Шерегеше: План: ${pseudodata.touristflow.plan}, Факт: ${pseudodata.touristflow.fact}`);
    console.log(msg);
    res.send(msg);
});

// App listen
const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, 511, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
})