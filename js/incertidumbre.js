function wald(param_json){
  var matriz = param_json.matriz; 
  var esquema = param_json.esquema;
  var minimos = [];
  var minimo = 0;
  var maximos = [];
  var maximo= 0;
  if(esquema == 'rentabilidad'){ // se valida si el problema se debe trabajar sobre un esquema de rentabilidad, entonces
    for(var i in matriz){ // se recorre la matriz
      minimos.push(Math.min.apply(Math, matriz[i])); // se obtienen los mínimos de cada alternativa
    }
    maximo = Math.max.apply(Math, minimos); // después de haber obtenido los mínimos de cada i, se procede a obtener el máximo
    var proc = contar_repetidos(minimos, maximo); // se usa el método "contar_repetidos" para saber si hay algún empate en las alternativas
    var mensaje = "";
    for(var i in proc.posiciones){ 
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  "; // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
    }
    return mensaje; // se retorna el mensaje construido anteriormente
  }else if(esquema == 'costo'){ // se valida si el problema se debe trabajar sobre un esquema de rentabilidad, entonces
    for(var i in matriz){ // se obtienen los máximos de cada alternativa
      maximos.push(Math.max.apply(Math, matriz[i]));
    }
    minimo = Math.min.apply(Math, maximos); // después de haber obtenido los máximos de cada i, se procede a obtener el máximo
    var proc = contar_repetidos(maximos, minimo); // se usa el método "contar_repetidos" para saber si hay algún empate en las alternativas
    var mensaje = "";
    for(var i in proc.posiciones){
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  "; // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
    }
    return mensaje; // se retorna el mensaje construido anteriormente
  }  
}

function hurwicz(param_json){
  var matriz = param_json.matriz;
  var esquema = param_json.esquema;
  var alpha = param_json.alpha;
  var vector_pond = [];
  for(var j in matriz){
    var maximo = Math.max.apply(Math, matriz[j]); // se obtiene el máximo valor de cada alternativa 
    var minimo = Math.min.apply(Math, matriz[j]); // se obtiene el mínimo valor de cada alternativa 
    var sum_pond_tmp = (alpha * maximo) + ((1 - alpha) * minimo); // se realiza el poderado de cada alternativa, se realiza el producto entre el máximo y el alpha, y el producto 
                                                                  // entre el mínimo y 1 - alpha
    vector_pond.push(sum_pond_tmp); // se crea un vector con los resultados de cada ponderado
  }
  var maximo_hwcz = Math.max.apply(Math, vector_pond); // se obtiene el máximo valor de los que se encuentran en el vector de los ponderados
  var proc = contar_repetidos(vector_pond, maximo_hwcz); // se usa el método "contar_repetidos" para saber si hay algún empate en las alternativas
  var mensaje = "";
  for(var i in proc.posiciones){
    mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  "; // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
  }
  return mensaje; // se retorna el mensaje construido anteriormente
}

function laplace(param_json){
  var matriz = param_json.matriz;
  var esquema = param_json.esquema;
  var n = matriz[0].length;
  var probabilidad = 1/n;
  var matriz_sum = [];
  for(var j in matriz){ // se realiza el recorrido de la matriz para realizar una sumatoria
    var sum_tmp = 0;
    for(var i in matriz[j]){ // se recorren los valores de cada alternativa 
      sum_tmp += probabilidad * matriz[j][i]; // se realiza la sumatoria de los resultados del producto entre probabilidad y el valor de la alternativa
    }
    matriz_sum.push(sum_tmp); // se crea un nuevo vector con los valores de cada sumatoria 
  }
  if(esquema == 'rentabilidad'){ // se valida si se trabajará un esquema de valores de rentabilidad
    var maximo = Math.max.apply(Math, matriz_sum); // se obtiene el máximo valor de los resultados presentes en el vector que contiene la sumatoria 
    var proc = contar_repetidos(matriz_sum, maximo); // se usa el método "contar_repetidos" para saber si hay algún empate en las alternativas
    var mensaje = "";
    for(var i in proc.posiciones){
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  "; // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
    }
    return mensaje; // se retorna el mensaje construido anteriormente
  }else if(esquema == 'costo'){ // se valida si se trabajará un esquema de valores de costos
    var minimo = Math.min.apply(Math, matriz_sum); // se obtiene el mínimo valor de los resultados presentes en el vector que contiene la sumatoria 
    var proc = contar_repetidos(matriz_sum, minimo); // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
    var mensaje = "";
    for(var i in proc.posiciones){
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  "; // se construye el mensaje de retorno con la(s) mejor(es) alternativas 
    }
    return mensaje; // se retorna el mensaje construido anteriormente
  }
}

 /**
  * Función que cuenta si existen valores repetidos apartir de un arreglo y un elemento que sirve de base para la evaluación.
  * Retorna un json con un contador (cantidad de veces que se repite el elemento) y las posiciones en las que se encuentran los elementos repetidos.
 */
function contar_repetidos(arreglo, elemento){
  var contador = 0;
  posiciones = [];
  for(var i in arreglo){
    if(arreglo[i] == elemento){
      contador++;
      posiciones.push(i);
    }
  }
  return {contador: contador, posiciones: posiciones};
}


