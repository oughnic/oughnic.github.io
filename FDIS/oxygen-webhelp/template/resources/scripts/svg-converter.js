  document.addEventListener("DOMContentLoaded", function () {
  const svgImages = document.querySelectorAll("img.image");

  svgImages.forEach(img => {
    const src = img.getAttribute("src");

    fetch(src)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, "image/svg+xml");
        const svg = svgDoc.querySelector("svg");

        if (!svg) return;

        // Copy attributes
        if (img.id) svg.id = img.id;
        if (img.className) svg.classList.add(...img.classList);

        // Optional: preserve alt text as title
        const alt = img.getAttribute("alt");
        if (alt) {
          const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
          title.textContent = alt;
          svg.prepend(title);
        }

        // Replace image with inline SVG
        img.parentNode.replaceChild(svg, img);
      })
      .catch(err => console.error("SVG inline conversion failed:", err));
  });
});