//POS IMGS
let maxLeft;
let maxTop;
const minLeft=0;
const minTop = 0;
let timeDelta;

//RUTA DE IMAGENES
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
]
//CORDENADAS   
var orignalX;
var orignalY;

window.onload = function(){
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick(){
    if(Date.now() - timeDelta < 150) {//Verifcar que no hemos arrastrado
        createPopUp();
    }
}

//La funcioj createpop() se ejecuta cuando el usuario ejecuta un evennto ejemplo tipo click
function createPopUp(parent){
    let p = document.getElementById("popup");
    if(p){
        p.parentNode.removeChild(p);
    }

    //SE CREA UN ELEMENTO EN EJECUCION JAVASCRIPT
    let popup = document.createElement("div")
    popup.id = "popup" 
    popup.className = "popup"
    popup.style.top = parent.y - 110 + "px";
    popup.style.left = parent.x - 75 + "px";
    
    //SE CREA UN ELEMENTO EN EJECUÓN DE JAVASCRIPT
    let text = document.createElement("span"); //elemento a crear
    text.textContent = parent.id; //contenido dek span 
    popup.appendChild(text); // se ancla el span al div que fue creado anteriormente

    var map = document.getElementsByClassName("map") //Se obtiene las propiedades del div que posse el class "map"
    map.appendChild(popup); //Se ancla el objeto con class="map" al div popup
}

//Esta funcion se ejecuta al cargar el HTML
function baseOnLoad(){
    var map = document.getElementsByClassName("map")[0]; //se obtiene el elemento map del html
    let base = document.getElementsByClassName("base")[0]; //se obtiene el elemento base del html
    maxLeft = base.width = -50; //se establece un espacio maximo para la posicion de la izquierda
    maxTop = base.top - 50; //se establece un espacio maximo para la posicion del top

    for(let i = 0; i < 6; i++){
        //CREA UN NUEVO ELEMENTO EN EJECUCION JS
        let sensor = document.createElement("img"); //el elemento es un <img>
        sensor.src = imgs[i % imgs.length] //la url de la ultima posicion del array img[] que fue establecida
        sensor.alt = i; //el texto alterno en caso que la url sea invalida
        sensor.id = i; //el id del elemento <img id=id>
        sensor.draggable = true; //propiedad draaggable activa
        sensor.classList.add("Sensor"); //se agrega a un arreglo de eventos o elementos
        sensor.classList.add("dragme"); //se agrega a un arreglo de eventos o elementos
        sensor.style.left = `${Math.floor(Math.random()*900)}px`; //se establece un valor aleatorio entre 0 y 900 px
        sensor.style.top = `${Math.floor(Math.random()*500)}px`; //se establece un valor aleatorio entre 0 y 900 px
        sensor.onclick = sensorClick; //Se eejcuta el evento click

        let parent = document.getElementsByClassName("map")[0]; //Se heredan los atributos del div "map"
        parent.appendChild(sensor) //Se ancla el elemento sensor (img) al elemento "map"
    }
}

function startDrag(){
    timeDelta = Date.now() //Obtiene la fecha y hora actual
    if(!e){ //Si no hay evento
        var e = window.event; //Se crea un evento
    }
    if(e.preventDefault){ //Si se ha detectado la ejecuón
        e.preventDefault(); //que siga detenido por que problamente si este el evento drag
    }
    targ = e.target ? e.target : e.srcElement; //Se obtiene la ultima posicion
    orignalX = targ.style.left; //Se establce la posicion x origial para ser moifcado en el porceso de arrastrado
    orignalY = targ.style.top; //Se establce la posicion y origial para ser moifcado en el porceso de arrastrado

    if(!targ.classList.contains("dragme")){
        return;
    }

    //Se obtiene el valor entero de las ñosiciones left y top
    offsetX = e.clientX;
    offsetY = e.clientY;

    drag = true;

    document.onmousemove = dradDiv; //Mover el elemento en el mousemove 
    return false;
}

function dradDiv(e){
    if(!Drag){//Si no ha sifo movido
        return; //sE FINALIZA LA EJECUCIÓN
    }
    if(!e){//Si no existe ningun evento
        e = window.event; //Se agrega un evento
    }

    let newLeft = coordX + e.clientX - offsetY; //Se calcula la nueva ubicacion de la posicion
    if(newLeft < maxLeft && newLeft>minLeft){
        targ.style.left = newLeft + 'px'; // SE cambia la nueva ubbicación que fue calculada antes
    }

    let newTop = coordY + e.clientY - offsetY;
    if(newTop <maxTop && newTop > minTop){
        targ.style.top = newTop + 'px';
    }

    return false;
}

function stopDrag(){
    if(typeof drag == "undefined"){ //Si se desconoce que existe un evento de tipo "Dragable"
        return; //Se finaliza la ejecuón del evento previo
    }

    if(Drag){
        if(Date.now() - timeDelta > 150){
            let p = document.getElementById("popup");
            if(p){
                p.parentNode.removeChild(p);
            }
        }else{
        targ.style.left = orignalX;
        targ.style.top = orignalY;
        }
    }
    drag = false;
}