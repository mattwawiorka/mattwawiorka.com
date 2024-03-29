/*
*   NEW WORK
****************************************************/

let DESKTOP_ICON_COUNT = 0;
let START_LEFT = 24;
let START_TOP = 24;


function Draggable(element = null, left = START_LEFT, top = START_TOP, toolbar = false) {
    this.element = element ?? document.createElement('div');

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';

    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;

    if (toolbar) {
        this.element.children[0].onmousedown = this.mouseDown.bind(this); // Need to bind to Draggable, otherwise this = the element
    } else {
        this.element.onmousedown = this.mouseDown.bind(this);
    }
}

Draggable.prototype.stopDrag = function() {
    document.onmouseup = null;
    document.onmousemove = null;
}

Draggable.prototype.mouseDrag = function(e) {
    e = e || window.event;
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    this.element.style.left = (this.element.offsetLeft - this.pos1) + "px"
    this.element.style.top = (this.element.offsetTop - this.pos2) + "px"
}

Draggable.prototype.mouseDown = function(e) {
    e = e || window.event;
    e.preventDefault();
    console.log(this)
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmousemove = (e) => {
        this.mouseDrag(e)
    };
    document.onmouseup = this.stopDrag;
}

function DesktopIcon(image, text, dataWindow, left, top) {
    Draggable.call(this, null, left, top);

    const imageElem = document.createElement('img');
    const p = document.createElement('p');

    this.element.setAttribute('class', 'desktop-icon');

    imageElem.setAttribute('src', "images/" + image + ".png");
    this.element.appendChild(imageElem)

    p.innerHTML = text;
    this.element.appendChild(p)

    // Add to DOM
    document.getElementById('home').appendChild(this.element)

    // Make DesktopIcon clickable
    this.element.dataWindow = dataWindow;

    console.log(this.element)

    this.element.addEventListener("dblclick", () => {
        document.getElementById(this.element.dataWindow).style.display = "block";
    })
    this.element.addEventListener("touchstart", () => {
        document.getElementById(this.element.dataWindow).style.display = "block";
    })

    START_LEFT += 160;
    if (DESKTOP_ICON_COUNT % 3 > 1) {
        START_LEFT = 24;
        START_TOP += 160;
    }
    DESKTOP_ICON_COUNT++;
}

Object.setPrototypeOf(DesktopIcon.prototype, Draggable.prototype)

const test = new DesktopIcon("folder", "projects", "projects");

const projectsWindow = new Draggable(document.getElementById("projects"), 200, 200, true);

/*
*   OLD WORK
****************************************************/

// const clickables = document.getElementsByClassName("clickable");
// for (let element of clickables) {
//     element.addEventListener("dblclick", () => {
//         document.getElementById(element.getAttribute("data-window")).style.display = "block";
//     })
//     element.addEventListener("touchstart", () => {
//         document.getElementById(element.getAttribute("data-window")).style.display = "block";
//     })
// }

const x_buttons = document.getElementsByClassName("x-btn");
for (let element of x_buttons) {
    element.addEventListener("click", () => {
        document.getElementById(element.getAttribute("data-window")).style.display = "none";
    })
}

const max_buttons = document.getElementsByClassName("max-btn");
for (let element of max_buttons) {
    let window = document.getElementById(element.getAttribute("data-window"));
    window.maxed = false;
    element.addEventListener("click", () => {
        if (!window.maxed) {
            window.style.transform = "translate(0%, 0%)";
            window.style.top = "0%";
            window.style.left = "0%";
            window.style.width = "100%";
            window.style.height = "95%";
            window.children[1].children[0].style.padding = "12px 20%";
            window.maxed = true;
        } else {
            window.style.transform = "translate(-50%, -50%)";
            window.style.top = "47%";
            window.style.left = "50%";
            window.style.width = "800px";
            window.style.height = "850px";
            window.children[1].children[0].style.padding = "12px 5%";
            window.maxed = false;
        }
    })
}

const start_button = document.getElementById("start-btn");
const start_menu = document.getElementById("start-menu");
start_menu.shown = false;
start_button.onclick = () => {
    if (start_menu.shown) {
        start_menu.shown = false;
        start_menu.style.display = "none";
    } else {
        start_menu.shown = true;
        start_menu.style.display = "block";
    }
}

document.getElementById("restart-btn").onclick = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("restart-warning").style.display = "block";
}

document.getElementById("restart-yes").onclick = () => {
    location.reload();
}

document.getElementById("restart-no").onclick = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("restart-warning").style.display = "none";
}

document.getElementById("power-btn").onclick = () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("shutdown-warning").style.display = "block";
}

document.getElementById("shutdown-yes").onclick = () => {
    close();
}

document.getElementById("shutdown-no").onclick = () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("shutdown-warning").style.display = "none";
}
