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