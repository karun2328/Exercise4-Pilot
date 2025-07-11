function setToken(name){
    const a = navigator.userAgent;
    let browser = "chrome";
    if(a.includes("Safari")&& !a.includes("Chrome")){
        browser="Safari";
    }
    return { user:name, browser: browser};
}

async function putToken(token) {
    try{
        await fetch('/token',{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(token)
        });
        console.log("Token sent to server:", token);
    }catch(error){
        console.log("Error sending token:",error);
    }
}

async function getToken() {
    try{
        const response=await fetch('/token');
        if(!response.ok)throw new Error('fetch failed');
        const token =await response.json();
        console.log("Token received from server:",token);
        return token;
    }catch (error){
        console.error("Error fetching token:",error);
        return null;
    }
}

async function testToken() {
    const name = document.getElementById("nameInput").value || "Anonymous";
    const token = setToken(name);
    await putToken(token);
    const received = await getToken();
    console.log("Full round-trip token:", received);
    document.getElementById("pingbtn").textContent = `Last: ${received.user} (${received.browser})`;
}
document.getElementById("pingbtn").addEventListener("click", testToken);

