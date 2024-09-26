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
let initialJSONList = []
let byMuscleList = []
let visibleList = []
let targetMuscle = ""
let level = "all"



window.onload = () => {
    fetch("./Assets/exercises.json")
        .then(res => res.json())
        .then(dataJSON => {
            initialJSONList = dataJSON
        })
}


const selectInput = document.querySelector(".level-selection")
selectInput.addEventListener("change", (e) => {
    level = e.target.value.toLowerCase()
    filterExercises(targetMuscle, level)
    console.log(level)
})





const targetMuscles = document.querySelectorAll(".target-muscle")
targetMuscles.forEach(muscle => {
    muscle.addEventListener("click", () => {
        // clear redundant selection
        if (muscle.classList.contains("selected")) {
            muscle.classList.remove("selected")
            targetMuscle = ""
            clearCard()
        } else {
        // clear previous selection
            document.querySelectorAll(".target-muscle.selected").forEach(selectedMuscle => {
                selectedMuscle.classList.remove("selected")
            })
        // create new selection
            muscle.classList.add("selected")
            const selection = muscle.getAttribute("id")
            const [gender, target] = selection.split("-")
            targetMuscle = target
            filterExercises(targetMuscle, level)
        }
    })
})



function filterExercises (target, level) {
    byMuscleList = initialJSONList.filter(exc => exc.primaryMuscles.find(primaryMuscle => primaryMuscle === target))
    if (level !== "all") {
        byMuscleList = byMuscleList.filter(exc => exc.level === level)
    }
    visibleList = byMuscleList.slice(0,5)
    createCard()
}




function createCard () {
    excList.innerHTML=""
    infoTitle.innerHTML = ""
    infoTitle.textContent = targetMuscle.toUpperCase()
    for (let i = 0; i < visibleList.length; i++) {
        let exercise = visibleList[i]
        let card = document.createElement("li")
        card.classList.add("exc-card")
        card.classList.add("loading")
        excList.appendChild(card)
        fetchYoutubeAndRender(exercise, card)
    }
}

function clearCard () {
    excList.innerHTML = ""
    infoTitle.textContent = "Click A Muscle Group To Start"
}

async function fetchYoutubeAndRender(exercise, card) {

    try {
        // const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${exercise}&key=${key}`)
        const data = await response.json()
        const video = data.items[0]
        const thumbnail = video.snippet.thumbnail.default.url
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${exercise.name}</h2>
                <button class="expand-toggle"> View </button>
            </div>
            <h3 class="card-summary">Description</h3>
            <p class="card-instructions">${exercise.instructions}</p>
            <h3 class="thumbnail label">Example</h3>
            <img class="thumbnail" src="${thumbnail}" alt="${video.snippet.title}">
            <p class="card-pLabel">Primary Muscles: ${exercise.primaryMuscles.join(",")}</p>
            <p class="card-sLabel">Secondary Muscles: ${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.join(", ") : "--"}</p>
        `
    } catch (error) { // keep until quota resets
        console.log(error)
        setTimeout(() => {
            card.classList.remove("loading")
        }, 2000)
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${exercise.name}</h2>
                <button class="expand-toggle"> View </button>
            </div>
            <h3 class="card-summary">Description</h3>
            <p class="card-instructions">${exercise.instructions}</p>
            <h3 class="thumbnail-label">Example</h3>
            <div class="error thumbnail"> Video Couldn't Load </div>
            <p class="card-pLabel">Primary Muscles: ${exercise.primaryMuscles.join(",")}</p>
            <p class="card-sLabel">Secondary Muscles: ${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.join(", ") : "--"}</p>
        `
    }
}


