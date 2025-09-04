document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-recommendations");
    if (!container) return;
  
    const productId = container.dataset.productId;
    const limit = container.dataset.limit;
  
    const res = await fetch(
      `/recommendations/products?product_id=${productId}&limit=${limit}&section_id=product-recommendations`
    );
  
    const text = await res.text();
    container.innerHTML = text;
  });