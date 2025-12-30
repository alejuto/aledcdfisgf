function addNumber(num) {
    const pinInput = document.getElementById("pin");
    if (pinInput.value.length < 8) {
        pinInput.value += num;
    }
}

function clearPin() {
    document.getElementById("pin").value = "";
}

function verificar() {
    const pin = document.getElementById("pin").value;
    
    // Cambia este número por tu fecha especial (ejemplo: 29092025)
    if (pin === "29092025") {
        document.querySelector(".glass-box").style.borderColor = "#00ffcc";
        setTimeout(() => {
            window.location.href = "inicio.html";
        }, 500);
    } else {
        alert("PIN incorrecto, mi cielo. Intenta de nuevo 💖");
        clearPin();
    }
}