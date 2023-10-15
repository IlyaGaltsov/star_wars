"use strict"

const peopleBtn = document.getElementById('people');
const planetBtn = document.getElementById('planet');
const transportBtn = document.getElementById('transport');
const closeModal = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');

const API_BASE = 'https://swapi.dev/api'

let peopleNextUrl = `${API_BASE}/people`

function getPeople() {
    return axios.get(peopleNextUrl)
    .then(response => {
        if (response.data.next) {
            peopleNextUrl = response.data.next;
        }else{
            const deleteBtn = document.querySelector('.btn_people');
            deleteBtn.style.display ='none'
        }
        const peopleList = document.getElementById('peopel_list')
        response.data.results.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = person.name;
            listItem.addEventListener('click', ()=>{
                const modal = document.querySelector('.modal')
                modal.style.display = 'block';
                clearInterval(sliderInterval);
                disableSlider();
                clearModalContent();
                for(let key in person) {
                    if(key !== 'films') {
                        addInfoModal(key, person[key]);
                    }
                }
            })
            peopleList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
}

function addInfoModal (key, value){
    const aboutList = document.querySelector('.about_list');
    const listItem = document.createElement('li');
    listItem.textContent = `${key}: ${value}`;
    aboutList.appendChild(listItem);
}

let planetNextUrl = `${API_BASE}/planets`;

function getPlanet(){
    return axios.get(planetNextUrl)
    .then(response => {
        if(response.data.next){
            planetNextUrl = response.data.next
        }else{
            const deleteBtn = document.querySelector('.btn_planet');
            deleteBtn.style.display ='none'
        }
        const planetList = document.getElementById('planet_list')
        response.data.results.forEach(planet => {
            const listItem = document.createElement('li');
            listItem.textContent = planet.name;
            listItem.addEventListener('click', ()=>{
                const modal = document.querySelector('.modal')
                modal.style.display = 'block';
                clearInterval(sliderInterval);
                disableSlider();
                for(let key in planet) {
                        addInfoModal(key, planet[key]);
                }
            })
            planetList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
}

let  vehiclesNextUrl = `${API_BASE}/vehicles`

function getVehicles (){
    return axios.get(vehiclesNextUrl)
    .then(response => {
        if(response.data.next){
            vehiclesNextUrl = response.data.next
        }else{
            const deleteBtn = document.querySelector('.transport_btn');
            deleteBtn.style.display ='none'
        }
        const transportList = document.getElementById('transport_list')
        response.data.results.forEach(vehicles => {
            const listItem = document.createElement('li');
            listItem.textContent = vehicles.name;
            listItem.addEventListener('click', ()=>{
                const modal = document.querySelector('.modal')
                modal.style.display = 'block';
                clearInterval(sliderInterval);
                disableSlider();
                for(let key in vehicles) {
                    addInfoModal(key, vehicles[key]);
                }
            })
            transportList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
}

function addLoadMoreButton(className, getDataFunction) {
    const nextPage = document.querySelector(`.${className}`);
    nextPage.style.display = 'block';
    nextPage.addEventListener('click', getDataFunction);
}

function clearModalContent() {
    const aboutList = document.querySelector('.about_list');
    aboutList.innerHTML = ''; // Очищаем содержимое модального окна
}


peopleBtn.addEventListener('click', ()=>{
    getPeople()
    addLoadMoreButton('btn_people', getPeople);
})

planetBtn.addEventListener('click', ()=>{
    getPlanet()
    addLoadMoreButton('btn_planet', getPlanet);
})

transportBtn.addEventListener('click', ()=>{
    getVehicles()
    addLoadMoreButton('transport_btn', getVehicles);
})

closeModal.addEventListener('click', ()=>{
    modal.style.display ='none';
    startSliderInterval();
    enableSlider();
})