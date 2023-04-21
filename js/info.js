const buscarPelicula = async () => {
    let texto_busqueda = document.getElementById("texto_busqueda").value;

    if (texto_busqueda.length > 1) {
        document.getElementById('texto_default').style.display = 'none';
        const respuesta = await fetch("https://imdb-api.com/en/API/SearchMovie/k_k30h1344/" + texto_busqueda);
        const data = await respuesta.json();
        let contenido = "";

        data.results.forEach(item => {
            contenido += `<div class="card" style="width: 18rem;">
                                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.description}</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`;
        });

        document.getElementById("resultado_busqueda").innerHTML = contenido;
    }}

document.getElementById("boton_buscar").addEventListener("click", buscarPelicula);