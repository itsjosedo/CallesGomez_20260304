let maxLeft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta = 0;

let drag = false;
let targ = null;
let offsetX = 0;
let offsetY = 0;
let originalX = 0;
let originalY = 0;

let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
];

window.onload = function () {
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
};

function sensorClick() {
    if (Date.now() - timeDelta < 150) {
        createPopUp(this);
    }
}

function createPopUp(parent) {
    let p = document.getElementById("popup");
    if (p) {
        p.parentNode.removeChild(p);
    }

    let popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup";
    popup.style.position = "absolute";
    popup.style.top = (parent.offsetTop - 40) + "px";
    popup.style.left = (parent.offsetLeft + 10) + "px";

    let text = document.createElement("span");
    text.textContent = "Árbol " + parent.id;
    popup.appendChild(text);

    let map = document.getElementsByClassName("map")[0];
    map.appendChild(popup);
}

function baseOnLoad() {
    let map = document.getElementsByClassName("map")[0];
    let base = document.getElementsByClassName("base")[0];

    // Asegurar que el contenedor tenga posición relativa
    map.style.position = "relative";

    maxLeft = base.clientWidth - 80;
    maxTop = base.clientHeight - 80;

    for (let i = 0; i < 6; i++) {
        let sensor = document.createElement("img");
        sensor.src = imgs[i % imgs.length];
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = false;
        sensor.classList.add("Sensor");
        sensor.classList.add("dragme");
        sensor.style.position = "absolute";
        sensor.style.left = `${Math.floor(Math.random() * maxLeft)}px`;
        sensor.style.top = `${Math.floor(Math.random() * maxTop)}px`;
        sensor.style.width = "80px";
        sensor.style.cursor = "move";
        sensor.onclick = sensorClick;

        map.appendChild(sensor);
    }
}

function startDrag(e) {
    timeDelta = Date.now();

    if (!e) {
        e = window.event;
    }

    if (e.preventDefault) {
        e.preventDefault();
    }

    targ = e.target ? e.target : e.srcElement;

    if (!targ.classList.contains("dragme")) {
        return;
    }

    originalX = parseInt(targ.style.left) || 0;
    originalY = parseInt(targ.style.top) || 0;

    offsetX = e.clientX - originalX;
    offsetY = e.clientY - originalY;

    drag = true;
    document.onmousemove = dragDiv;

    return false;
}

function dragDiv(e) {
    if (!drag) {
        return;
    }

    if (!e) {
        e = window.event;
    }

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    if (newLeft < minLeft) newLeft = minLeft;
    if (newLeft > maxLeft) newLeft = maxLeft;

    if (newTop < minTop) newTop = minTop;
    if (newTop > maxTop) newTop = maxTop;

    targ.style.left = newLeft + "px";
    targ.style.top = newTop + "px";

    return false;
}

function stopDrag() {
    if (!drag) {
        return;
    }

    if (Date.now() - timeDelta > 150) {
        let p = document.getElementById("popup");
        if (p) {
            p.parentNode.removeChild(p);
        }
    }

    drag = false;
    document.onmousemove = null;
}