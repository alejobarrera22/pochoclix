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
                                </div>
                            </div>`;
    }
    document.getElementById('main-populares').innerHTML = contenidoCartelera;
    funcionarBotones()
}

document.addEventListener('DOMContentLoaded', buscarCartelera)

