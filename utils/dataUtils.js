
import fs from 'fs';


//leer datos de los archivos json
export const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return [];
  }
};
//escribir datos en los archivos json
export const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error al escribir el archivo:", error);
  }
}