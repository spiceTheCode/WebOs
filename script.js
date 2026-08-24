console.log("working");

const header = document.getElementById("header");
const closeFirstSlideBtn = document.getElementById("closeFirstSlideBtn");
const closeLedgerSlideBtn = document.getElementById("closeLedgerSlideBtn");
const desktopBtn = document.getElementById("deskBtn");
const ledgerBtn = document.getElementById("noteBtn");
const firstWindow = document.getElementById("firstWindow");
const ledgerSlide = document.getElementById("ledgerSlide");

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
    } else {
        element.classList.add("selected");
    }
}

closeFirstSlideBtn.addEventListener("click", ()=>closeWindow(firstWindow));
closeLedgerSlideBtn.addEventListener("click", ()=>{
    closeWindow(ledgerSlide);
    selectedBtn(ledgerBtn);
});
desktopBtn.addEventListener("click", ()=>openWindow(firstWindow));
ledgerBtn.addEventListener("click", ()=>{
    openWindow(ledgerSlide);
    selectedBtn(ledgerBtn);
});

addTopHandling(firstWindow);
addTopHandling(ledgerSlide);
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

function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeTest = document.querySelector("#timeSpan");
    timeTest.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

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