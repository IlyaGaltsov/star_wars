"use strict"
const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const peopleBtn = document.getElementById('people');
const planetBtn = document.getElementById('planet');
const transportBtn = document.getElementById('transport');

const API_BASE = 'https://swapi.dev/api'

let slideIndex = 1;
showSlides(slideIndex);
function showSlides(n){
    if(n>slides.length){
        slideIndex = 1;
    }
    if(n<1){
        slideIndex = slides.length;
    }
    slides.forEach(item => item.style.display='none');
    slides[slideIndex -1].style.display='block'
}
function plusSlides(n){
    showSlides(slideIndex+=n);
}
prev.addEventListener('click',()=>{
    plusSlides(-1)
});
next.addEventListener('click',()=>{
    plusSlides(1)
});
setInterval(() => {
    plusSlides(1); 
}, 3000);


peopleBtn.addEventListener('click', ()=>{
    axios.get(`${API_BASE}/people`)
    .then(response => {
        const names = response.data.results.map(person => person.name);
        const peopleList = document.getElementById('peopel_list')
        peopleList.innerHTML= ''
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            peopleList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
    
})

planetBtn.addEventListener('click', ()=>{
    axios.get(`${API_BASE}/planets`)
    .then(response => {
        const names = response.data.results.map(planet => planet.name);
        const planetList = document.getElementById('planet_list')
        planetList.innerHTML= ''
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            planetList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
})

transportBtn.addEventListener('click', ()=>{
    axios.get(`${API_BASE}/vehicles`)
    .then(response => {
        const names = response.data.results.map(vehicles => vehicles.name);
        const transportList = document.getElementById('transport_list')
        transportList.innerHTML= ''
        names.forEach(name => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            transportList.appendChild(listItem);
        })
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });
})