const mainPictures = document.querySelector("#main-pictures");
let pictureIndex = 2;
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

function goToSlide(index, animate = true) {

    mainPictures.style.transition = "transform 1000ms ease-in-out";
    mainPictures.style.transform = `translateX(-${86.25 + (89.44 * index)}%)`;

    if (index === 3) {
        setTimeout(() => {
            pictureIndex = 0;
            mainPictures.style.transition = "none";
            mainPictures.style.transform = `translateX(-86.25%)`;
        }, 1000);
    }
    
}


function startSliding() {

    goToSlide(++pictureIndex);
    scrollControls[pictureIndex % 3].checked = true;

    
    slidingInterval = setTimeout(startSliding, 6000);
}

function stopSliding() {
    clearTimeout(slidingInterval);
}

scrollControls.forEach((control) => {
    control.addEventListener('change', () => {
        stopSliding();
        pictureIndex = Number(control.getAttribute('value')) - 1;
        startSliding();
    })
})


startSliding();
