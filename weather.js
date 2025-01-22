let sub = document.querySelector(".searchbar-icon")
sub.addEventListener('click',search);


function search(){
    var search = document.getElementById("input");
    alert( search.value);

}
const apiurl ='https://login.meteomatics.com/api/v1/token';
fetch(apiurl)
.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });