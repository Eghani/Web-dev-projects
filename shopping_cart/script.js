// Cart Array to Store Items
let cart = [];

// Add Item Functionality
document.getElementById("addItemBtn").addEventListener("click", () => {
    const name = document.getElementById("itemName").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const quantity = parseInt(document.getElementById("itemQuantity").value);

    if (name && price > 0 && quantity > 0) {
        cart.push({ name, price, quantity });
        updateCart();
        clearInputs();
    } else {
        alert("Please enter valid item details.");
    }
});

// Update Cart Display
function updateCart() {
    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    calculateTotal(total);
}

// Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
// Calculate Total with Discount
function calculateTotal(total) {
    const discount = total > 500 ? total * 0.1 : 0;
    const finalTotal = total - discount;

    // Display totals and discount details
    document.getElementById("totalBeforeDiscount").textContent = `Total Before Discount: ₹${total.toFixed(2)}`;
    document.getElementById("discount").textContent = `Discount: ₹${discount.toFixed(2)}`;
    document.getElementById("finalTotal").textContent = `Total After Discount: ₹${finalTotal.toFixed(2)}`;

    // Display the discount message if eligible
    const discountMessage = document.getElementById("discountMessage");
    if (total > 500) {
        discountMessage.textContent = "🎉 EXTRA 10% discount! At checkout ";
        discountMessage.style.color = "green";
    } else {
        discountMessage.textContent = "Shop Above ₹500 or more to unlock an EXTRA 10% discount!";
        discountMessage.style.color = "red"; 
    }
}


// Clear Input Fields
function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQuantity").value = "";
}
