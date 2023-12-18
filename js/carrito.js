let licoresEnCarrito = localStorage.getItem("mi-carrito") 
licoresEnCarrito = JSON.parse(localStorage.getItem("mi-carrito"))


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
                    <p>$ ${licor.precio}</p>
                </div>
    
                <div class="carrito-licor-subtotal">
                    <h3>Subtotal</h3>
                    <p>$ ${licor.precio * licor.cantidad}</p>
                </div>
                <button class="carrito-licor-eliminar" id="${licor.codigo}"><i class="bi bi-trash3-fill"></i></button>
            `
    
            carritoLicores.append(div)
    
        });
        
        actBotonEliminar()
        actualizarTotal()
    
    }else{
    
        carritoVacio.classList.remove("disabled")
        carritoLicores.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
        carritoComprado.classList.add("disabled")

    }

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

    const licorEliminado = licoresEnCarrito[index].nombre

    licoresEnCarrito.splice(index, 1)
    cargarLicoresAlCarrito()

    localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))

    Toastify({
        text: `Se eliminó ${licorEliminado} del carrito.`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #ddbd48, #96c93d)",
            borderRadius: '2rem',
            fontSize: '1.2rem'
        },
        offset: {
            x: '1.5rem', 
            y: '5rem' 
        },
        onClick: function(){} // Callback after click
    }).showToast();
}

botonVaciar.addEventListener("click", vaciarElCarrito)


function vaciarElCarrito(){

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se van a eliminar todos los productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            licoresEnCarrito.length = 0
            localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))
            cargarLicoresAlCarrito()
            Swal.fire({
                title: "Eliminado",
                text: "Tus productos fueron eliminados correctamente",
                icon: "success"
            });
        }
    });

}

function actualizarTotal(){

    const totalCalculado = licoresEnCarrito.reduce((acc, licor) => acc + (licor.precio * licor.cantidad), 0)
    totalCarrito.innerText = `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){
    
    Swal.fire({
        title: "¿Quieres finalizar tu compra?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Compra finalizada con éxito",
                showConfirmButton: false,
                timer: 1500
            });


            licoresEnCarrito.length = 0
            localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))
            
                carritoVacio.classList.add("disabled")
                carritoLicores.classList.add("disabled")
                carritoAcciones.classList.add("disabled")
                carritoComprado.classList.remove("disabled")
        };
    })
}