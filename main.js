const { Telegraf } = require('telegraf');
const { measureMemory } = require('vm');
const XLSX = require('xlsx');


const bot = new Telegraf('6180396840:AAGxmFRlr5tRw2-u7iZUT2IUsXl2GhdSYNQ');
const helpMessage = "¿Cómo te podría ayudar?";

bot.start((ctx)=>{
    ctx.reply('¡Hola!, soy el bot de DDA.')
    ctx.reply("Por favor, explicame ¿cómo te podría ayudar?");
})
bot.help((ctx)=>{
    ctx.reply(helpMessage);
})
bot.on('message', (ctx) => {
  const messageText = ctx.message.text;
  const chatId = ctx.chat.id;

  if (messageText.toLowerCase().includes('buenos dias')){
        ctx.reply("Buenas noches");
    }
  if (messageText.toLowerCase().includes('hola')){
    ctx.reply("¡Hola!");
  }
  if (messageText.toLowerCase().includes('bloqueado')) {
    ctx.reply('¿Qué deseas hacer?');
  } else {
    
  }
  switch (messageText.toLowerCase()) {
    case 'opcion 1':
      ctx.reply('Has seleccionado la Opción 1');
      break;
    case 'opcion 2':
      ctx.reply('Has seleccionado la Opción 2');
      break;
    case 'opcion 3':
      ctx.reply('Has seleccionado la Opción 3');
      break;
    case 'opcion 4':
      ctx.reply('Has seleccionado la Opción 4');
      break;
    default:
    //   ctx.reply(`Mensaje recibido en el chat ${chatId}: ${messageText}`);
      break;
  }
});

// Leer datos de un archivo Excel
const workbook = XLSX.readFile('backend_alumnos.xlsx');
const worksheet = workbook.Sheets['Alumnos'];

// Obtener todos los registros de la tabla
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
// Imprimir todos los registros en la consola
console.log('Registros de Alumnos:');
data.forEach((row, index) => {
    // Imprimir datos de cada registro
    console.log(row.join(' | '));
});




// Función de búsqueda por CURP
function buscarAlumnoPorCurp(curp) {
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const columnaCurp = 'Curp';
    const columnaNombre = 'Name';
    const columnaApellido = 'Last_name';
    const columnaEmail = 'Email';
  
    const resultados = data.filter((row) => row[columnaCurp] === curp);
  
    if (resultados.length > 0) {
      const nombre = resultados[0][columnaNombre];
      const apellido = resultados[0][columnaApellido];
      const email = resultados[0][columnaEmail];
  
      return `Resultado de búsqueda:\nNombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}`;
    } else {
      return `No se encontraron resultados para la CURP: ${curp}`;
    }
  }
  
  // Manejar todos los mensajes
  bot.on('text', (ctx) => {
    const message = ctx.message.text.toLowerCase();
  
    if (message === 'no recuerdo mi usuario') {
      ctx.reply('¿Cuál es tu CURP?');
    } else if (message.startsWith('/curp ')) {
      const curp = message.split(' ')[1];
      const resultado = buscarAlumnoPorCurp(curp);
      ctx.reply(resultado);
    }
  });

bot.launch();