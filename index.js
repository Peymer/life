var gen = {
    "g": 0,
    "pole": [[],
    [],
    []]
};
const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(gen)
};
/// test
var sizeX = 10, sizeY = 10;

var Generation = 0;

const generationHTML = document.getElementById("Generation")
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var lenX = canvas.width / sizeX;
var lenY = canvas.height / sizeY;
// netOnCanvas(ctx);


var pole = init(sizeX, sizeY)
generationHTML.innerText = Generation++;
drawOnCanvas(ctx, pole)

/// test
let response = await fetch("http://127.0.0.1:5555/Life", options);
if (response.ok) {
    gen = response.json();
    drawOnCanvas(ctx, gen);
}
else
    document.body.append("Ошибка HTTP: " + response.status);




function Next() {
    generationHTML.innerText = Generation++;
    pole = init(sizeX, sizeY)

    drawOnCanvas(ctx, pole)
}


// Рисует жителя в клетке (x,y)
function drawСitizen(x, y, r = Math.min(lenX / 2, lenY / 2)) {
    let C = calcCenter(x, y)
    ctx.beginPath();
    ctx.arc(C.x, C.y, r, 0, 2 * Math.PI);
    ctx.fill();
}

// вычисляет координаты центра окружности в клетке (x,y)
function calcCenter(x, y) {
    let center = {
        "x": x * lenX + lenX / 2,
        "y": y * lenY + lenY / 2
    };
    return center;
}

//выводит все pole на canvas
function drawOnCanvas(ctx, gen) {
    netOnCanvas(ctx)
    let x = 0;
    gen.forEach(el => {
        let y = 0;
        el.forEach(cit => {
            if (cit)
                drawСitizen(x, y++);
            else y++;
        })
        x++;
    });
}

//рисует сетку
function netOnCanvas(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.beginPath();

    for (let i = 0; i < sizeX; i++) {
        ctx.moveTo((i + 1) * lenX, 0);
        ctx.lineTo((i + 1) * lenX, canvas.height);
        // ctx.stroke();
    }
    for (let j = 0; j < sizeY; j++) {
        ctx.moveTo(0, (j + 1) * lenY);
        ctx.lineTo(canvas.width, (j + 1) * lenY);
        // ctx.stroke();
    }
    ctx.stroke();
}

// Случайным образо заполняет pole
function init(statX, startY) {
    let pole = [];
    for (let i = 0; i < sizeX; i++) {
        let s1 = [];
        for (let j = 0; j < sizeY; j++)
            s1.push(Math.random() < 0.3 ? 1 : 0);
        pole.push(s1);
    }
    return pole;
}

