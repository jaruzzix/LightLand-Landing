const mainPictures = document.querySelector("#main-pictures");
const scrollControls = document.querySelectorAll(".scrool");
const nav = document.querySelector('nav');
let pictureIndex;
let slidingInterval;
let transformValue;

const menuButton = document.querySelector("#nav-menu-btn");

const products = Array.from(document.querySelectorAll(".product-box"));
const productsTitles = Array.from(document.querySelectorAll(".product-title"));
let productIndex = 0;
let changeProductSizeTimeout;

const isDesktop = window.matchMedia('(pointer: fine)').matches;



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

// Перемещение слайдера Главной
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

// запуск слайдера
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

// остановка слайдера
function stopSliding() {
    clearTimeout(slidingInterval);
}

// изменение слайда с помощью радиокнопок
scrollControls.forEach((control) => {
    control.addEventListener('change', () => {
        stopSliding();
        pictureIndex = Number(control.getAttribute('value')) - 1;
        startSliding();
    })
})

// изменение размера карточки
function changeProductSize (exeptionIndex, returnSize = false) {
    
    products.forEach((product) => {
        if (returnSize) {
            product.style.width = '17%';
            return;
        }

        if (products.indexOf(product) != exeptionIndex) {
            product.style.width = '10%';
        }
    })
}

function addProd(index) {
    products[index].classList.add('prod');
    productsTitles[index].classList.add('prod');
}

function removeProd(index) {
    products.at(index).classList.remove('prod');
    productsTitles.at(index).classList.remove('prod');
}


let firstProdAnim = true;
function startProductAnimation() {
    if (document.body.offsetWidth >= 760) {
        products[productIndex].style.width = '45%';
        addProd(productIndex);

        if (!firstProdAnim) {
            removeProd(productIndex - 1);
        }
        else {
            firstProdAnim = false;
        }

        changeProductSize(productIndex++);

        if (productIndex === 5) {
            productIndex = 0;
        }

        changeProductSizeTimeout = setTimeout(startProductAnimation, 2800);
    }
    // else {
        

    // }
}
    
function stopProductAnimation() {
    clearTimeout(changeProductSizeTimeout);
}

if (isDesktop) {

    products.forEach((product) => {
        
        product.addEventListener('mouseenter', () => {
            stopProductAnimation();
            products.forEach((prod) => {
                prod.classList.remove('prod');
                productsTitles[products.indexOf(prod)].classList.remove('prod');
            })
            productIndex = products.indexOf(product);
            changeProductSize(productIndex);
            product.style.width = '45%';
        })

        product.addEventListener('mouseleave', () => {
            changeProductSize(null, true);
            startProductAnimation();
        })
    })
}




startSliding();
startProductAnimation();
// goToSlide(2);
