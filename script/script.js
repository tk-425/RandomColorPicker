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

function changeColor() {
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

  // TinyColor JS color tool - Source: https://github.com/bgrins/TinyColor
  // complementary color
  const color = tinycolor(hexColor);

  // update text and colors
  updateMain(hexColor, rgbColor, color);
}

function updateMain(hexColor, rgbColor, color) {
  // update the hex color value and background color
  hexColor = `#` + hexColor;
  hexClass.textContent = hexColor;
  hexClass.style.color = hexColor;
  rgbClass.style.color = hexColor;
  document.body.style.backgroundColor = hexColor;

  // update the rgb color value
  rgbClass.textContent = `(` + rgbColor;

  // change complementary color contents
  const compHexColor = color.complement().toHexString();
  const compRGBColor = tinycolor(compHexColor).toRgb();
  const compHexDocument = document.getElementById(`comp-hex-color`);
  const compRGBDocument = document.getElementById(`comp-rgb-color`);

  compHexDocument.textContent = compHexColor.toUpperCase();
  compRGBDocument.textContent =
    `(` + compRGBColor.r + `, ` + compRGBColor.g + `, ` + compRGBColor.b + `)`;

  compHexDocument.style.color = compHexColor;
  compRGBDocument.style.color = compHexColor;

  // update the nav links, main background, main text,
  // button background, and button text color if background is dark
  changeIfDark(color.isDark());
}

function changeIfDark(isDark) {
  const navLinks = document.querySelectorAll(`.navLink`);
  const main = document.querySelector(`.main`);

  if (isDark) {
    navLinks.forEach((navLink) => {
      navLink.style.color = `#FFFBF2`;
    });

    main.style.backgroundColor = `#FFFBF2`;
    main.style.color = `black`;
    button.style.backgroundColor = `black`;
    button.style.color = `#FFFBF2`;
  } else {
    navLinks.forEach((navLink) => {
      navLink.style.color = `black`;
    });
    main.style.backgroundColor = `black`;
    main.style.color = `#FFFBF2`;
    button.style.backgroundColor = `#FFFBF2`;
    button.style.color = `black`;
  }
}

// event listener
button.addEventListener(`click`, function () {
  changeColor();
});

document.addEventListener(`keypress`, (e) => {
  if (e.code.toLowerCase() === `enter`) {
    changeColor();
  }
});
