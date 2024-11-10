const express = require('express');
const fs = require('fs');

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
    let rawdata = fs.readFileSync('./config/pseudodata.json');
    let pdata = JSON.parse(rawdata);
    const data = {
        tourist_dist: pdata.touristdist,
        tourist_flow: pdata.touristflow,
        investor_supply: pdata.investorsupply,
        build_readiness: pdata.buildreadiness,
        room_fund: pdata.roomfund
    };
    res.render('index', data);
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Post section
app.post('/make-report', jsonParser, async(req, res) => {
    await GCprepare();
    const msg = await GCmsg(promptBegin + `Поток туристов в Шерегеше: План: ${pdata.touristflow.plan}, Факт: ${pdata.touristflow.fact}. 
                                           Сделай вывод, и если факт меньше плана, то дай совет по развитию.` +
        ` Также представлено распределение туристов Шерегеша по секторам: A: ${pdata.touristdist.A}, 
                                           B: ${pdata.touristdist.B}, 
                                           C: ${pdata.touristdist.C}, 
                                           D: ${pdata.touristdist.D},
                                           E: ${pdata.touristdist.E}, 
                                           F: ${pdata.touristdist.F}.
                                           Что может помочь увеличить количество туристов в секторах с наименьшим числом туристов?`);

    const pdf = await PdfDocument.fromHtml("<h1>Testing</h1>");
    await pdf.saveAs("pdf-from-html.pdf");
});

// App listen
const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, 511, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
})