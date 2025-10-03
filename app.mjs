let sizeX = 10, sizeY = 10

function init(sizeX, sizeY, random = true) {
    let pole = []

    for (let i = 0; i < sizeX; i++) {
        let p1 = [], ss1 = []
        for (let j = 0; j < sizeY; j++) {
            if (random)
                p1.push(Math.random() < 0.5 ? 0 : 1)
            else
                p1.push(0)
        }
        pole.push(p1)
    }
    // pole[1][2] = 1
    // pole[2][2] = 1
    // pole[3][2] = 1
    // pole[3][3] = 1
    // pole[2][4] = 1
    return pole
}

function show(pole) {
    let i = 0
    let j = 0
    let str = "   "
    for (let j = 0; j < sizeY; j++)
        str += `${j} `
    console.log(str)
    pole.forEach((p) => {
        let str = ""
        p.forEach((l) => {
            str += `${l} `
        })
        console.log(`${i++}:`, str)
    })
}

function coord(x, size) {
    let res = x
    if (x < 0)
        res = size - 1
    if (x >= size)
        res = 0
    return res
}

function neighibors(X, Y, pole) {
    //// вариант, если смотреть "одним взкглядом"
    // let s =
    //     pole[coord(X - 1, sizeX)][coord(Y - 1, sizeY)] + pole[coord(X - 1, sizeX)][coord(Y, sizeY)] + pole[coord(X - 1, sizeX)][coord(Y + 1, sizeY)] +
    //     pole[coord(X, sizeX)][coord(Y - 1, sizeY)] + pole[coord(X, sizeX)][coord(Y + 1, sizeY)] +
    //     pole[coord(X + 1, sizeX)][coord(Y - 1, sizeY)] + pole[coord(X + 1, sizeX)][coord(Y, sizeY)] + pole[coord(X + 1, sizeX)][coord(Y + 1, sizeY)]

    //// вариант с циклом
    let s = -pole[X][Y]
    for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++) {
            let x1 = (X + i < 0) ? sizeX - 1 : (X + i >= sizeX) ? 0 : X + i
            let y1 = (Y + j < 0) ? sizeY - 1 : (Y + j >= sizeY) ? 0 : Y + j
            s += pole[x1][y1]
        }
    return s
}

export function nextGeneration(sizeX, sizeY, pole) {
    let n = init(sizeX, sizeY, false)
    for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
            let neig = neighibors(x, y, pole)

            switch (neig) {
                case 2:
                    n[x][y] = pole[x][y]
                    break;
                case 3:
                    n[x][y] = 1;
                    break;
                default:
                    n[x][y] = 0
                    break;
            }
        }
    }
    return n
}



let pole = init(sizeX, sizeY)
for (let g = 0; g < 150; g++) {
    console.log('Поколение:', g)
    const gg = {
        "gen": g,
        "pole": pole
    }
    console.error("Для передачи на сервер:", JSON.stringify(gg))
    show(pole)
    pole = nextGeneration(sizeX, sizeY, pole)
}
