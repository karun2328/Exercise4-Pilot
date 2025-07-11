function setToken(name) {
    const a = navigator.userAgent;
    let browser = "Unknown";

    if (a.includes("OPR") || a.includes("Opera")) browser = "Opera";
    else if (a.includes("Edg")) browser = "Edge";
    else if (a.includes("Firefox")) browser = "Firefox";
    else if (a.includes("Chrome")) browser = "Chrome";
    else if (a.includes("Safari")) browser = "Safari";

    return { user: name, browser: browser };
}

async function putToken(token) {
    try {
        await fetch('/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token)
        });
        console.log("Token sent to server:", token);
    } catch (error) {
        console.error("Error sending token:", error);
    }
}

async function getToken() {
    try {
        const response = await fetch('/token');
        if (!response.ok) throw new Error('fetch failed');
        const token = await response.json();
        console.log("Token received from server:", token);
        return token;
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
}

async function testToken() {
    const input = document.getElementById("nameInput");
    const name = input.value || "Anonymous";
    const token = setToken(name);

    await putToken(token);
    const received = await getToken();

    if (received) {
        document.getElementById("userInfo").textContent = `${received.user} (${received.browser})`;
        console.log("Full round-trip token:", received);
    } else {
        document.getElementById("userInfo").textContent = "Failed";
    }

    input.value = "";
}

document.getElementById("pingbtn").addEventListener("click", testToken);
