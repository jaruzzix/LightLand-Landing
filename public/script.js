const mainPictures = document.querySelector("#main-pictures");
let pictureIndex = -1;
const scrollControls = document.querySelectorAll(".scrool");

let slidingInterval;

function showMenu() {
    if (window.innerWidth <= 720){
        const isOpen = document.getElementById("nav").classList.toggle("show-menu");

        if (isOpen) {
            document.body.style.position = "fixed";
        }
        else {
            document.body.style.position = "";
        }
    }
}

function goToStore() {
    window.location.href = 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc';
}

function goToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

function goToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}


// scrollControls.forEach((control) => {
//     control.addEventListener("click", () => {})
// })

function goToSlide(index) {
    console.log(index)
    mainPictures.style.transform = `translateX(-${86.25 + (89.44 * pictureIndex)}%)`;
    if (index === 3) {
        mainPictures.style.transition = "none";
        mainPictures.style.transform = `translateX(-86.25%)`;
        void mainPictures.offsetWidth;
        mainPictures.style.transition = "transform 1000ms ease-in-out";
        pictureIndex = 0;
    }
}

function startSliding() {
    if (pictureIndex === 3) {
        slidingInterval = setTimeout(startSliding, 0);
    }
    else {
        slidingInterval = setTimeout(startSliding, 5000);
    }

    goToSlide(pictureIndex++);
}

function stopSliding() {
    clearTimeout(slidingInterval);
}

startSliding();