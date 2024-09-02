
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const registrosPagina = 30;
const paginacionDiv = document.querySelector('#paginacion');

let paginaActual;
let totalPaginas;
let iterador;


window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta('Agrega un termino de Busqueda');

        return
    }

    paginaActual = 1;
    buscarImagenes();
}

function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-200');

    if (!existeAlerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mx-w-lg', 'mx-auto', 'text-center');
        alerta.innerHTML = `
            <strong class='font-bold'>¡Error!</strong>
            <span class='block sm:inline'>${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}

async function buscarImagenes(){
    const termino = document.querySelector('#termino').value;

    const key = '45600336-d6930e7350d6709c242e95ffd';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPagina}&page=${paginaActual}`;
    
    // fetch(url)
    //     .then ( respuesta => respuesta.json())
    //     .then ( resultado =>{
    //         totalPaginas = calcularPaginas(resultado.totalHits);
    //         mostrarImagenes(resultado.hits)
    //     })

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        totalPaginas = calcularPaginas(resultado.totalHits);
        mostrarImagenes(resultado.hits)
    } catch (error) {
        console.log(error);
    }
        
}

//Generador que va a registrar la cantidad d elementos de acuerdo a las paginas
function *crearPaginador(total){
    for (let i = 1; i <= total; i++) {
        yield(i);
        
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total / registrosPagina))
}

function mostrarImagenes(imagenes){
    
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    // Validar que el arreglo de imagenes tenga contenido
    if(imagenes.length === 0) {
        mostrarAlerta('No hay resultados, intenta con otro término de búsqueda');
        return;
    }

    //Iterar sobre el arrelgo de imagenes y consturir el HTML
    imagenes.forEach( imagen => {
        const { webformatURL, likes, views, largeImageURL } = imagen

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white">
        <img class='w-full' src="${webformatURL}">
                <div class="p-4">
                    <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                    <p class="font-bold">${views} <span class="font-light">Vistas</span></p>

                    <a 
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen
                    </a>
                </div>
            </div>
        </div>
        `;
    });

    //Generamos el HTML
    imprimirPaginador();

}

function imprimirPaginador(){
    
    //Limpiar el paginador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    iterador = crearPaginador(totalPaginas);

    while (true) {
        const { value, done} = iterador.next();

        if (done) return;

        //Caso contrario, genera un boton por cada elemento en el generador

        const boton = document.createElement('button');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-1', 'rounded');

        boton.onclick = () =>{
            paginaActual = value;

            buscarImagenes()
        }

        const botonActual = parseInt(boton.dataset.pagina);
        if(botonActual === paginaActual) {
            boton.classList.remove('bg-yellow-400');
            boton.classList.add('bg-green-400');
        }

        paginacionDiv.appendChild(boton)
    }
}