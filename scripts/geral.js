 // request principal
 function httpGet(theUrl)
{
    try {

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); 
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);

    } catch (ex) {
        throw ex;
    }
  
}
// tentativas
function Solicitar(url){
    var jsonObj = null;
    try {
    jsonObj =  httpGet(url);
    } catch (ex) {
        jsonObj = false;
    }
    return jsonObj;
}

// pagina home
function HomeLoadPage() {
    let jsonObj = null;

    jsonObj =  Solicitar("https://swapi.py4e.com/api/");
  if (jsonObj == false) {
    Solicitar("https://swapi.py4e.com/api/");
  }


let html = "";
  for (var key of Object.keys(jsonObj)) {
   
    html += "<button class='btn-default' onclick=ClickCategory('"+ jsonObj[key] +"') > "+ key +" </button>";
   
  }

document.getElementById("principal").innerHTML = html;

} 

function ClickCategory(param){
    window.location.href = "categoria.html?params=" + param;
}


// pagina de categoria

function CategoriaLoadPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let url_category = urlParams.get('params')
    console.log(url_category)
    localStorage.setItem("url_category",url_category);
    var list_arr = url_category.split('/');
    
    var stateObj = { parms: list_arr[list_arr.length - 2] };
    window.history.replaceState(stateObj, '', "categoria.html?" + list_arr[list_arr.length - 2] + "/");
    
    

}

function MostrarDados() {

  let url_category = localStorage.getItem("url_category");

  var objJson = httpGet(url_category);

  let html = "";
  for (var key of Object.keys(objJson.results)) {

    if (typeof objJson.results[key] === 'object') {

      for (var key_obj of Object.keys(objJson.results[key])) { 
        html +=  "<span>" + key_obj + ": </span> " + "<label>" + objJson.results[key][key_obj] + "</label> </br>";
      }

    } else {
      html +=  "<span>" + key + ": </span> " + " <label>" + objJson.results[key] + "</label> </br>";
    }
 
  }

  document.getElementById("mostra_dados").innerHTML = html;

}

function LimpaDados(){
  document.getElementById("mostra_dados").innerHTML = "";
}