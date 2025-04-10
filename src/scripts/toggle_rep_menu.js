const navToggler = document.querySelector(".toggler-container")
const navigation = document.querySelector(".navigation")

navToggler?.addEventListener('click', toggleNav)

function toggleNav() {
    navigation?.classList.toggle('active')   
}

new ResizeObserver(entries => {
    if (entries[0].contentRect.width <=1100) {
        navigation.style.transition = "transform 0.4s ease_out";
    }
    else {
        navigation.style.transition = "none";
        
    }
}).observe(document.body)