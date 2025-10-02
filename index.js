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

let response = await fetch("http://127.0.0.1:5555/Life", options);
if (response.ok) {
    gen = response.json();
    drawOnCanvas(ctx, gen);
}
else
    document.body.append("Ошибка HTTP: " + response.status);

function netOnCanvas(ctx) {
    for (let i = 0; i < sizeX; i++) {
        ctx.moveTo(i * lenY, 0);
        ctx.lineTo(i * lenY, ctx.height);
    }
    for (let j = 0; j < sizeY; j++) {
        ctx.moveTo(0, j * lenX);
        ctx.lineTo(ctx.width, j * lenX);
    }
    ctx.stroke();
}

//выводит все pole на канвас
function drawOnCanvas(ctx, gen) {
    let x = 0;
    gen.forEach(el => {
        let y = 0;
        el.forEach(sit => {
            let C = calcCenter(ctx, x, y); // объект из двух координат
            ctx.beginPath();
            ctx.arc(C.x, C.y, lenX / 2, 0, 2 * Math.PI);
            stx.fill();
            y++;
        })
        x++;
    });
}

function init(statX, startY) {
    let pole = [];
    for (let i = 0; i < sizeX; i++) {
        let s1 = [];
        for (let j = 0; j < sizeY; j++)
            s1.push(Math.random() < 0.5 ? 1 : 0);
        s.push(s1);
    }
    return s;
}


var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");
var lenX = ctx.width / sixeX;
var lenY = ctx.height / sizeY;


