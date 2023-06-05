const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("header").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "/src/view/header/header.html");
  xhttp.send();