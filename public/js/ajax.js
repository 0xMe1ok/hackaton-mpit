// Турпоток
const touristflow = document.getElementById("tourist-flow");
touristflow.addEventListener("submit", async(e) => {
    e.preventDefault();
    // Данные для отправки
    const response = await fetch("/tourist-flow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })

    const responseText = await response.text();
    console.log(responseText);
    document.getElementById("tourist-flow-response").innerHTML = responseText;
});