
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcons");
const menuIcon = document.querySelector(".menuIcons");

function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        menu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

hamburger.addEventListener("click", toggleMenu);

// function getCursor(event) {
//     let x = event.clientX;
//     let y = event.clientY;
//     let _position = `X: ${x}<br>Y: ${y}`;
//     console.log(x, y)
//     const infoElement = document.getElementById('info');
//     infoElement.innerHTML = _position;
//     infoElement.style.top = y + "px";
//     infoElement.style.left = (x + 20) + "px";
// }




