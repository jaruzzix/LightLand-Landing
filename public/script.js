const mainPictures = document.querySelector("#main-pictures");
const scrollControls = document.querySelectorAll(".scrool");
const nav = document.querySelector('nav');
let pictureIndex = -1;
let slidingInterval;
let transformValue;

const menuButton = document.querySelector("#nav-menu-btn");

const products = Array.from(document.querySelectorAll(".product-box"));
const productsTitles = Array.from(document.querySelectorAll(".product-title"));
let productIndex = 0;
let changeProductSizeTimeout;

const isDesktop = window.matchMedia('(pointer: fine)').matches;


function showMenu() {
    if (document.body.offsetWidth < 720){
        const isShowed = nav.classList.toggle("show-menu"); 

        if (isShowed) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
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
function changeProductSize (exeptionIndex, returnSize = false, width = '17%') {
    
    products.forEach((product) => {
        if (returnSize) {
            product.style.width = width;
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

let isAnimate = false;
const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        const {width} = entry.contentRect;
        if (width <= 420) {
            stopProductAnimation();
            changeProductSize(null, true, '210px');
            isAnimate = false;
        }
        else if (width <= 580) {
            stopProductAnimation();
            changeProductSize(null, true, '270px');
            isAnimate = false;
        }
        else if (width <= 760) {
            stopProductAnimation();
            changeProductSize(null, true, '400px');
            isAnimate = false;
        }
        else if (!isAnimate) {
            startProductAnimation();
            isAnimate = true;
        }
    })
})

resizeObserver.observe(document.body);