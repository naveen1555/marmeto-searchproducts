let searchproduct = document.getElementById("searchproduct");
let productsContainer = document.getElementById("products");
let listViewImage = document.getElementById("listViewImage");
let gridViewImage = document.getElementById("gridViewImage");
let singleproduct;
let img;
let textContainer;
let title;
let badge;
let variantsv1;
let variantsv2;
let variantsv3;
let products;
let response;
let data1;

async function fetchProducts() {
  try {
    response = await fetch(
      "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    );
    data1 = await response.json();
    return data1;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

productsContainer.classList.add("list-product-container");
async function displayProductslist() {
  products = await fetchProducts();
  productsContainer.innerHTML = "";

  products.data.map((product) => {
    singleproduct = document.createElement("div");

    singleproduct.classList.add("list-single-product-container");
    productsContainer.appendChild(singleproduct);

    img = document.createElement("img");
    textContainer = document.createElement("div");
    title = document.createElement("li");
    badge = document.createElement("li");
    variantsv1 = document.createElement("li");
    variantsv2 = document.createElement("li");
    variantsv3 = document.createElement("li");
    img.src = product.product_image;
    img.classList.add("grid-image");
    singleproduct.appendChild(img);

    textContainer.classList.add("list-text-container");
    singleproduct.appendChild(textContainer);

    title.textContent = product.product_title.toUpperCase();
    title.classList.add("list-title");
    textContainer.appendChild(title);

    badge.textContent = product.product_badge;
    badge.classList.add("list-badge-tag");
    textContainer.appendChild(badge);

    variantsv1.textContent = product.product_variants[0].v1;
    variantsv1.classList.add("list-variantsv1");
    textContainer.appendChild(variantsv1);

    variantsv2.textContent = product.product_variants[1].v2.toUpperCase();
    variantsv2.classList.add("list-variantsv1");
    textContainer.appendChild(variantsv2);

    variantsv3.textContent = product.product_variants[2].v3.toUpperCase();
    variantsv3.classList.add("list-variantsv1");
    textContainer.appendChild(variantsv3);
  });
}

displayProductslist();

searchproduct.addEventListener("input", function () {
  const searchTerm = searchproduct.value.toUpperCase();

  const productItems = productsContainer.querySelectorAll(".product-item li");

  productItems.forEach((each) => {
    const itemText = each.textContent.toUpperCase();

    if (itemText.includes(searchTerm)) {
      const highlightedText = itemText.replace(
        new RegExp(searchTerm, "gi"),
        (match) => `<span class="highlight">${match}</span>`
      );
      each.innerHTML = highlightedText;
    } else {
      each.innerHTML = itemText;
    }
  });
});

listViewImage.addEventListener("click", function () {
  productsContainer.classList.remove("grid-product-container");
  displayProductslist();
});

gridViewImage.addEventListener("click", function () {
  productsContainer.classList.remove("list-product-container");
  productsContainer.classList.add("grid-product-container");
  async function displayProducts() {
    products = await fetchProducts();
    productsContainer.innerHTML = "";

    products.data.map((product) => {
      singleproduct = document.createElement("div");

      singleproduct.classList.add("grid-single-product-container");
      productsContainer.appendChild(singleproduct);

      img = document.createElement("img");
      textContainer = document.createElement("div");
      title = document.createElement("li");
      badge = document.createElement("li");
      variantsv1 = document.createElement("li");
      variantsv2 = document.createElement("li");
      variantsv3 = document.createElement("li");
      img.src = product.product_image;
      img.classList.add("grid-image");
      singleproduct.appendChild(img);

      textContainer.classList.add("grid-text-container");
      singleproduct.appendChild(textContainer);

      title.textContent = product.product_title.toUpperCase();
      title.classList.add("title");
      textContainer.appendChild(title);

      badge.textContent = product.product_badge;
      badge.classList.add("badge-tag");
      textContainer.appendChild(badge);

      variantsv1.textContent = product.product_variants[0].v1.toUpperCase();
      variantsv1.classList.add("variantsv1");
      textContainer.appendChild(variantsv1);

      variantsv2.textContent = product.product_variants[1].v2.toUpperCase();
      variantsv2.classList.add("variantsv1");
      textContainer.appendChild(variantsv2);

      variantsv3.textContent = product.product_variants[2].v3.toUpperCase();
      variantsv3.classList.add("variantsv1");
      textContainer.appendChild(variantsv3);
    });
  }
  displayProducts();
});
