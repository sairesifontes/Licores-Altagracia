const licoresEnCarrito = JSON.parse(localStorage.getItem("mi-carrito"))


const carritoLicores = document.querySelector("#carrito-licores")
const carritoVacio = document.querySelector("#carrito-vacio")
const carritoComprado = document.querySelector("#carrito-comprado")
const carritoAcciones = document.querySelector("#carrito-acciones")
let botonesEliminar = document.querySelectorAll(".carrito-licor-eliminar")
const botonVaciar = document.querySelector("#carrito-accion-vaciar")
const botonComprar = document.querySelector("#carrito-comprar")
const totalCarrito = document.querySelector("#total-carrito")


function cargarLicoresAlCarrito(){

    if(licoresEnCarrito && licoresEnCarrito.length > 0){   

        carritoVacio.classList.add("disabled")
        carritoLicores.classList.remove("disabled")
        carritoAcciones.classList.remove("disabled")
        carritoComprado.classList.add("disabled")
    
        carritoLicores.innerHTML = ""
    
    
        licoresEnCarrito.forEach(licor => {
    
            const div = document.createElement("div")
            div.classList.add("carrito-licor")
            div.innerHTML = `
                <img class="carrito-licor-img" src="${licor.imagen}" alt="${licor.nombre}">
                <div class="carrito-licor-titulo">
                    <h3>Titulo</h3>
                    <p>${licor.nombre}</p>
                </div>
    
                <div class="carrito-licor-cantidad">
                    <h3>Cantidad</h3>
                    <p>${licor.cantidad}</p>
                </div>
    
                <div class="carrito-licor-precio">
                    <h3>Precio</h3>
                    <p>$${licor.precio}</p>
                </div>
    
                <div class="carrito-licor-subtotal">
                    <h3>Subtotal</h3>
                    <p>$${licor.precio * licor.cantidad}</p>
                </div>
                <button class="carrito-licor-eliminar" id="${licor.codigo}"><i class="bi bi-trash3-fill"></i></button>
            `
    
            carritoLicores.append(div)
    
        });
        
    
    }else{
    
        carritoVacio.classList.remove("disabled")
        carritoLicores.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
        carritoComprado.classList.add("disabled")

    }
    
    actBotonEliminar()
    actualizarTotal()

}

cargarLicoresAlCarrito()


function actBotonEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-licor-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){

    const idBoton = e.currentTarget.id
    
    const index = licoresEnCarrito.findIndex(licor => licor.codigo === parseInt(idBoton))
    licoresEnCarrito.splice(index, 1)
    cargarLicoresAlCarrito()


    localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))
}

botonVaciar.addEventListener("click", vaciarElCarrito)

function vaciarElCarrito(){

    licoresEnCarrito.length = 0
    localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))
    cargarLicoresAlCarrito()

}

function actualizarTotal(){

    const totalCalculado = licoresEnCarrito.reduce((acc, licor) => acc + (licor.precio * licor.cantidad), 0)
    totalCarrito.innerText = `$${totalCalculado}`

}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){

    licoresEnCarrito.length = 0
    localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))
    
        carritoVacio.classList.add("disabled")
        carritoLicores.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
        carritoComprado.classList.remove("disabled")
}