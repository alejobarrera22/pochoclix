const buscarPopulares = async() =>{
    let respuesta = await fetch("https://imdb-api.com/en/API/MostPopularMovies/k_k30h1344");
    const data = await respuesta.json();
    let contenidoPopulares = " ";
    max = 3

    for (let i = 0; i < max; i++) {
        const element = data.items[i];
        contenidoPopulares += `<div class="carousel-item active">
                                    <img src="${element.image}" class="d-block w-100" alt="${element.title}">
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>"${element.rank} ${element.title}"</h5>
                                        <p>"${element.crew} - IMDB Rating: ${element.imDbRating}"</p>
                                    </div>
                                </div>`;
    }
    document.getElementById("main-populares").innerHTML = contenidoPopulares;
}

document.addEventListener("DOMContentLoaded", buscarPopulares);
