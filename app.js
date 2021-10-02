const makeDraggable = (element) => {
    let draggable;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (element.className.includes("toolbar")) {
        draggable = element.parentNode;
    } else {
        draggable = element;
    }

    const stopMouseDrag = () => {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    const mouseDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (!draggable.maxed) {
            draggable.style.left = (draggable.offsetLeft - pos1) + "px";
            draggable.style.top = (draggable.offsetTop - pos2) + "px";
        } 
    }

    const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmousemove = mouseDrag;
        document.onmouseup = stopMouseDrag;
    }

    element.onmousedown = dragMouseDown;
}

const draggables = document.getElementsByClassName("draggable");
for (let element of draggables) {
    makeDraggable(element);
}

const clickables = document.getElementsByClassName("clickable");
for (let element of clickables) {
    element.addEventListener("dblclick", () => {
        document.getElementById(element.getAttribute("data-window")).style.display = "block";
    })
    element.addEventListener("touchstart", () => {
        document.getElementById(element.getAttribute("data-window")).style.display = "block";
    })
}

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

