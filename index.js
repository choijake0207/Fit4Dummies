const infoBox = document.querySelector(".info-container")
const infoTitle = document.querySelector(".info-title")
const excList = document.querySelector(".exc-list")
const anatomyBox = document.querySelector(".anatomy-container")
const key = "AIzaSyC-Mj59nCrhI1zWfI2t7c0QR-1U1cul1zI"

// Animation Cases
// 1.) New Select
// 2.) DeSelect
// 3.) Switch select => implement load anim

// Preload Data
let jsonList = []
let visibleList = []
window.onload = () => {
    fetch("./Assets/exercises.json")
        .then(res => res.json())
        .then(dataJSON => {
            jsonList = dataJSON
        })
}




const targetMuscles = document.querySelectorAll(".target-muscle")
targetMuscles.forEach(muscle => {
    muscle.addEventListener("click", () => {
        // clear redundant selection
        if (muscle.classList.contains("selected")) {
            muscle.classList.remove("selected")
            clearExcList()
        } else {
        // clear previous selection
            document.querySelectorAll(".target-muscle.selected").forEach(selectedMuscle => {
                selectedMuscle.classList.remove("selected")
            })
        // create new selection
            muscle.classList.add("selected")
            const selection = muscle.getAttribute("id")
            const [gender, target] = selection.split("-")
            const list = jsonList.filter(exc => exc.primaryMuscles.find(primaryMuscle => primaryMuscle === target))
            visibleList = list.slice(0,5)
            console.log(visibleList)
            displayExcList(target)

        }
    })
})

function displayExcList (target) {
    excList.innerHTML=""
    infoTitle.innerHTML = ""
    infoTitle.textContent = target.toUpperCase()
    for (let i = 0; i < visibleList.length; i++) {
        let exercise = visibleList[i]
        let card = document.createElement("li")
        card.classList.add("exc-card")
        let cardTitle = document.createElement("h2")
        cardTitle.textContent = exercise.name
        let pMuscle = document.createElement("p")
        pMuscle.textContent = `Primary Muscles: ${exercise.primaryMuscles[0]}`
        let sMuscle = document.createElement("p")
        sMuscle.textContent = `Seconday Muscles: ${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles[0] : "--"}`
        card.append(cardTitle, pMuscle, sMuscle)
        excList.appendChild(card)
        fetchYoutube(exercise.name)
    }
}

function clearExcList () {
    excList.innerHTML = ""
    infoTitle.textContent = "Click A Muscle Group To Start"
}

function fetchYoutube (exc) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${exc}&key=${key}`)
        .then(response => response.json())
        .then(data => console.log(data))
}

