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