const mainPictures = document.querySelector("#main-pictures");
let pictureIndex;
const scrollControls = document.querySelectorAll(".scrool");
const nav = document.querySelector('nav');
const menuButton = document.querySelector("#nav-menu-btn");
let slidingInterval;
let transformValue;

if (document.body.offsetWidth < 1200 && getOrientation() == "portrait") {
    pictureIndex = 0;
}
else {
    pictureIndex = -1;
}

function showMenu() {
    if (document.body.offsetWidth < 720){
        const isShowed = nav.classList.toggle("show-menu"); 

        if (isShowed) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "";
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

function getOrientation() {
  if (window.innerWidth > window.innerHeight) {
    return 'landscape';
  } else {
    return 'portrait';
  }
}

function goToSlide(index, animate = true) {

    transformValue = `calc(-77.91% - 120px  - (85.27% + 60px) * ${index})`;

    if (!animate) {
        mainPictures.style.transition = "none";
    }
    else {
        mainPictures.style.transition = "transform 1000ms ease-in-out";
    }
    
    mainPictures.style.transform = `translateX(${transformValue})`;
}


function startSliding() {

    goToSlide(++pictureIndex);

    scrollControls[pictureIndex % 3].checked = true;

        slidingInterval = setTimeout(() => {
            if (pictureIndex === 3) {
                pictureIndex = 0;
                goToSlide(pictureIndex, false);
            }
        }, 1000);
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
// goToSlide(2);
