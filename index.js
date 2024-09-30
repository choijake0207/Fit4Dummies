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
    if (targetMuscle !== "") {
        filterExercises(targetMuscle, level)
    }
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
    console.log(visibleList)
    createCard()
}




function createCard () {
    excList.innerHTML=""
    infoTitle.innerHTML = ""
    infoTitle.textContent = targetMuscle.toUpperCase()
    if (visibleList.length === 0) {
        let noResultMessage = document.createElement("h2")
        noResultMessage.classList.add("no-result-message")
        noResultMessage.textContent = "No Results Found"
        excList.appendChild(noResultMessage)

    }
    for (let i = 0; i < visibleList.length; i++) {
        // get exercise object
        let exercise = visibleList[i]
        // create exercise card
        let card = document.createElement("li")
        card.classList.add("exc-card")
        // mock loading
        card.classList.add("loading")
        setTimeout(() => {
            card.classList.remove("loading")
        }, 500)
        excList.appendChild(card)
        // get image demo paths
        let imgPath1 = `./Assets/exercises-img/${exercise.id}/0.jpg`
        let imgPath2 = `./Assets/exercises-img/${exercise.id}/1.jpg`
        // render html content
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${exercise.name}</h2>
                <button class="expand-toggle"> View </button>
            </div>
            <div class="card-body">
                <h3 class="card-summary">Description</h3>
                <p class="card-instructions">${exercise.instructions.join(" ")}</p>
                <div class="img-container">
                    <img class="demo" src=${imgPath1} alt=${exercise}-demo-1>
                    <img class="demo" src=${imgPath2} alt=${exercise}-demo-2>
                </div>
                <p class="card-pLabel">Primary Muscles: ${exercise.primaryMuscles.join(",")}</p>
                <p class="card-sLabel">Secondary Muscles: ${exercise.secondaryMuscles.length > 0 ? exercise.secondaryMuscles.join(", ") : "--"}</p>
            </div>
            `
        let toggleViewBtn = card.querySelector(".expand-toggle")
        toggleViewBtn.addEventListener("click", () => {
            toggleExpand(card)
        })
    }
}

function clearCard () {
    excList.innerHTML = ""
    infoTitle.textContent = "Click A Muscle Group To Start"
}

function toggleExpand(card) {
    if (card.classList.contains("expand")) {
        card.classList.remove("expand")
    } else {
        document.querySelectorAll(".expand").forEach(expandedCard => {
            expandedCard.classList.remove("expand")
        })  
        card.classList.add("expand")

    }
    
}







