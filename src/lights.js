/**
 * Changes the look of
 * some 'needles' in the tree
 * every 1000ms
 */
let lightsInterval;
export function turnOn(fir) {
    const blinkRate = 1000;
    const rowsCount = fir.rowsCount;
    const needles = fir.getNeedles();

    lightsInterval = setInterval(() =>
        blink(rowsCount, needles),
        blinkRate
    );
}

export function restart(fir) {
  clearInterval(lightsInterval);
  turnOn(fir);
}

/*
 * STUFF WE DON'T CARE ABOUT.
 */
const getNeedlesCount = rowsCount =>
    new Array(rowsCount)
        .fill(0)
        .reduce((sum, _, n) => sum + 2*n + 1, 0);

const getRandomPosition = rows => {
    const needlesCount = getNeedlesCount(rows);
    return Math.floor(Math.random() * needlesCount);
};
const getRandomColor = () => '#' + Math.random().toString(16).substr(-6);

let blinkingBulbs = [];
function blink(rows, needles) {
    blinkingBulbs.forEach(bulb => {
        bulb.innerHTML = '1';
        bulb.style.color = 'green';
    });
    blinkingBulbs = [];

    const bulbsCount = rows * 3;
    new Array(bulbsCount).fill().forEach(_ => {
        const bulbIndex = getRandomPosition(rows);
        const bulb = needles[bulbIndex];
        if (!bulb) {
            return;
        }

        blinkingBulbs.push(bulb);
        bulb.innerHTML = '0';
        bulb.style.color = getRandomColor();
    });
}

if (module.hot) {
  module.hot.dispose(_data => {
    clearInterval(lightsInterval);
  });
}