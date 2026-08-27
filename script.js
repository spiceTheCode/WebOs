console.log("working");

const timeTest = document.querySelector("#timeSpan");
const lockTimeTest = document.querySelector("#lockTime");
const header = document.getElementById("header");
const lockScreen = document.getElementById("lockScreen");
const closeFirstSlideBtn = document.getElementById("closeFirstSlideBtn");
const closeLedgerSlideBtn = document.getElementById("closeLedgerSlideBtn");
const closeClockSlideBtn = document.getElementById("closeClockSlideBtn");
const desktopBtn = document.getElementById("deskBtn");
const ledgerBtn = document.getElementById("noteBtn");
const clockBtn = document.getElementById("clockBtn");
const firstWindow = document.getElementById("firstWindow");
const ledgerSlide = document.getElementById("ledgerSlide");
const clockSlide = document.getElementById("clockSlide");

var selectedProp = true; 

function closeWindow(element) {
    element.style.visibility="hidden";   
}
function openWindow(element) {
    element.style.visibility = "visible";
    biggestIndex++;
    element.style.zIndex=biggestIndex;
    header.style.zIndex=biggestIndex+1;
}
function selectedBtn(element) {
    if (element.classList.contains("selected")) {
        element.classList.remove("selected");
    } else if(selectedProp){
        element.classList.add("selected");
    }
}

closeFirstSlideBtn.addEventListener("click", ()=>closeWindow(firstWindow));
closeClockSlideBtn.addEventListener("click", ()=>{
    closeWindow(clockSlide)
    selectedBtn(clockBtn);
})
closeLedgerSlideBtn.addEventListener("click", ()=>{
    closeWindow(ledgerSlide);
    selectedBtn(ledgerBtn);
});


desktopBtn.addEventListener("click", ()=>openWindow(firstWindow));
ledgerBtn.addEventListener("click", ()=>{
    openWindow(ledgerSlide);
    selectedBtn(ledgerBtn);
});
clockBtn.addEventListener("click", ()=>{
    selectedProp=true;
    openWindow(clockSlide);
    selectedBtn(clockBtn);
});
timeTest.addEventListener("click", ()=>{
    selectedProp=false;
    openWindow(clockSlide);
});


window.addEventListener("keydown",(event)=>{
    if (event.key === "ArrowUp") {
        lockScreen.classList.add("moveUp");
    }
})

//drag handling
addTopHandling(firstWindow);
addTopHandling(ledgerSlide);
addTopHandling(clockSlide);
dragElement(firstWindow);
dragElement(ledgerSlide);

function dragElement(elemnt) {
    var pos1=0, pos2=0, pos3=0, pos4=0;
    if(document.getElementById(elemnt.id+"Header")){
        document.getElementById(elemnt.id+"Header").onmousedown=dragMouseDown;
    }else{
        elemnt.onmousedown=dragMouseDown;
    }

    function dragMouseDown(e){
        e=e||window.event;
        e.preventDefault();
        pos3= e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e||window.event;
        e.preventDefault();
        pos1=pos3-e.clientX;
        pos2 = pos4-e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elemnt.style.top = (elemnt.offsetTop - pos2)+"px";
        elemnt.style.left = (elemnt.offsetLeft - pos1)+"px";
    }

    function closeDragElement() {
        document.onmouseup=null;
        document.onmousemove=null;
    }
}

//api handling
const quotePlace = document.getElementById("quoteSpan");
const emojiPlace = document.getElementById("emojiSpan");
async function getEmoQuo() {
    const quoteResponse = await fetch("https://dummyjson.com/quotes/random");
    const quoteData = await quoteResponse.json();
    console.log(quoteData);
    console.log(quoteResponse);
    quotePlace.innerHTML = quoteData.quote + " - " + quoteData.author;
    const response = await fetch("https://api.emojisworld.fr/v1/random?&limit=1");
    const data = await response.json();
    const emoji = data.results[0].emoji;
    emojiPlace.innerHTML = emoji;
}
getEmoQuo();

// slidePositionHandling
var biggestIndex=1;

function addTopHandling(element) {
    element.addEventListener("mousedown",()=> handleTop(element));
}

function handleTop(element) {
    biggestIndex++;
    element.style.zIndex=biggestIndex;
    header.style.zIndex=biggestIndex+1;
}

// ledger app logic
const departBtn = document.querySelector("#departBtn");
const table = document.querySelector("#ledgerTable");

function depart(button) {
    button.style.visibility="hidden";
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addGuest() {
    let name = prompt("What ye called?");
    let place = prompt("Where ye from?");
    let entry = prompt("When hath thee joined?");
    let exit = prompt("When shall thee departeth?");

    let newRow = table.insertRow(table.rows.length);

    newRow.insertCell(0).innerHTML=name;
    newRow.insertCell(1).innerHTML=place;
    newRow.insertCell(2).innerHTML=entry;
    newRow.insertCell(3).innerHTML=exit;
    newRow.insertCell(4).innerHTML='<p class="btn departBtn" onclick="depart(this)">Aye</p>';
}

//clock app logic
var htime=0;
var mtime=0;
var hrotation=0;
var mrotation=0;

const hour=document.querySelector("#hour");
const minute=document.querySelector("#minute");

function updateTime() {
    var date = new Date();
    var currentTime = date.toLocaleString();
    timeTest.innerHTML = currentTime;
    
    const d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    hrotation = htime*30 + mtime/2;
    mrotation = mtime*6;
    
    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`
    lockTimeTest.innerHTML = htime+":"+mtime;
}
setInterval(updateTime, 1000);