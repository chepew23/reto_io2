
//Funcion que generar encabezado, cuerpo y pie de la tabla, 
function generaTabla(){
  
  vn_columnas = $("#estados").val();   
  vn_filas = $("#alternativas").val(); 

  removerTabla();//Remueve toda la tabla(para volver a generarla)
  generarHead();//Crear titulos o encabezado
  generarBody();//Crea cuerpo de la tabla(input de los valores)
  generaFooter();//Crea footer donde van las probabilidades

  $("#tbMatriz").html(thead + tbody + tfoot);
}

/*TBODY
Función que crea cuerpo de la tabla(input de los valores),
dependiendo la cantidad de alternativas y estados de la naturaleza*/
function generarBody(){
    
  tbody = "<tbody>";
  for (var i = 1; i <= vn_filas; i++) {

    tbody += "<tr><td>Alternativa " + i + "</td>";

    for (var j = 1; j <= vn_columnas; j++) {

      tbody += "<td><input type='number' id='x" + i + j + "' class='form-control' value='0.0' step='any'></td>";
    };

    tbody += "</tr>";
  };

  tbody += "</tr></tbody>";

}

/*THEAD
Función que crear titulos o encabezado dependiendo la cantidad de estados de la naturaleza*/
function generarHead(){

    
  thead = "<thead><tr><th>Alternativas</th>";
  for (var i = 1; i <= vn_columnas; i++) {
    thead += "<th>Estado "+ i +"</th>";
  };

  thead += "</tr></thead>";

  

}

/*TFOOT
Función que crea footer donde van las probabilidades dependiendo la cantidad de estados de la naturaleza*/
function generaFooter(){

      
  tfoot = "<tfoot><tr><th>Probabilidades</th>";
  for (var i = 1; i <= vn_columnas; i++) {
    tfoot += "<th><input type='number' id='p" + i +"' class='form-control' value='0.0' step='any'></th>";
  };

  tfoot += "</tr></tfoot>";

  
}

//remueve el contenido de la tabla
function removerTabla(){

  $("#tbMatriz thead").remove();
  $("#tbMatriz tbody").remove();
  $("#tbMatriz tfoot").remove();
}

/*
Función que genera la matriz con los datos ingresados en el formulario {Xij}*/
function generaMatriz(){
  matriz = [];

  for (var i = 1; i <= vn_filas; i++) {
    var va_filas = [];
    for (var j = 1; j <= vn_columnas; j++) {
      var valor = $("#x" + i + j).val();
      if (valor != "" ) {
        va_filas.push(parseFloat($("#x" + i + j).val())); 
      }else{
        va_filas.push(0); 
      }
          
    };
    matriz.push(va_filas);    
  };

}

/*
Función que genera la matriz con las Probabilidades ingresadas en el formulario {Pj}*/
function generaProbabilidades(){
  va_prob = [];

  
    for (var j = 1; j <= vn_columnas; j++) {
      var valor = $("#p" + j).val();
      if (valor != "" ) {
        va_prob.push(parseFloat($("#p" + j).val())); 
      }else{
        va_prob.push(0); 
      }
          
    };
    
  
}