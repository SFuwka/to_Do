const navButton = document.getElementById('navButton');
const collapsedContent = document.getElementById('collapsedContent')
navButton.addEventListener('click', function () {
    toggleDisplay(collapsedContent);
})

function toggleDisplay(elem) {
    if (elem.style.display === 'block') {
        elem.style.display = 'none'
    } else {
        elem.style.display = 'block'
    }
}