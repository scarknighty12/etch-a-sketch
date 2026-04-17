const container = document.getElementById("container");
const button = document.getElementById("resizeBtn");

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Track darkness level (0–10)
    square.dataset.darkness = 0;

    square.addEventListener("mouseover", () => {
      let darkness = parseInt(square.dataset.darkness);

      if (darkness < 10) {
        darkness++;
        square.dataset.darkness = darkness;
      }

      // Bright HSL color
      const hue = Math.floor(Math.random() * 360);
      const saturation = 100;
      const lightness = 70 - (darkness * 5); // darkens gradually

      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      square.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      square.style.boxShadow = `
        inset 0 0 8px ${color},
        0 0 12px ${color}
        `;
    });

    container.appendChild(square);
  }
}

button.addEventListener("click", () => {
  let size = prompt("Enter number of squares per side (max 100):");
  size = parseInt(size);

  if (size > 0 && size <= 100) {
    createGrid(size);
  } else {
    alert("Enter a number between 1 and 100.");
  }
});

createGrid(16);