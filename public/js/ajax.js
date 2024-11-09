// Турпоток
const formreport = document.getElementById("form-report");
formreport.addEventListener("submit", async(e) => {
    e.preventDefault();
    document.getElementById("report-response").innerHTML = `<img width = "20" height = "20" src = "/img/loading-gif.gif"></>`;
    // Данные для отправки
    const response = await fetch("/make-report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })

    const responseText = await response.text();
    console.log(responseText);
    document.getElementById("report-response").innerHTML = responseText;
});