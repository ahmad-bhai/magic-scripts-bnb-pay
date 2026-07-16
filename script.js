// Global variables aur style elements apply karna
var dia = document.querySelectorAll("dialog");
if (dia.length) {
    dia.forEach(d => d.innerHTML = "");
}

var styleElem = document.head.appendChild(document.createElement("style"));
styleElem.innerHTML = "dialog::backdrop {background: #181a20} ::selection {background: #eab20c;color:white}";

// Loader screen create karna
var loader = document.createElement("dialog");
document.body.appendChild(loader);
loader.innerHTML = "<div style='font-family:sans-serif;color:#333;'>PLEASE WAIT...</div>";
loader.style = "border:none;outline:none;margin:auto;padding:1rem;background:#fff;";

function showLoader() {
    loader.showModal();
    setTimeout(() => hideLoader(), 8000);
}
var hideLoader = () => {
    try { loader.close(); } catch(e) {}
};

showLoader();

// =================== UID (CID) & STORAGE LOGIC ===================  
let cid = localStorage.getItem("ahmad_script_uid");

if (cid) {
    verifyDevice(cid);
} else {
    // Agar local storage me dynamic crypto ID nahi hai toh generate karein
    cid = self.crypto.getRandomValues(new BigUint64Array(1))[0].toString();
    localStorage.setItem("ahmad_script_uid", cid);
    hideLoader();
    SETITEM(cid);
}

// =================== VERIFICATION LOGIC ===================  
function verifyDevice(idToVerify) {
    fetch(`https://ahmad-bhai-codes-shop.vercel.app/f?id=${idToVerify}`)
    .then(res => res.text())
    .then(data => {
        hideLoader();
        if (data.trim() === "F") {
            executeMainScript();
        } else {
            SETITEM(idToVerify);
        }
    })
    .catch(() => {
        hideLoader();
        alert("Server connection failed!");
    });
}

// =================== LOCK UI DIALOG (WHITE BOX) ===================  
function SETITEM(cid) {
    var myDialog = document.createElement("dialog");
    document.body.appendChild(myDialog);
    myDialog.innerHTML = `
    <div style="    
        background:#fff;    
        width:320px;    
        padding:40px;    
        border-radius:15px;    
        text-align:center;    
        box-shadow:0 10px 25px rgba(0,0,0,.45);    
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;    
    ">
        <img src="https://magic-scripts-bnb-pay.vercel.app/bnb.png"    
            style="width:70px;height:70px;display:block;margin:0 auto 15px;">    

        <div style="    
            color:#222;    
            font-size:24px;    
            font-weight:700;    
            margin-bottom:8px;    
        ">    
            ACCESS LOCKED    
        </div>    

        <div style="    
            color:#666;    
            font-size:13px;    
            margin-bottom:15px;    
        ">    
            Your device is not authorized.    
        </div>    

        <div style="    
            background:#f8fafc;    
            color:#334155;    
            padding:12px;    
            border-radius:10px;    
            border:1px dashed #eab20c;    
            font-family:monospace;    
            font-size:14px;    
            word-break:break-all;    
            margin-bottom:20px;    
        ">    
            ${cid}    
        </div>    

        <div style="    
            text-align:left;    
            font-size:14px;    
            color:#444;    
            line-height:1.7;    
            border-top:1px solid #eee;    
            padding-top:15px;    
            margin-bottom:18px;    
        ">    
            <b>Telegram:</b>    
            <span style="color:#eab20c;">@Magic_Scripts</span>    
        </div>    

        <button onclick="location.reload()" style="    
            width:100%;    
            background:#eab20c;    
            color:#fff;    
            border:none;    
            padding:12px;    
            border-radius:10px;    
            font-size:15px;    
            font-weight:700;    
            cursor:pointer;    
        ">    
            RETRY 🔄    
        </button>    

        <div style="    
            margin-top:18px;    
            padding-top:15px;    
            border-top:1px solid #eee;    
            font-size:12px;    
            color:#888;    
        ">    
            🟡 Developed By @Magic_Scripts 🟡    
        </div>
    </div>`;

    myDialog.style = `    
        padding:0;    
        border:none;    
        outline:none;    
        margin:auto;    
        background:transparent;    
        border-radius:15px;    
        overflow:hidden;    
        box-shadow:none;    
        max-width:none;    
    `;    
    myDialog.showModal();    
}

// =================== MAIN SCRIPT (Ahmad Bhai's Time & Controls) ===================  
function executeMainScript() {
    const boxElement = document.querySelector("#box");
    if (boxElement) {
        boxElement.style.display = "block";
        boxElement.contentEditable = true;
    }

    // Time Logic (Local Time aur UTC Time syncing)
    const updateTime = () => {
        const time = new Date().toLocaleTimeString("en", { timeStyle: 'short' });
        
        const receivedTimeElement = document.querySelector(".receivedTime");
        if (receivedTimeElement) receivedTimeElement.innerHTML = time;

        const timeElement = document.querySelector(".time");
        if (timeElement) timeElement.innerHTML = time.replace(/\s|PM|AM/g, "");

        const utcTime = new Date();    
        const formatted = utcTime.toISOString().replace('T', ' ').slice(0, 19);    

        const innerTime2Element = document.querySelector(".innerTime2");
        if (innerTime2Element) innerTime2Element.innerHTML = formatted + "(UTC)";

        const innerTime1Element = document.querySelector(".innerTime1");
        if (innerTime1Element) innerTime1Element.innerHTML = formatted;
    };
    updateTime();

// --- Box Setup ---
        const box = document.querySelector("#box");
        if(box) box.contentEditable = true;
 
    // Screenshot/Download System (With CORS fix for Background Images)
    const btn = document.querySelector(".btn");
    if (btn) {
        btn.addEventListener("click", () => {    
            document.body.contentEditable = false;   
            if (boxElement) {
                // html2canvas settings ko update kiya taaki external background images load ho sakein
                html2canvas(boxElement, {
                    useCORS: true,      // External/Cross-Origin images load karne ke liye
                    allowTaint: false,  // Security sandbox allow karne ke liye
                    logging: false      // Console ko saaf rakhne ke liye
                }).then(canvas => {    
                    let a = document.createElement("a");    
                    a.download = `SS-${Date.now()}.png`;    
                    a.href = canvas.toDataURL("image/png");    
                    a.click();    
                    document.body.contentEditable = true;
                }).catch(err => {
                    console.error("Screenshot error:", err);
                    document.body.contentEditable = true;
                });    
            }
        });
    }

    // Battery Control Logic
    const batteryInput = document.querySelector("input");
    const batteryFill = document.querySelector(".battery2");
    
    if (batteryInput && batteryFill) {
        const setBatteryWidth = () => {
            batteryFill.style.width = `${Number(batteryInput.value) * 25 / 100}px`;
        };
        
        // Initial setup on load
        setBatteryWidth();
        // Listener on change
        batteryInput.onchange = setBatteryWidth;
    }

    console.log("App Unlocked: All systems active.");
}
