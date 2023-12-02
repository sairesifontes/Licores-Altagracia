const contenedorLicores = document.querySelector(".container-licores")
const botonesCategoria = document.querySelectorAll(".boton-categoria")
const tituloCategorias = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".licor-agregar")
const nroCantidadCarrito = document.querySelector(".numero-carrito")
const buscarPorNombre = document.querySelector("#buscar")



function cargarLicoresHTML(categoriaElegida) {

    contenedorLicores.innerHTML = "" 
    
        categoriaElegida.forEach(licor => {

            const div = document.createElement("div")
            div.classList.add("licores")
            div.innerHTML = `
            <img class="licor-imagen" src="${licor.imagen}" alt="${licor.nombre}">
            <div class="licor-detalles">
                <h3 class="licor-titulo">${licor.nombre}</h3>
                <p class="licor-precio">$${licor.precio}</p>
                <button class="licor-agregar" id="${licor.codigo}">Agregar</button>
            </div>    
        `;
        contenedorLicores.append(div)
    })    
    actBotonAgregar()
}


cargarLicoresHTML(licores)

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        
        
        if(e.currentTarget.id === "todos"){
            cargarLicoresHTML(licores)
            tituloCategorias.innerText = "TODOS LOS PRODUCTOS"
        }else{
            const licoresCategoria = licores.filter(licor => licor.categoria === e.currentTarget.id);
            cargarLicoresHTML(licoresCategoria)

            const textoCategoria = licores.find(licor => licor.categoria === e.currentTarget.id);
            
            tituloCategorias.innerText = textoCategoria.categoria.toUpperCase()
        }
    })
})


buscarPorNombre.addEventListener("input", ()=> {
    let buscar = buscarPorNombre.value.trim().toLowerCase()
    let licoresRestantes = licores.filter((licor) => licor.nombre.toLowerCase().includes(buscar))
    cargarLicoresHTML(licoresRestantes)
})


function actBotonAgregar() {

    botonesAgregar = document.querySelectorAll(".licor-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


const licoresEnCarrito = []

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
}

function actualizaNroCarrito(){
    let nro = licoresEnCarrito.reduce((acc,licor) => acc + licor.cantidad, 0)
    nroCantidadCarrito.innerText = nro
}