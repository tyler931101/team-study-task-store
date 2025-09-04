document.addEventListener("submit", async (e) => {
    if (e.target.matches("form[action='/cart/add']")) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const response = await fetch("/cart/add.js", {
        method: "POST",
        body: formData
      });
      const product = await response.json();
  
      alert(`${product.title} was added to your cart!`);
    }
});