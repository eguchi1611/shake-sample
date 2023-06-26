window.addEventListener("DOMContentLoaded", () => {
  // コンテナを指定
  const section = document.querySelector(".heart-container");

  const createPetal = () => {
    const petalEl = document.createElement("span");
    petalEl.className = "heart";
    const minSize = 50;
    const maxSize = 125;
    const minDeg = -15;
    const maxDeg = 15;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    const deg = Math.random() * (maxDeg + 1 - minDeg) + minDeg;
    petalEl.style.width = `${size}px`;
    petalEl.style.height = `${size}px`;
    petalEl.style.rotate = `${deg}deg`;
    petalEl.style.left = Math.random() * innerWidth + "px";
    section.appendChild(petalEl);

    setTimeout(() => {
      petalEl.remove();
    }, 10000);
  };

  setInterval(createPetal, 300);
});
