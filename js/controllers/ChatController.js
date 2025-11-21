const CHAT_DEBUG = false;

const NODE_API_URL = "http://localhost:3000/gerar"; // rota do backend
export default function chatbot() {
  const chatButton = document.getElementById("chat-button");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatMessages = document.getElementById("chat-messages");

  if (chatButton && chatWidget && closeChat) {
    chatButton.addEventListener("click", () => {
      chatWidget.classList.toggle("hidden");
      if (!chatWidget.classList.contains("hidden") && chatInput) {
        setTimeout(() => chatInput.focus(), 0);
      }
    });

     let isFirstMessage = false; // Flag para simular contexto

    closeChat.addEventListener("click", () => {
      chatWidget.classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !chatWidget.classList.contains("hidden")) {
        chatWidget.classList.add("hidden");
      }
    });

    if (chatInput && sendBtn && chatMessages) {
      function addMessage(text, who = "user") {
        const div = document.createElement("div");
        div.className =
          (who === "user" ? "msg-user" : "msg-bot") + " msg-animated";

        if (who === "msg-bot") {
          div.innerHTML = text;
        } else {
          div.textContent = text;
        }

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
      }

      function showTyping() {
        const typing = document.createElement("div");
        typing.className = "typing-indicator msg-animated";
        typing.innerHTML = "<span></span><span></span><span></span>";
        chatMessages.appendChild(typing);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typing;
      }

      async function handleSend() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        addMessage(userText, "user");
        chatInput.value = "";
        chatInput.disabled = true;

        const typingDiv = showTyping();

        try {
          
          const promptAddon = isFirstMessage
            ? " Não se apresente, a conversa já está em andamento, aja como se a conversa já tivesse um contexto, sem incluir palavras como oi, olá, tudo bem?."
            : "";

          const response = await fetch(NODE_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userText + promptAddon }),
          });

          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
          }

          const data = await response.json();
          typingDiv.remove();

          const botResponseText =
            data.response ||
            "Desculpe, não consegui obter uma resposta do servidor.";

          addMessage(botResponseText, "msg-bot");

          isFirstMessage = true; // Marca a simulação de contexto
        } catch (error) {
          typingDiv.remove();
          console.error("Erro na comunicação com o backend:", error);
          addMessage(
            "Ops! Houve um erro de conexão. Tente novamente mais tarde.",
            "msg-bot"
          );
        } finally {
          chatInput.disabled = false;
          chatInput.focus();
        }
      }

      sendBtn.addEventListener("click", handleSend);
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSend();
        }
      });

      setTimeout(() => {
        addMessage(
          "Olá! Sou seu assistente virtual. Em que posso te ajudar hoje?",
          "msg-bot"
        );
      }, 1000);
    }
  }
}
