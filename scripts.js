
let data;
let planet = 0;
const planets = {
    0: {
        color: "hsl(194, 48%, 49%)",
        name: "Mercury",
        size: "111px",
        maxSize: "290px"
    },
    1: {
        color: "hsl(33, 82%, 61%)",
        name: "Venus",
        size: "154px",
        maxSize: "400px"
    },
    2: {
        color: "hsl(263, 67%, 51%)",
        name: "Earth",
        size: "173px",
        maxSize: "450px"
    },
    3: {
        color: "hsl(10, 63%, 51%)",
        name: "Mars",
        size: "129px",
        maxSize: "336px"
    },
    4: {
        color: "hsl(332, 67%, 54%)",
        name: "Jupiter",
        size: "224px",
        maxSize: "582px"
    },
    5: {
        color: "hsl(17, 73%, 46%)",
        name: "Saturn",
        size: "256px",
        maxSize: "666px"
    },
    6: {
        color: "hsl(169, 73%, 44%)",
        name: "Uranus",
        size: "176px",
        maxSize: "458px"
    },
    7: {
        color: "hsl(222, 87%, 56%)",
        name: "Neptune",
        size: "173px",
        maxSize: "450px"
    }
}


if (!data) {
    fetch("data.json")
        .then((response) => response.json())
        .then(response => {
            data = response;
            renderPlanet();
        });
}


function renderPlanet() {
    document.getElementById("app").innerHTML = `
        <section class="app-wrapper">

            <div class="planet-image__wrapper">
                <div class="planet-image">
                    <img class="top-img" id="planet-img__exterior" src="${data[planet].images.planet}">
                    <img class="bottom-img hidden" id="planet-img__interior" src="${data[planet].images.internal}">
                    <img class="detail-img hidden" id="planet-img__detail" src="${data[planet].images.geology}">
                </div>
            </div>

            <div class="planet-info__wrapper">
                <div class="planet-info__tabs">
                    <button class="tab is-active" onclick="openPanel(event, 'overview')">
                        <span class="tab-number">01</span><span class="extended-title">Overview</span><span class="shortened-title">Overview</span></button>
                    <button class="tab" onclick="openPanel(event, 'structure')">
                        <span class="tab-number">02</span><span class="extended-title">Internal Structure</span><span class="shortened-title">Structure</span></button>
                    <button class="tab" onclick="openPanel(event, 'surface')">
                        <span class="tab-number">03</span><span class="extended-title">Surface Geology</span><span class="shortened-title">Surface</span></button>
                </div>
                <div class="planet-info__inner-wrapper">
                    <div class="planet-title">
                        <h1>${data[planet].name}</h1>
                    </div>
                    <div class="planet-info">
                        <div id="overview" class="panel is-shown">
                            <p>${data[planet].overview.content}</p>
                        </div>
                        <div id="structure" class="panel">
                            <p>${data[planet].structure.content}</p>
                        </div>                
                        <div id="surface" class="panel">
                            <p>${data[planet].geology.content}</p>
                        </div>                
                    </div>
                    <div class="info-attribution">
                        <p>Source :</p>
                        <a href="${data[planet].structure.source}">Wikipedia</a>
                        <img src="assets/icon-source.svg">
                    </div>
                </div>
            </div>

            <div class="planet-fact-tiles">
                <div class="fact-tile planet-rotation">
                    <p>Rotation time</p> <h4>${data[planet].rotation}</h4>
                </div>
                <div class="fact-tile planet-revolution">
                    <p>Revolution time</p><h4> ${data[planet].revolution}</h4>
                </div>
                <div class="fact-tile planet-radius">
                    <p>Radius</p><h4>${data[planet].radius}</h4>
                </div>
                <div class="fact-tile planet-temperature">
                    <p>Average Temp.</p><h4> ${data[planet].temperature}</h4>
                </div>
            </div>
        </section>
    `
    let exterior = document.getElementById("planet-img__exterior");
    let interior = document.getElementById("planet-img__interior");
    let detail = document.getElementById("planet-img__detail");
    let color = document.querySelector(':root');
    let width = document.querySelector(':root');  
    let height = document.querySelector(':root');
    let max = document.querySelector(':root');
    color.style.setProperty('--primary', planets[planet].color);
    height.style.setProperty('--planet-height', planets[planet].size);
    width.style.setProperty('--planet-width', planets[planet].size);
    max.style.setProperty('--max-size', planets[planet].maxSize);
}


function planetPicker(index) {
    var i, planetList;
    planetName = planets[index].name.toLowerCase();
    planet = index;
    renderPlanet();
    navPane.classList.toggle('nav-open');
    
    planetList = document.getElementsByClassName("nav-planet");
    for (i = 0; i < planetList.length; i++) {
        planetList[i].className = planetList[i].className.replace(" nav-is-active", "");
    }

    document.getElementById(planetName).classList.add("nav-is-active");
}

const navToggle = document.querySelector('.nav-toggle');
const navPane = document.querySelector('.nav-planets');

navToggle.addEventListener('click', () => {
        navPane.classList.toggle('nav-open');
    });


function openPanel(evt, panelName) {
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("panel");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].className = tabcontent[i].className.replace(" is-shown", "");
    }
    
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    
    document.getElementById(panelName).classList.add("is-shown");
        evt.currentTarget.className += " is-active";
    
    if (panelName === 'overview') {
        document.getElementById("planet-img__detail").classList.add("hidden");
        document.getElementById("planet-img__interior").classList.add("hidden");
        document.getElementById("planet-img__exterior").classList.remove("hidden");
    }
    if (panelName === 'structure') {
        document.getElementById("planet-img__exterior").classList.add("hidden");
        document.getElementById("planet-img__interior").classList.remove("hidden");
        document.getElementById("planet-img__detail").classList.add("hidden");
    }
    if (panelName === 'surface') {
        document.getElementById("planet-img__detail").classList.remove("hidden");
        document.getElementById("planet-img__interior").classList.remove("hidden");
        document.getElementById("planet-img__exterior").classList.add("hidden");
    }
    }




