// Drop-down Variables

const dropDownLinks = document.querySelectorAll(".select-input__open-section");

// Slider Variables

const slides = document.querySelectorAll(".my-card__card"),
    paginationButtons = document.querySelectorAll(".my-card__pagination-btn"),
    slidesWrap = document.querySelector(".my-card__items-wrap");


let sliderSettings = {
    index: 0,
    slides: slides,
    slidesWrap: slidesWrap,
    paginationButtons: paginationButtons,
    paginationActiveClass: "my-card__pagination-btn_active",
}

// Diagrams Variables

const analyticsDiagramCtx = document.querySelector(".analitycs__diagram"),
    activityDiagramCtx = document.querySelector(".activity__diagram-canvas");

Chart.defaults.color = '#8C89B4';
Chart.defaults.plugins.legend.display = false;

let analyticsDiagram = new Chart(analyticsDiagramCtx, {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Api", "May", "Jun", "Jul", "Aug"],
        datasets: [{
            label: "Income",
            data: [1, 2, 9, 7],
            backgroundColor: "#64CFF6",
            borderColor: "rgba(0, 0, 0, 0)",
            barThickness: 15,
            borderWidth: 4,
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            },
        },
        {
            label: "Outcome",
            data: [1, 2, 3, 5],
            backgroundColor: "#5A51D4",
            borderColor: "rgba(0, 0, 0, 0)",
            barThickness: 15,
            borderWidth: 4,
            borderRadius: {
                topLeft: 10,
                topRight: 10,
            }
        }],
    },
    options: {
        legend: {
            display: false,
        },
    },
});

let activityDiagram = new Chart(activityDiagramCtx, {
    type: "doughnut",
    data: {
        labels: ["Daily payment", "Hobby", "undefined"],
        datasets: [{
            data: [55, 20, 25],
            backgroundColor: ["#6359E9", "#64CFF6", "#3A3A5A"],
            borderWidth: 0,
        }],
    }
});

// Functions

function toggleDropDown(element, activeClass) {
    element.classList.toggle("hidden");
    event.currentTarget.classList.toggle(activeClass);
}

function setPagination(sliderSettings) {

    let activeClass = sliderSettings.paginationActiveClass,
        pagButtons = sliderSettings.paginationButtons;

    pagButtons.forEach(item => {
        item.classList.remove(activeClass);
    });

    pagButtons[sliderSettings.index].classList.add(activeClass);

}

function drawSlides(sliderSettings) {

    let leftSum = 0;

    for (let i = 0; i < sliderSettings.index; i++) {
        let currentSlide = sliderSettings.slides[i],
            slideWidth = parseInt(currentSlide.offsetWidth),
            slideMargin = parseInt(getComputedStyle(currentSlide).marginLeft);

        leftSum += slideWidth + slideMargin;
    } 

    sliderSettings.slidesWrap.style.left = leftSum * -1  + "px";

}

function slide(sliderSettings) {
    
    let clickedBtnIndex = Array.from(sliderSettings.paginationButtons).findIndex(item => event.currentTarget == item);

    sliderSettings.index = clickedBtnIndex;

}

// Event Listeners

dropDownLinks.forEach(item => {
    item.addEventListener("click", (event) => {
        let element = event.currentTarget.nextElementSibling;

        toggleDropDown(element, "select-input__open-section_open");
    });
});

paginationButtons.forEach(item => {
    item.addEventListener("click", () => {
        slide(sliderSettings);
        drawSlides(sliderSettings);
        setPagination(sliderSettings);
    });
});