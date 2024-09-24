const infoBox = document.querySelector(".info-container")
const infoTitle = document.querySelector(".info-title")
const excList = document.querySelector(".exc-list")
const exc = document.querySelector(".exc")
const anatomyBox = document.querySelector(".anatomy-container")





const targetMuscles = document.querySelectorAll(".target-muscle")
targetMuscles.forEach(muscle => {
    muscle.addEventListener("click", () => {
        if (muscle.classList.contains("selected")) {
            muscle.classList.remove("selected")
            infoBox.classList.remove("visible").add("hidden")
        } else {
            document.querySelectorAll(".target-muscle.selected").forEach(selectedMuscle => {
                selectedMuscle.classList.remove("selected")
            })
            muscle.classList.add("selected")
            infoBox.classList.add("visible").remove("hidden")
            
        }
    })
})