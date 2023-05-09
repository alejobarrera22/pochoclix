//definicion de las clases con su constructor
class Compra{
    constructor(titulo, cantEntradas, modo, precioFinal){
        this.titulo = titulo;
        this.cantEntradas = cantEntradas;
        this.modo = modo;
        this.precioFinal = precioFinal;
    }
}

class Pelicula{
    constructor(id, titulo, sinopsis, director, precio, img){
        this.id = id;
        this.titulo = titulo; 
        this.sinopsis = sinopsis;
        this.director= director;
        this.precio = precio;
        this.img = img;
    }
}


//Instancia de los objetos pelicula por defecto

const buscarCartelera = async() =>{
    let peliculas = []
    let respuesta = await fetch("https://imdb-api.com/en/API/InTheaters/k_k30h1344");
    const data = await respuesta.json();
    let contenidoCartelera =``;
    max = 16
    for (let i = 0; i < max; i++) {
        const element = data.items[i];
        //peliculas.push(element)
        let precio = element.imDbRating * 100;
        contenidoCartelera += `<div class="card" style="width: 18rem;">
                                <img src="${element.image}" class="card-img-top" alt="${element.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.genres}</p>
                                    <p> Precio: ${precio} </p>
                                    <button onclick='funcionarBotones(${element})' >Agregar al carrito</button>
                                </div>
                            </div>`;
    }
    document.getElementById('main-populares').innerHTML = contenidoCartelera;
    funcionarBotones()
}

document.addEventListener('DOMContentLoaded', buscarCartelera)

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let cart = document.querySelector('.carrito');

function funcionarBotones(pelicula){
    console.log(pelicula)
}

//funcion que me permite agregar una peli al carrito e ir aumentando la cantidad
function agregarAlCarrito(peli){
    let existe = carrito.some((element) => element.id == peli.id);
    if (!existe){
        peli.cantidad = 1;
        carrito.push(peli);
    } else{
        let miPeli = carrito.find((element) => element.id == peli.id);
        miPeli.cantidad++;
    }
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
}

//funcion que muestra los datos de la pelicula con sus precios
function mostrarCarrito(){
    cart.innerHTML = '';
    let total = carrito.reduce((acc,ite) => acc + ite.precio * ite.cantidad, 0)
    carrito.forEach((peli) => {
        //let subTotal = peli.cantidad * peli.precio;
        cart.innerHTML += `<div class="card">
                                <p>Película: ${peli.title}</p>
                                <p>Cantidad: ${peli.cantidad}</p>
                                <span>Subtotal: $${peli.id}</span>
                            </div>`
    });
    cart.innerHTML += `<p> El total de su compra es de: $${total}</p>`
}

//funcion que me permite borrar los datos almacenados en el carrito
function limpiarCarrito(){
    carrito = [];
    localStorage.setItem('carrito',JSON.stringify(carrito));
    mostrarCarrito();
}

document.getElementById(`borrar`).addEventListener('click', ()=>{
    limpiarCarrito();
});

mostrarCarrito();