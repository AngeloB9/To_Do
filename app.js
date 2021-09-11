require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

//const { pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
  let opt = '';

  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    // Imprimir el menú
    opt = await inquirerMenu();
    //console.log({ opt });

    switch (opt) {
      case '1':
        //Crear tarea
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);

        break;
      case '2':
        //Listar tarea
        //console.log(tareas.listadoArr);
        tareas.listadoCompleto();
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== '0');
};

main();
