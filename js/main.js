const data = [
  {
    name: "C++",
    image: "resources/cpp.png",
    doc: "resources/cpp.txt"
  },

  { 
    name: "Swift",
    image: "resources/swift.jpg",
    doc: "resources/swift.txt"
  },
  {
    name: "C#",
    image: "resources/csharp.png",
    doc: "resources/csharp.txt"
  }
];


class Card {

  constructor(name, imageSource, callback) {
    this.imageSource = imageSource;
    this.name = name;
    this.callback = callback;
  }

  divElement() {
    var mainCard = document.createElement("div");
    mainCard.setAttribute("class", "card");

    var img = document.createElement("img");
    img.setAttribute("src", this.imageSource);
    img.setAttribute("class", "card--image");

    var h1 = document.createElement("h1");
    h1.setAttribute("class", "card--title");
    h1.innerHTML = this.name;

    mainCard.appendChild(img);
    mainCard.appendChild(h1);
    mainCard.addEventListener("click", this.callback);

    return mainCard
  }

}

class ResourceLoader {

  constructor(path) {
    this.path = path;
  }

  load(callback) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               callback(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", this.path, true);
    xmlhttp.send();

  }

}

class Overlay {

  constructor() {
    var mainOverlay = document.createElement("div");
    mainOverlay.setAttribute("id", "overlay");

    var overlayText = document.createElement("div");
    overlayText.setAttribute("id", "overlay-text");
    mainOverlay.appendChild(overlayText);
    var self = this; 
    mainOverlay.addEventListener("click", function() { self.hide(); });

    this.mainOverlay = mainOverlay;
    this.overlayText = overlayText;

  }

  showInside(element, text) {
    element.appendChild(this.mainOverlay);
    this.overlayText.innerHTML = text;
    this.mainOverlay.style.display = "block";
  }

  hide() {
    this.mainOverlay.parentNode.removeChild(this.mainOverlay);
  }

} 

function installServiceWorker() {
  if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
}

function main() {
  const overlay = new Overlay();
  const container = document.querySelector(".container");

  data.forEach((val,index) => {
    const card = new Card(val.name, val.image, function() {
      const rl = new ResourceLoader(val.doc);
      rl.load(function(text) {
         overlay.showInside(container, text);
      });

    });

    container.appendChild(card.divElement());

  });
  
  installServiceWorker();
}

document.addEventListener("DOMContentLoaded", main);