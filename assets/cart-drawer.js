document.addEventListener("DOMContentLoaded", () => {
    const drawer = document.getElementById("cart-drawer");
    const closeBtn = document.getElementById("cart-drawer-close");
  
    function openDrawer() {
      drawer.style.right = "0";
    }
    function closeDrawer() {
      drawer.style.right = "-400px";
    }
  
    closeBtn.addEventListener("click", closeDrawer);
  
    // Attach to Add-to-Cart buttons
    document.querySelectorAll("form[action='/cart/add']").forEach(form => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
  
        const response = await fetch("/cart/add.js", {
          method: "POST",
          body: formData
        });
  
        if (response.ok) {
          await updateDrawer();
          openDrawer();
        }
      });
    });
  
    async function updateDrawer() {
      const res = await fetch("/cart.js");
      const cart = await res.json();
  
      const itemsContainer = document.getElementById("cart-drawer-items");
      const subtotalEl = document.getElementById("cart-drawer-subtotal");
  
      itemsContainer.innerHTML = "";
  
      cart.items.forEach(item => {
        const div = document.createElement("div");
        div.style.marginBottom = "1rem";
        div.innerHTML = `
          <div style="display:flex;align-items:center">
            <img src="${item.image}" alt="${item.title}" style="width:60px;height:60px;object-fit:cover;margin-right:.75rem">
            <div>
              <p style="margin:0">${item.title}</p>
              <small>Qty: ${item.quantity}</small><br>
              <strong>${(item.line_price/100).toFixed(2)} ${cart.currency}</strong>
            </div>
          </div>
        `;
        itemsContainer.appendChild(div);
      });
  
      subtotalEl.innerText = (cart.total_price/100).toFixed(2) + " " + cart.currency;
    }
  });