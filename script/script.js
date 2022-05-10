const hexadecimal = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
];
const hexLength = 6;

const button = document.getElementById(`button`);
const mainHexElement = document.getElementById(`hex-color`);
const mainRgbElement = document.getElementById(`rgb-color`);

// event listener for the button
button.addEventListener(`click`, function () {
  changeColor();
});

// event listener for the `enter` keypress
document.addEventListener(`keypress`, (e) => {
  if (e.code.toLowerCase() === `enter`) {
    changeColor();
  }
});

function changeColor() {
  // TinyColor JS color tool - Source: https://github.com/bgrins/TinyColor
  // get a random color
  const color = tinycolor(getRandomNumber());

  // get the random number from the tinycolor object
  // and converted into hex color format
  let hexColor = color.toHexString().toUpperCase();

  // convert the hex number to rgb color format
  let rgbColor = rgbToString(color.toRgb());

  // update text and colors
  updatePage(hexColor, rgbColor, color);
}

function getRandomNumber() {
  let hexColor = "";

  // create a 6-digit random number from the hexadecimal list
  for (let i = 0; i < hexLength; i++) {
    hexColor += hexadecimal[Math.floor(Math.random() * hexadecimal.length)];
  }

  return hexColor;
}

function rgbToString(rgbObj) {
  return `(` + rgbObj.r + `, ` + rgbObj.g + `, ` + rgbObj.b + `)`;
}

function updatePage(hexColor, rgbColor, color) {
  // update the background color of the page
  // to a newly created random hex color
  document.body.style.backgroundColor = hexColor;

  // update the hex and rgb text to the random color
  mainHexElement.textContent = hexColor;
  mainRgbElement.textContent = rgbColor;

  // update the hex and RGB font color that corresponded to the random number.
  mainHexElement.style.color = hexColor;
  mainRgbElement.style.color = hexColor;

  // get a complementary color of hex and rgb from the tinycolor object
  const compHex = color.complement().toHexString();
  const compRGB = tinycolor(compHex).toRgb();

  const compHexElement = document.getElementById(`comp-hex-color`);
  const compRgbElement = document.getElementById(`comp-rgb-color`);

  // update the text and text color of the hex and rgb complementary color
  compHexElement.textContent = color.complement().toHexString().toUpperCase();
  compRgbElement.textContent = rgbToString(compRGB);

  compHexElement.style.color = compHex;
  compRgbElement.style.color = compHex;

  // update the nav links, main background, main text,
  // button background, and button text color if background is dark
  updateIfDark(color.isDark());
}

function updateIfDark(isDark) {
  // get all the elements that need to be changed
  // when the randomly created background color is dark.
  const navLinks = document.querySelectorAll(`.navLink`);
  const main = document.querySelector(`.main`);

  // the colors for the texts, the main-container and the button background
  const offWhite = `#FFFBF2`;
  const black = `black`;

  // check the background color if it's too dark
  if (isDark) {
    // change all navigation links' text color to off-white
    navLinks.forEach((navLink) => {
      navLink.style.color = offWhite;
    });

    // change the main background and the text color
    main.style.backgroundColor = offWhite;
    main.style.color = black;

    // change the button's background and the text color
    button.style.backgroundColor = black;
    button.style.color = offWhite;
  } else {
    // if the background color is light,
    // change the navigation links' background and the text color to black
    navLinks.forEach((navLink) => {
      navLink.style.color = black;
    });

    // change the main background and the text color
    main.style.backgroundColor = black;
    main.style.color = offWhite;

    // change the button's background and the text color
    button.style.backgroundColor = offWhite;
    button.style.color = black;
  }
}


