const cat = new URLSearchParams(window.location.search).get("cat");
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${cat}`;
const produktliste = document.querySelector(".produktliste");
document.querySelector("h2").textContent = cat;

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
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
      
       <p>${element.subcategory}</p>
       </article> </a>`;
  });
}
