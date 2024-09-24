const infoBox = document.querySelector(".info-container")
const infoTitle = document.querySelector(".info-title")
const excList = document.querySelector(".exc-list")
const exc = document.querySelector(".exc")
const anatomyBox = document.querySelector(".anatomy-container")

// Animation Cases
// 1.) New Select
// 2.) DeSelect
// 3.) Switch select => implement load anim



const targetMuscles = document.querySelectorAll(".target-muscle")
targetMuscles.forEach(muscle => {
    muscle.addEventListener("click", () => {
        // clear redundant selection
        if (muscle.classList.contains("selected")) {
            muscle.classList.remove("selected")
        } else {
        // clear previous selection
            document.querySelectorAll(".target-muscle.selected").forEach(selectedMuscle => {
                selectedMuscle.classList.remove("selected")
            })
        // create new selection
            muscle.classList.add("selected")

        }
    })
})


// Preload Data
let data = []
window.onload = () => {
    fetch("./Assets/exercises.json")
        .then(res => res.json())
        .then(data => {
            data = data
            console.log(data)
        })
}