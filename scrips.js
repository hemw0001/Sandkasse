const endpoint = "https://kea-alt-del.dk/t7/api/products";
const produktliste = document.querySelector(".produktliste");

fetch(endpoint)
  .then((res) => res.json())
  .then(visData);

function visData(json) {
  console.log(json);
  json.forEach((element) => {
    produktliste.innerHTML += `
    <article class="card">
       <img src=https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp alt="produktbillede" />
       <h2>${element.productdisplayname}</h2>
       <h3>${element.brandname}</h3>
       <p>${element.price}<p/>
       <p>${element.subcategory}</p>
       </article>`;
  });
}
