fetch('https://api.nasa.gov/planetary/apod?api_key=EzqMa2XFfNe6fT2ymOIRVdwQg4Y1ej2v03ZLZlfR', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.t
    headers: {
       Accept: 'application/json'
    },
 })
.then(res => res.json())
.then(r => {
  results=r;
  console.log('Success:')
  mostrarFoto();
})
.catch((error) => {
  console.error('Error:', error);
})

function mostrarFoto(){
  let html = '';
  html += '<div class="container" style="margin:3rem 3rem;">'
           +'<div class="row" >'
              +`<img src="${results.hdurl}" style="width:80%;">`
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
  document.getElementById("fotodia").innerHTML = html;
}