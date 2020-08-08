let ctx, canvas, cursor;
let pen = {
    x: 0,
    y: 0,
    click: false,
    color: 0,
    size: 12,
    colors: ["red", "green", "yellow", "blue", "white", "black"],

    getXpx() {
        return `${this.x}px`;
    },
    getYpx() {
        return `${this.y}px`;
    },
    getColor() {
        return this.colors[this.color];
    },
    getSizePx() {
        return `${this.size}px`;
    }
};

chrome.runtime.onMessage.addListener(function (request) {
    if (request.message === "change_status") {
        chrome.storage.local.get("status", data => {
            if (data.status === "disabled") {
                draw();
            } else {
                removeCanvas();
            }
        });
    }
},
);

function createCanvas() {

    document.body.classList.add("prepare-canvas");

    // add div for cursor
    cursor = document.createElement("div");
    cursor.id = "JustLines-cursor";
    cursor.classList.add("cursor");
    cursor.style.top = pen.getYpx();
    cursor.style.left = pen.getXpx();
    document.body.insertBefore(cursor, document.body.firstChild);

    // add canvas
    canvas = document.createElement("canvas");
    canvas.id = "JustLines-canvas";
    ctx = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.firstChild);

    resizeCanvas();
    setPen();

}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function removeCanvas() {
    if (canvas) {
        document.getElementById("JustLines-canvas").remove();
        document.getElementById("JustLines-cursor").remove();

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mousedown", mouseDownHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("keydown", keyDownHandler);
        document.removeEventListener("wheel", wheelHandler);

        document.body.classList.remove("prepare-canvas");
    }

    // change icon
    chrome.runtime.sendMessage({ cmd: "disabled" });
}

function wheelHandler(e) {
    e.preventDefault();

    if (e.shiftKey) {
        // change size
        if (e.deltaY > 0) {
            pen.size += 2;
        } else {
            pen.size -= 2;
        }

        if (pen.size < 3) {
            pen.size = 3;
        } else if (pen.size > 35) {
            pen.size = 35;
        }
    } else {
        // change color
        if (e.deltaY > 0) {
            pen.color += 1;
        } else {
            pen.color -= 1;
        }
        if (pen.color >= pen.colors.length) {
            pen.color = 0;
        } else if (pen.color < 0) {
            pen.color = pen.colors.length - 1;
        }
    }
    setPen();
}

function keyDownHandler(e) {
    e.preventDefault();
    if (e.key === ' ') {
        // clear draw
        resizeCanvas();
    } else if (e.key === "Escape") {
        // exit
        removeCanvas();
    }
};

function mouseDownHandler(e) {
    e.preventDefault();
    if (e.button === 0) {
        pen.click = true;
    }
}

function mouseUpHandler(e) {
    pen.click = false;
}

function mouseMoveHandler(e) {

    let lastX, lastY;

    pen.x = e.clientX;
    pen.y = e.clientY;

    cursor.style.top = pen.getYpx();
    cursor.style.left = pen.getXpx();

    if (pen.click) {
        if (pen.x === 0) {
            pen.x = lastX;
        } else if (pen.x > canvas.width) {
            pen.x = canvas.width;
        }

        if (pen.y === 0) {
            pen.y = lastY;
        } else if (pen.y > canvas.height) {
            pen.y = canvas.height;
        }

        ctx.lineTo(pen.x, pen.y);
        ctx.strokeStyle = pen.getColor();
        ctx.lineWidth = pen.size;
        ctx.stroke();
        lastX = pen.x;
        lastY = pen.y;
    } else {
        ctx.beginPath();
        ctx.moveTo(pen.x, pen.y);
    }
}

function setPen() {
    cursor.style.background = pen.getColor();
    cursor.style.width = pen.getSizePx();
    cursor.style.height = pen.getSizePx();
}

function draw() {

    createCanvas();

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousedown", mouseDownHandler, { passive: false });
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("keydown", keyDownHandler, { passive: false });
    document.addEventListener("wheel", wheelHandler, { passive: false });
    window.onresize = resizeCanvas();

    // change icon
    chrome.runtime.sendMessage({ cmd: "enabled" });
}
