import data from "./assets/productData.js";

const productContainer = document.querySelector(".products");
const searchInput = document.querySelector("#search");
const categoryContaier = document.querySelector(".cats");
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");

// Display products
// fetch data and render with map function
const displayProducts = (filteredProducts) => {
  productContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
        <div class="product">
            <img src="${product.img}" alt="mobile">
                <div class="pdetails">
                    <span class="pname">${product.name}</span>
                    <span class="price">₹${product.price}</span>
                </div>
        </div>
    `
    )
    .join("");
  // map function returns an array but we don't need here,
  // so we use join function with "" empty string
};
// function call
displayProducts(data);

// Search Product
searchInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value.toLowerCase();

  if (inputValue) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(inputValue) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

// Filter with Category
// Step 1: create dynamic category list
const setCategory = () => {
  const allCats = data.map((item) => item.cat);
  //   console.log(allCats);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  //   console.log(categories);
  categoryContaier.innerHTML = categories
    .map((categoryName) => `<span class="cat">${categoryName}</span>`)
    .join("");

  // Step 2: Filter based on created categories
  categoryContaier.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;
    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((item) => {
            return item.cat === selectedCat;
          })
        );
  });
};
// function call
setCategory();

// Price range
// Step 1: show min and max price values
const setPrices = () => {
  const priceList = data.map((item) => item.price);
  //   console.log(priceList);
  // set min price
  const minPrice = Math.min(...priceList);
  priceRange.min = minPrice;
  // set max price
  const maxPrice = Math.max(...priceList);
  priceRange.max = maxPrice;

  // set max value at slider by default
  priceRange.value = maxPrice;
  // display it on page via textContent
  priceValue.textContent = "₹" + maxPrice;

  // Step 2: filter them based on user selected price value
  // now take input via slider
  priceRange.addEventListener("click", (e) => {
    priceValue.textContent = "₹" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};
// function call
setPrices();
