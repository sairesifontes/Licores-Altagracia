
//array de productos en cuestion

let licores = []

// aplicando fetch
fetch("./js/licores.json")
    .then(response => response.json())
    .then(data => {
        licores = data    
        cargarLicoresHTML(licores)
})




const contenedorLicores = document.querySelector(".container-licores")
const botonesCategoria = document.querySelectorAll(".boton-categoria")
let botonesAgregar = document.querySelectorAll(".licor-agregar")
const nroCantidadCarrito = document.querySelector(".numero-carrito")
const buscarPorNombre = document.querySelector("#buscar")



// carga las card del HTML de cada producto

function cargarLicoresHTML(categoriaElegida) {

    contenedorLicores.innerHTML = "" 
    
        categoriaElegida.forEach(licor => {

            const div = document.createElement("div")
            div.classList.add("licores")
            div.innerHTML = `
            <img class="licor-imagen" src="${licor.imagen}" alt="${licor.nombre}">
            <div class="licor-detalles">
                <h3 class="licor-titulo">${licor.nombre}</h3>
                <p class="licor-precio">$ ${licor.precio}</p>
                <button class="licor-agregar" id="${licor.codigo}">Agregar al carrito</button>
            </div>    
        `;
        contenedorLicores.append(div)
    })    
    actBotonAgregar()
}



// para actualizar los productos con respecto a la categoria

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        
        if(e.currentTarget.id === "todos"){
            cargarLicoresHTML(licores)
        }else{
            const licoresCategoria = licores.filter(licor => licor.categoria === e.currentTarget.id);
            cargarLicoresHTML(licoresCategoria)
        }
    })
})


// funcion para buscar en el input por nombre 

buscarPorNombre.addEventListener("input", () => {
    let buscar = buscarPorNombre.value.trim().toLowerCase();
    let licoresRestantes = licores.filter((licor) => {
        return licor.nombre && licor.nombre.toLowerCase().includes(buscar);
    });
    cargarLicoresHTML(licoresRestantes);
});



// agregar al carrito

function actBotonAgregar() {

    botonesAgregar = document.querySelectorAll(".licor-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


let licoresEnCarrito = []

let licoresEnCarritoLS = localStorage.getItem("mi-carrito")



// actualiza el numero de licores en el carrito

if(licoresEnCarritoLS){
    licoresEnCarrito = JSON.parse(licoresEnCarritoLS)
    actualizaNroCarrito()
}else{
    licoresEnCarrito = []
}


// agrega al carrito

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id
    const licorAgregado = licores.find(licor => licor.codigo === parseInt(idBoton))

    if(licoresEnCarrito.some(licor => licor.codigo === parseInt(idBoton))){
        const index = licoresEnCarrito.findIndex(licor => licor.codigo === parseInt(idBoton))
        licoresEnCarrito[index].cantidad++
    }else{
        licorAgregado.cantidad = 1
        licoresEnCarrito.push(licorAgregado)
    }

    actualizaNroCarrito()

    localStorage.setItem("mi-carrito", JSON.stringify(licoresEnCarrito))


    Toastify({
        text: `Se agregó ${licorAgregado.nombre} al carrito🍺.`,
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
        onClick: function(){} 
    }).showToast();
}



// actualiza el numero del carrito
function actualizaNroCarrito(){
    let nro = licoresEnCarrito.reduce((acc,licor) => acc + licor.cantidad, 0)
    nroCantidadCarrito.innerText = nro
}
