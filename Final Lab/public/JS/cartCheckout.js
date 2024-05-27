document.addEventListener('DOMContentLoaded', function () {
    function clearCart() {
        document.cookie = 'cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    function getCartFromCookies() {
        const cartCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('cart='));
        if (cartCookie) {
            const cartJson = decodeURIComponent(cartCookie.split('=')[1]);
            return JSON.parse(cartJson);
        } else {
            return [];
        }
    }

    function displayCartItems(cartItems) {
        const cartContainer = document.getElementById('cart-items-container');
        cartContainer.innerHTML = ''; // Clear existing cart items

        let subtotal = 0;
        cartItems.forEach(item => {
            const cartElement = document.createElement('div');
            cartElement.classList.add('cart-item');
            cartElement.innerHTML = `
                <div class="d-flex align-items-center mb-3">
                    <img src="${item.imageUrl}" alt="${item.title}" width="100">
                    <div class="ms-4 width">
                        <div class="fs-5">${item.title}</div>
                        <div class="fs-6">$${item.price} x ${item.quantity}</div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartElement);
            subtotal += item.price * item.quantity;
        });

        const subtotalElement = document.getElementById('sub');
        subtotalElement.innerHTML = `$${subtotal}`;

        const shipping = 50;
        const totalElement = document.getElementById('tot');
        totalElement.innerHTML = `$${(subtotal + shipping)}`;
    }



    function calculateTotalAmount(cartItems) {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function updateCheckoutForm(cartItems) {
        const totalAmount = calculateTotalAmount(cartItems) + 50; // Add shipping cost
        document.getElementById('items').value = JSON.stringify(cartItems);
        document.getElementById('totalAmount').value = totalAmount;
    }

    const cartItems = getCartFromCookies();
    if (cartItems.length > 0) {
        displayCartItems(cartItems);
    }

    document.getElementById('PlaceOrder').addEventListener('click', function (event) {
        updateCheckoutForm(cartItems);
        clearCart();
    });
});
