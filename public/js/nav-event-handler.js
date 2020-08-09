const navButton = document.getElementById('navButton');
const collapsedContent = document.getElementById('collapsedContent')
const navItems = document.getElementsByClassName('nav-item')
navButton.addEventListener('click', function () {
    toggleDisplay(collapsedContent);
    elemsToRight();
})

function elemsToRight() {
    for(item of navItems){
        item.style.textAlign = 'right'
    }
}

function toggleDisplay(elem) {
    if (elem.style.display === 'block') {
        elem.style.display = 'none'
    } else {
        elem.style.display = 'block'
    }
}