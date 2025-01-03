const carousel = document.querySelector(".carousel");
const firstImage = carousel.querySelector("img");
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragging = false;
let startX = 0;
let scrollStart = 0;
let scrollDiff = 0;

const toggleArrowIcons = () => {
  setTimeout(() => {
    const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
    arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
    arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
  }, 100);
};

const scrollCarousel = (direction) => {
  const cardWidth = firstImage.clientWidth + 14; 
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
  carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);
  toggleArrowIcons();
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const direction = icon.id === "right" ? "right" : "left";
    scrollCarousel(direction);
  });
});

const autoCenterImage = () => {
  const cardWidth = firstImage.clientWidth + 14;
  const offset = carousel.scrollLeft % cardWidth;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
    if (offset > cardWidth / 3) {
      carousel.scrollLeft += cardWidth - offset; 
    } else {
      carousel.scrollLeft -= offset;
    }
  }
  toggleArrowIcons();
};

const startDragging = (event) => {
  isDragging = true;
  startX = event.pageX || event.touches[0].pageX;
  scrollStart = carousel.scrollLeft;
  carousel.classList.add("dragging");
};
const duringDrag = (event) => {
  if (!isDragging) return;
  const currentX = event.pageX || event.touches[0].pageX;
  scrollDiff = currentX - startX;
  carousel.scrollLeft = scrollStart - scrollDiff;
};
const stopDragging = () => {
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove("dragging");
  if (Math.abs(scrollDiff) > 10) {
    autoCenterImage();
  }
};

carousel.addEventListener("mousedown", startDragging);
carousel.addEventListener("touchstart", startDragging);
document.addEventListener("mousemove", duringDrag);
carousel.addEventListener("touchmove", duringDrag);
document.addEventListener("mouseup", stopDragging);
carousel.addEventListener("touchend", stopDragging);

toggleArrowIcons();