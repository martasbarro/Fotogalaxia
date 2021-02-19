  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
  })

var opcionFecha = 0;
var results = [];


  document.getElementById("formularioFechaUnica").addEventListener("submit", function(event){
    event.preventDefault();
      fetch(`https://api.nasa.gov/planetary/apod?api_key=EzqMa2XFfNe6fT2ymOIRVdwQg4Y1ej2v03ZLZlfR&date=${document.getElementById("date").value}`, {

      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      results= r;
      console.log(r)
      if(results.code == 400){
          alert("Fecha no disponible. Introduce una fecha desde Jun 16, 1995 hasta hoy.");
        }else{
        console.log("Actualizando fotos");
        actualizarFotos();
        }
    })
    .catch(e => {
      console.error("Error " + e);
    })
    return false;
  })

    document.getElementById("formularioEntreFechas").addEventListener("submit", function(event){
    event.preventDefault();
      fetch(`https://api.nasa.gov/planetary/apod?api_key=EzqMa2XFfNe6fT2ymOIRVdwQg4Y1ej2v03ZLZlfR&start_date=${document.getElementById("start_date").value}&end_date=${document.getElementById("end_date").value}`, {

      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      results= r;
      console.log(r)
      if(results.code == 400){
          alert("Intoduzca un rango de fechas coherente ente Jun 16, 1995 hasta hoy.");
        }else{
        console.log("Actualizando fotos");
        actualizarFotos();
        }


    })
    .catch(e => {
      console.error("Error " + e);
    })
    return false;
  })

    document.getElementById("formularioFechasRandom").addEventListener("submit", function(event){
    event.preventDefault();
      fetch(`https://api.nasa.gov/planetary/apod?api_key=EzqMa2XFfNe6fT2ymOIRVdwQg4Y1ej2v03ZLZlfR&count=${document.getElementById("count").value}`, {

      headers: {
        Accept: 'application/json'
      },
      method: 'GET'
    })
    .then(res => {
      console.log("Response here")
      return res.json()
    })
    .then(r => {
      results= r;
      console.log(r)
      if(results.code == 400){
          alert("Una de las imágenes seleccionadas aleatoriamente no está disponible. Vuelva a intentarlo.");
        }else{
        console.log("Actualizando fotos");
        actualizarFotos();
        }
    })
    .catch(e => {
      mostrarAlerta();      
    })
    return false;
  })

function validarOpcion(){
  var ele = document.getElementsByName('opcionFecha');
  for(i=0; i<ele.length; i++){
    if(ele[i].checked){
      var valor= parseInt(ele[i].value);
      opcionFecha=valor;
    }
  }
  if(valor==1){
    document.getElementById('formularioFechaUnica').style.display='block';
    document.getElementById('formularioEntreFechas').style.display='none';
    document.getElementById('formularioFechasRandom').style.display='none';
    searchForm = document.getElementById("formularioFechaUnica");
  } else if (valor==2){
    document.getElementById('formularioFechaUnica').style.display='none';
    document.getElementById('formularioEntreFechas').style.display='block';
    document.getElementById('formularioFechasRandom').style.display='none';
    searchForm = document.getElementById("formularioEntreFechas");
  } else if (valor==3){
    document.getElementById('formularioFechaUnica').style.display='none';
    document.getElementById('formularioEntreFechas').style.display='none';
    document.getElementById('formularioFechasRandom').style.display='block';
    searchForm = document.getElementById("formularioFechasRandom");
  }
}

  function actualizarFotos(){
    let html = '';
    
    if (opcionFecha==1){
      html += '<div class="container" style="margin:3rem;">'
                          +'<div class="row" >'
                            + '<div class="col-sm-4">'
                              +`<img src="${results.hdurl}" style="width:100%;">`
                            + '</div>'
                            + '<div class="col-sm-8">'
                              + '<div class="row">'
                                +  `<h5 class="tituloFoto">${results.title}</h5>`
                              +'</div>'
                                + '<div class="row">'
                                  + `<h2 class="subtituloFoto">${results.date}</h2>`
                                +'</div>'
                            
                              + '<div class="row">'
                                + '<button class="btn btn-secondary" type="button" style="font-size:20px;" data-bs-toggle="collapse" data-bs-target="#collapseDescripcion" aria-expanded="false" aria-controls="collapseDescripcion">Descripción</button>'
                                + '<div class="collapse" id="collapseDescripcion" >'
                                  +'<div class="card card-body">'
                                    + `<p> ${results.explanation}</p>`
                                  +'</div>'
                                +'</div>'
                              +'</div>'
                            +'</div>'
                          +'</div>'
                       +'</div>';
    } else if (opcionFecha ==2){
      results.forEach(function(foto, i){
                html += '<div class="container" style="margin:3rem;">'
                          +'<div class="row" >'
                            + '<div class="col-sm-4">'
                              +`<img src="${foto.hdurl}" style="width:100%;">`
                            + '</div>'
                            + '<div class="col-sm-8">'
                              + '<div class="row">'
                                +  `<h5 class="tituloFoto">${foto.title}</h5>`
                              +'</div>'
                                + '<div class="row">'
                                  + `<h2 class="subtituloFoto">${foto.date}</h2>`
                                +'</div>'
                            
                              + '<div class="row">'
                                + `<button class="btn btn-secondary" type="button" style="font-size:10px;" data-bs-toggle="collapse" data-bs-target="#collapseDescripcion" aria-expanded="false" aria-controls="collapseDescripcion">Descripción</button>`
                               
                                + '<div class="collapse" id="collapseDescripcion" >'
                                  +'<div class="card card-body">'
                                    + `<p> ${foto.explanation}</p>`
                                  +'</div>'
                                  
                                +'</div>'
                              +'</div>'
                            +'</div>'
                          +'</div>'
                       +'</div>'
                       + '<hr class="separadorBlanco"/>';
                  
      })


    }  else if (opcionFecha == 3) {
      results.forEach(function(foto, i){
                html += '<div class="container" style="margin:3rem;">'
                          +'<div class="row" >'
                            + '<div class="col-sm-4">'
                              +`<img src="${foto.hdurl}" style="width:100%;">`
                            + '</div>'
                            + '<div class="col-sm-8">'
                              + '<div class="row">'
                                +  `<h5 class="tituloFoto">${foto.title}</h5>`
                              +'</div>'
                                + '<div class="row">'
                                  + `<h2 class="subtituloFoto">${foto.date}</h2>`
                                +'</div>'
                            
                              + '<div class="row">'
                                + `<button class="btn btn-secondary" type="button" style="font-size:10px;" data-bs-toggle="collapse" data-bs-target="#collapseDescripcion" aria-expanded="false" aria-controls="collapseDescripcion">Descripción</button>`
                               
                                + '<div class="collapse" id="collapseDescripcion" >'
                                  +'<div class="card card-body">'
                                    + `<p> ${foto.explanation}</p>`
                                  +'</div>'
                                  
                                +'</div>'
                              +'</div>'
                            +'</div>'
                          +'</div>'
                       +'</div>'
                       + '<hr class="separadorBlanco"/>';
                  
      })
    } 
    
    document.getElementById("container-cards").innerHTML = html;
  }
