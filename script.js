console.log("working");

const closeBtn = document.getElementById("closeBtn");
const desktopBtn = document.getElementById("deskBtn");
const firstWindow = document.getElementById("firstWindow");

function closeWindow(element) {
    element.style.visibility="hidden";   
}
function openWindow(element) {
    element.style.visibility = "visible";
}

closeBtn.addEventListener("click", ()=>closeWindow(firstWindow));
desktopBtn.addEventListener("click", ()=>openWindow(firstWindow));


dragElement(firstWindow);

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