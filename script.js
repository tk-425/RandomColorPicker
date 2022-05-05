const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, `A`, `B`, `C`, `D`, `E`, `F`];
const hexLength = 6;

const button = document.getElementById(`button`);
const hexClass = document.getElementById(`hex-color`);
const rgbClass = document.getElementById(`rgb-color`);

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

function getHexToDecimal(hexValue) {
  return parseInt(getLastTwoHexValue(hexValue), 16);
}

// get the only last two digits from the hexColor value
function getLastTwoHexValue(hexValue) {
  return hexValue.slice(-2);
}

function getColor() {
  let hexColor = ``;
  let rgbColor = ``;

  for (let i = 0; i < hexLength; i++) {
    // generate a random number between 0 and 15
    hexColor += hex[getRandomNumber()];

    if ((i + 1) % 2 == 0) {
      let decValue = getHexToDecimal(hexColor);
      if (i + 1 < hexLength) {
        rgbColor += decValue + `, `;
      } else {
        rgbColor += decValue + `)`;
      }
    }
  }

  // update the hex color value and background color
  hexColor = `#` + hexColor;
  hexClass.textContent = hexColor;
  hexClass.style.color = hexColor;
  document.body.style.backgroundColor = hexColor;

  // update the rgb color value
  rgbClass.textContent = `(` + rgbColor;
}

// event listener
button.addEventListener(`click`, function () {
  getColor();
});

document.addEventListener(`keypress`, (e) => {
  if (e.code.toLowerCase() === `space`) {
    getColor();
  }
});