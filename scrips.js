const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;
const produktliste = document.querySelector(".produktliste");

document.querySelector("h2").textContent = cat; // vis bruger hvilken kategori der vies

document.querySelectorAll("#filtre button").forEach((knap) => knap.addEventListener("click", filtrer));

let alleData, udsnit;

fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    alleData = udsnit = data;
    visData(data);
  });

function filtrer(e) {
  console.log(e.target.textContent); // hvad står der i den knap der blev kikket på?
  console.log(alleData, udsnit);
  const valgt = e.target.textContent;
  if (valgt == "Alle") {
    udsnit = alleData;
  } else {
    udsnit = alleData.filter((element) => element.gender == valgt);
  }

  visData(udsnit);
}

document.querySelectorAll("#sortering button").forEach((button) => button.addEventListener("click", sorter));

function sorter(e) {
  const valgt = e.target.textContent;

  if (valgt == "Pris lav-høj") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (valgt == "Pris høj-lav") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (valgt == "A-Z") {
    udsnit.sort((a, b) => a.productdisplayname.localeCompare(b.productdisplayname));
  } else if (valgt == "Z-A") {
    udsnit.sort((a, b) => b.productdisplayname.localeCompare(a.productdisplayname));
  }

  visData(udsnit);
}

const visantal = document.querySelector("#filtre span");
function visData(json) {
  visantal.textContent = json.length;
  // console.log(json);
  produktliste.innerHTML = "";
  json.forEach((element) => {
    const tilbudspris = Math.round(element.price - (element.price * element.discount) / 100);
    produktliste.innerHTML += `
    <a href=produktdetails.html?id=${element.id}>
    <article class="card ${element.soldout ? "udsolgt" : ""}">
       <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
       <h2>${element.productdisplayname}</h2>
       <h3>${element.brandname}</h3>
       ${
         element.discount
           ? `<p class="tilbudlabel">${element.discount}%</p>
     <p>kr. ${tilbudspris},-</p>`
           : `<p>kr. ${element.price},-</p>`
       }
       
       
        <p>${element.gender}</p>

       <p>${element.subcategory}</p>
       </article> </a>`;
  });
}
