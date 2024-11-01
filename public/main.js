document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const responseArea = document.getElementById("responseArea");

    // Clear previous response
    responseArea.innerHTML = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        responseArea.innerHTML = `<p><strong>Response:</strong> ${data.response}</p>`;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        responseArea.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
