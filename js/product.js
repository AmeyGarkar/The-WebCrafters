
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function setMainImage(src) {
  const mainImg = document.getElementById("mainImg");
  mainImg.src = src;
  document.querySelectorAll("#thumbnails img").forEach(img => img.classList.remove("thumbnail-active"));
  const target = [...document.querySelectorAll("#thumbnails img")].find(img => img.src.includes(src));
  if (target) target.classList.add("thumbnail-active");
}

window.onload = () => {
  const productId = getProductIdFromURL();
  const product = productsData[productId];

  if (!product) {
    document.body.innerHTML = "<h2 class='text-center mt-10 text-xl text-red-500'>Product not found</h2>";
    return;
  }

  // Set basic details
  document.title = `${product.name} - Wearify`;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productDescription").textContent = product.description;
  document.getElementById("productPrice").innerHTML = `₹${product.price} <span class="text-green-500 text-sm">(37% OFF)</span>`;
  document.getElementById("productOldPrice").textContent = `MRP: ₹${product.oldPrice}`;
  document.getElementById("productStock").textContent = `${product.stock} units`;
  document.getElementById("productRating").textContent = product.rating;

  // Load images
  const mainImg = document.getElementById("mainImg");
  mainImg.src = product.images[0];

  const thumbnails = document.getElementById("thumbnails");
  thumbnails.innerHTML = "";
  product.images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `w-20 h-20 object-cover rounded cursor-pointer border-2 ${index === 0 ? "thumbnail-active" : ""}`;
    img.onclick = () => setMainImage(src);
    thumbnails.appendChild(img);
  });

  // Load highlights
  const highlights = document.getElementById("productHighlights");
  highlights.innerHTML = "";
  product.highlights.forEach(point => {
    const li = document.createElement("li");
    li.textContent = point;
    highlights.appendChild(li);
  });

  // Load product info
  const info = document.getElementById("productDetails");
  info.innerHTML = "";
  for (const key in product.info) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${key}:</strong> ${product.info[key]}`;
    info.appendChild(p);
  }
};
