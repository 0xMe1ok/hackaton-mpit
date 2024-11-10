const express = require('express');
const PDFDocument = require('pdfkit');
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
    const data = pdata.tourists;
    res.render('index', data);
});

// Get section
app.get('/infrastructure', async(req, res) => {
    let rawdata = fs.readFileSync('./config/pseudodata.json');
    let pdata = JSON.parse(rawdata);
    const data = pdata.infrastructure;
    res.render('infrastructure', data);
});

app.get('/downloadPdf', async(req, res) => {
    console.log("Формирование отчета...");
    let rawdata = fs.readFileSync('./config/pseudodata.json');
    let pdata = JSON.parse(rawdata);
    await GCprepare();
    const msg = await GCmsg(promptBegin + `Поток туристов в Шерегеше: План: ${pdata.tourists.tourist_flow.plan}, Факт: ${pdata.tourists.tourist_flow.fact}. 
                                           Опиши текущую ситуацию по потоку туристов, если факт меньше плана, дай совет по 5 пунктам, как увеличить поток туристов.` +
        ` Также представлено распределение туристов Шерегеша по секторам: A: ${pdata.tourists.tourist_dist.A}, 
                                           B: ${pdata.tourists.tourist_dist.B}, 
                                           C: ${pdata.tourists.tourist_dist.C}, 
                                           D: ${pdata.tourists.tourist_dist.D},
                                           E: ${pdata.tourists.tourist_dist.E}, 
                                           F: ${pdata.tourists.tourist_dist.F}.` +
        ` Опиши тенденцию распределения туристов по секторам, если распределение неравномерное, предложи варианты решения.` +
        ` Также представлены данные по номермому фонду: 2021г - ${pdata.tourists.room_fund[2021]}, 2022г - ${pdata.tourists.room_fund[2022]}, 2023г - ${pdata.tourists.room_fund[2023]}.` +
        ` Опиши тенденцию по номерному фонду и предложи варианты решения.`);

    let pdfDoc = new PDFDocument;
    await pdfDoc.pipe(fs.createWriteStream('report.pdf'));
    await pdfDoc.font(`${__dirname}/public/fonts/Arial.ttf`)
    await pdfDoc.text(msg, { align: 'justify' })
    await pdfDoc.end();

    setTimeout(() => {
        console.log("Скачивание отчета...");
        res.download(__dirname + '/report.pdf', 'report.pdf');
    }, 1000);
});

// App listen
const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, 511, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
})