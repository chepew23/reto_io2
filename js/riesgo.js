
/*Función que obtiene matriz con los valores ingresados y resuelve por el criterio de valor esperado */
function valor_esperado(param_json){
	var matriz = param_json.matriz;//Obtiene matriz con valores
  var esquema = param_json.esquema;//Obtiene Esquema(rentabilidad o costo)
  var v_probabilidades = param_json.probabilidades;//Obtiene Matriz de Probabilidades
	
	var maximo = 0;
	var minimo = 0;
	var v_esperado = [];

	//recorre la matriz por filas
	for(var i in matriz){
		var vn_valor = 0;
		var va_filas = matriz[i];//genera array con los valores de la fila
		//recorre cada filas para generar el valor esperado
		for(var j in va_filas){
			vn_valor += (va_filas[j] * v_probabilidades[j]);//Calcula valor esperado 
		}
		//almacena valor esperado
	  v_esperado.push(vn_valor);
	}//for(var i in matriz)

	if(esquema == 'rentabilidad'){		

    maximo = Math.max.apply(Math, v_esperado);//Metodo que devuelve el valor Maximo de un array de datos(valores esperados)
    var proc = contar_repetidos(v_esperado, maximo);//Función que obtiene alternativas donde exista empaque en la desición
    var mensaje = "";
    for(var i in proc.posiciones){
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  ";
    }

	}//if(esquema == 'rentabilidad')
	else if(esquema == 'costo'){

		minimo = Math.min.apply(Math, v_esperado);//Metodo que devuelve el valor Minimo de un array de datos(valores esperados)
    var proc = contar_repetidos(v_esperado, minimo);//Función que obtiene alternativas donde exista empaque en la desición
    var mensaje = "";
    for(var i in proc.posiciones){
      mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  ";
    }

	}
	return mensaje;//retorna mensaje con resultados de la desición
}//function valor_esperado(param_json)

/*Función que obtiene matriz con los valores ingresados y resuelve por el criterio de Dispersión */
function dispersion(param_json){
	var matriz = param_json.matriz;//Obtiene matriz con valores
	var esquema = param_json.esquema;//Obtiene Esquema(rentabilidad o costo)
	var v_probabilidades = param_json.probabilidades;//Obtiene Matriz de Probabilidades
	var v_k = param_json.v_k;//Obtiene valor de K=1
	
	var maximo = 0;
	var v_esperado = [];

	//recorre la matriz por filas
	for(var i in matriz){
		var vn_valor = 0;
		var va_filas = matriz[i];//genera array con los valores de la fila
		//recorre cada filas para generar el valor esperado
		for(var j in va_filas){
			vn_valor += (va_filas[j] * v_probabilidades[j]);//Calcula valor esperado
		}
		//almacena valor esperado
	  v_esperado.push(vn_valor);
	}//for(var i in matriz)

	var va_vmc = [];
	//recorre la matriz por filas
	for(var i in matriz){
		var vn_vmc = 0;
		var va_filas = matriz[i];//genera array con los valores de la fila
		//recorre cada filas para generar la varianza
		for(var j in va_filas){
			var va_varianza
			vn_vmc += (Math.pow((va_filas[j] - v_esperado[i]),2)  * v_probabilidades[j]); //Calcula Varianza
		}
		//almacena valor esperado
	  va_vmc.push((v_esperado[i] - (v_k * Math.sqrt(vn_vmc))));//Calcula el VMC
	}//for(var i in matriz)
	
	maximo = Math.max.apply(Math, va_vmc);//Metodo que devuelve el valor Maximo de un array de datos(VMC)
	var proc = contar_repetidos(va_vmc, maximo);//Función que obtiene alternativas donde exista empaque en la desición
	var mensaje = "";
	for(var i in proc.posiciones){
	  mensaje += "<b>A<sub>"+(parseInt(proc.posiciones[i]) + 1)+"</sub></b>  ";
	}

	return mensaje;//retorna mensaje con resultados de la desición
}//function valor_esperado(param_json)

/*Función que obtiene matriz con los valores ingresados y resuelve por el criterio de Maxima Probabilidad */
function maxima_probabilidad(param_json){
  var matriz = param_json.matriz;//Obtiene matriz con valores
  var esquema = param_json.esquema;//Obtiene Esquema(rentabilidad o costo)
  var v_probabilidades = param_json.probabilidades;//Obtiene Matriz de Probabilidades
  var maximo = 0;
  maximo = Math.max.apply(Math, v_probabilidades);//Metodo que devuelve el valor Maximo de un array de datos(Probabilidades)
	var proc = contar_repetidos(v_probabilidades, maximo);//Función que obtiene probabilidades donde exista empaque en el estados
	var mensaje = "";
	//Busca los maximos o minimos valores en J
	for(var i in proc.posiciones){
		if(esquema == 'rentabilidad'){
			var va_valoresest = [];
			//generar array de datos en forma de {Xj}
			for (var mi in matriz){
					var va_filas = matriz[mi];
					va_valoresest.push(va_filas[parseInt(proc.posiciones[i])]);
			}
			var maximo1 = Math.max.apply(Math, va_valoresest);//Metodo que devuelve el valor Maximo de un array de datos(Max{Xj})
			var proc1 = contar_repetidos(va_valoresest, maximo1);//Función que obtiene alternativas donde exista empaque en la desición
			//var mensaje = "";
			for(var i in proc1.posiciones){
			  mensaje += "<b>A<sub>"+(parseInt(proc1.posiciones[i]) + 1)+"</sub></b>  ";
			}
		}else if(esquema == 'costo'){
			var va_valoresest = []; //generar array de datos en forma de {Xj}
			for (var mi in matriz){
					var va_filas = matriz[mi];
					va_valoresest.push(va_filas[parseInt(proc.posiciones[i])]);
			}
			var minimo = Math.min.apply(Math, va_valoresest);//Metodo que devuelve el valor Minimo de un array de datos(Max{Xj})
			var proc1 = contar_repetidos(va_valoresest, minimo);//Función que obtiene alternativas donde exista empaque en la desición
			for(var i in proc1.posiciones){
			  mensaje += "<b>A<sub>"+(parseInt(proc1.posiciones[i]) + 1)+"</sub></b>  ";
			}
		}//else if(esquema == 'costo')
	}//for(var i in proc.posiciones)
	return mensaje;
}//function maxima_posibilidad()

/*Funcion que devuelve la posición en donde encontro el mismo valor seleccionado como mejor opción
si al tomar el maximo o minimo valor en un Xj hay empaque en diferente alternativas esta función las devuelve 
A1,A2
*/
function contar_repetidos(arreglo, elemento){
  var contador = 0;
  posiciones = [];
  console.log(arreglo);
  console.log(elemento);
  for(var i in arreglo){
    if(arreglo[i] == elemento){
      console.log(i);
      contador++;
      posiciones.push(i);
    }
  }
  return {contador: contador, posiciones: posiciones};
}