// ********************************************************
// * Montando el servidor en servidor lite
// ********************************************************

/*
Recordar que cuando usa ls en consola, es dir para nosotros en windows (ya que usa mac)

Para montar un servidor con lite server

1ero:
en terminal
cd desktop/
cd ProgFS/
cd JavaScript - Curso Intensivo/
cd Apuntes en app.js de videos/
 y donde tenga guardado el archivo html (llego a la carpeta y escribo: dir index.html por ej)

2do:

npm init (luego le doy todo enter hasta que me pregunte is this ok y le doy enter)
se ha creado en package.json

3ero:

en terminal(sin cerrarla): npm install lite-server --save-dev (se demora un toque)
se ha creado una nueva carpeta y archivo en la carpeta deel proyecto

4to:

en la seccion de scripts del package.json, me voy y pego esto (VisualStudio)
"dev": "lite-server" y guardo

5to:
si no directamente este paso para correrlo sin los pasos anteriores si ya lo hemos creado
en terminal: npm run dev (y ya me va a correr el servidor de servidorlite)

6to: 
se ejecuta en http://localhost:3000/
*/


// ********************************************************
// * Temas de la aplicacion
// ********************************************************

// usa la pagina bootswatch.com (utiliza bootstrap no?)
// elijo el tema -> pongo en download y le doy click derecho abrir en nueva pestaña al cssmin y copio
// la ruta y lo pego en un link en mi html, arriba del titulo

// ********************************************************
// * Para ver bootstrap y que los sitios sean responsive
// ********************************************************

// https://getbootstrap.com/docs/5.0/getting-started/introduction/ 
// de esa web nos guiamos pero ya tenemos conocimientos para hacerla

// TAMBIEN AGREGAR EL SCRIPT

// <script src="app.js"></script>


// ********************************************************
// * Definicion de las clases
// ********************************************************

class Libro {
    constructor(titulo, autor, isbn){
        this.titulo=titulo;
        this.autor=autor;
        this.isbn=isbn;
    }
}

class UI {
    static mostrarLibros(){
        const libros= Datos.traerLibros();
        libros.forEach((libro) => UI.agregarLibroLista(libro)); 
    }
    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list');

        const fila=document.createElement('tr');
        fila.innerHTML = `
              <td>${(libro.titulo)}</td>
              <td>${(libro.autor)}</td>
              <td>${(libro.isbn)}</td>
              <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        lista.appendChild(fila);
        

    }

    static eliminarLibro(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();

        }

    }

    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className= `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const container= document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div,form);

        setTimeout(() =>document.querySelector('.alert').remove(), 3000);

    }

    static limpiarCampos(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';

    }
}

class Datos{
    static traerLibros(){
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];
        }else{
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;

    }

    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));

    }

    static removerLibro(isbn){
        const libros = Datos.traerLibros();
        
        libros.forEach((libro,index) => {
            if(libro.isbn === isbn) {
                libros.splice(index,1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));

    }

}

//Carga de la pagina
document.addEventListener('DOMContentLoaded', UI.mostrarLibros());


//controlar el evento submit
document.querySelector('#libro-form').addEventListener('submit',(e) => {
    e.preventDefault();

    //Obtener valores de los campos
    const titulo= document.querySelector('#titulo').value;
    const autor= document.querySelector('#autor').value;
    const isbn= document.querySelector('#isbn').value;

    if(titulo === '' || autor === '' || isbn === ''){
        UI.mostrarAlerta('Por favor ingrese todos los datos','danger')
    }else{
        const libro= new Libro(titulo,autor,isbn)
        Datos.agregarLibro(libro);
        UI.agregarLibroLista(libro);
        UI.mostrarAlerta('Libro agregado a la colección','success')
        UI.limpiarCampos();
    }


    document.querySelector('#libro-list').addEventListener('click', (e) => {
        UI.eliminarLibro(e.target);
        Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
        UI.mostrarAlerta('Libro Eliminado','success');
    });

})