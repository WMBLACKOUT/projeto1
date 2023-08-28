const images = document.querySelectorAll(".gallery-image");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalNavButtons = document.querySelectorAll(".modal-nav-button");

let currentImageIndex = 0;

images.forEach((image, index) => {
    image.addEventListener("click", () => openModal(index));
});

modalNavButtons.forEach((button, index) => {
    button.addEventListener("click", () => navigate(index === 0 ? -1 : 1));
});

function openModal(index) {
    currentImageIndex = index;
    modal.style.display = "flex";
    modalImage.src = images[currentImageIndex].src;

    updateModalNavButtons();
}

function closeModal() {
    modal.style.display = "none";
}

function navigate(step) {
    currentImageIndex += step;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    modalImage.src = images[currentImageIndex].src;

    updateModalNavButtons();
}

function updateModalNavButtons() {
    modalNavButtons[0].style.display = currentImageIndex === 0 ? "none" : "block";
    modalNavButtons[1].style.display = currentImageIndex === images.length - 1 ? "none" : "block";
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    } else if (event.key === "ArrowLeft") {
        navigate(-1);
    } else if (event.key === "ArrowRight") {
        navigate(1);
    }
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

