var iname = document.getElementById("formInput1");
var iurl = document.getElementById("formInput2");
var closebtn = document.getElementById("closeBtn");
var deleteAll = document.getElementById("deleteAll");
var mybox = document.querySelector(".mybox");

var mylist;
var removeValid;

var mood = "Add Product";
var temp;

if( localStorage.getItem("website") !== null ) {
mylist = JSON.parse( localStorage.getItem("website")) ;

display();

}
else {
  mylist = [];
}


function add(){
  if ( validateinput( iname.id,iname.value ) == true && validateinput( iurl.id, iurl.value ) == true ){

    var mywebsite = {
    webname : iname.value,
    myurl : iurl.value,
  }

  if ( mood === "Add Product") {

    
    mylist.push(mywebsite);
    localStorage.setItem( "website", JSON.stringify(mylist) );
    
    display();
    resetinputs();
  }
  else {
    mylist[temp] = mywebsite;
      document.getElementById("updateProduct").style.display = "none";
      document.getElementById("add").style.display = "inline-block";
      mood = "Add Product"
      localStorage.setItem('website', JSON.stringify(mylist) );
      
      display();
      resetinputs();
  }
}
  else {
    mybox.classList.replace("d-none", "d-flex");
  }

  removeValid.classList.remove("is-valid");
  removeValid.classList.remove("is-invalid")
}


function display() {
  var contaner = ``;

  for( var i = 0; i < mylist.length; i++){
    contaner += `
    <tr class = "text-center ">
      <th scope="row">${i + 1}</th>
      <td >${mylist[i].webname}</td>
      <td><button  type="button" class="btn btn-success"> <i class="fa-solid fa-eye pe-1"></i>  <a href="${mylist[i].myurl}" target="_blank" class="text-light text-decoration-none ">visit</a></button></td>
      <td><button onclick="deleterow(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>
      <td><button onclick="updateElment(${i})" class="btn btn-warning">Update <i class="fa-solid fa-pen ms-1"></i></button></td>
    </tr>`;
  }

  document.getElementById("websites").innerHTML = contaner;

  if( mylist.length > 1 ) {
    deleteAll.classList.replace("d-none", "d-block");
  }
  else{
    deleteAll.classList.replace("d-block", "d-none");
  }
}




function updateElment(i) {
  iname.value = mylist[i].webname;
  iurl.value = mylist[i].myurl;
  
  document.querySelector("button.sub").style.display = "none";
  document.getElementById("updateProduct").style.display = "inline-block";

  mood = 'update';
  temp = i;
}


function resetinputs() {
  iname.value = "";
  iurl.value = "";
}

function deleterow(index){
  mylist.splice(index, 1);

  display();
  localStorage.setItem("website", JSON.stringify(mylist));
}


var myInputs = document.querySelectorAll(".myform input");

for( var i = 0 ; i < myInputs.length ; i++ ){
  myInputs[i].addEventListener("input", function(e){
  validateinput(e.target.id, e.target.value);
  })
}


function searchElement( term ) {

  var serchValue = '';

  for( var i = 0; i < mylist.length; i++ ) {

    if( mylist[i].webname.toLowerCase().includes( term.toLocaleLowerCase()) == true){

      serchValue += `
      <tr class = "text-center ">
        <th scope="row">${i + 1}</th>
        <td>${mylist[i].webname}</td>
        <td><button  type="button" class="btn btn-success"> <i class="fa-solid fa-eye pe-1"></i>  <a href="${mylist[i].myurl}" target="_blank" class="text-light text-decoration-none ">visit</a></button></td>
        <td><button onclick="deleterow(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>
        <td><button onclick="updateElment(${i})" class="btn btn-warning">Update <i class="fa-solid fa-pen ms-1"></i></button></td>
      </tr>
      `
    }
  }

  document.getElementById('websites').innerHTML = serchValue;

}


function validateinput(id, value){

  var el = document.getElementById(id);
  removeValid = el;
  var regex = {
    formInput1: /^[A-Za-z][a-z0-9]{3,30}$/,
    formInput2: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  }

  if( regex[id].test(value) == true ){
    el.classList.add("is-valid");
    el.classList.remove("is-invalid");
    return true;
  }
  else{
    el.classList.add("is-invalid");
    el.classList.remove("is-valid");
    return false;
  }

}

function closebttn(){
  mybox.classList.replace("d-flex", "d-none");
};

function deleteAlle() {
  mylist = [];
  localStorage.setItem("website", JSON.stringify(mylist));
  document.getElementById("websites").innerHTML='';
  deleteAll.classList.replace("d-block", "d-none");
};