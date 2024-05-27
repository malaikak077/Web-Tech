document.addEventListener('DOMContentLoaded', function () {

document.getElementById('one').addEventListener('click',function(){
    window.location.href = 'FaceMakeup';
  })

  document.getElementById('two').addEventListener('click',function(){
    window.location.href = 'EyeMakeup';
  })

  document.getElementById('three').addEventListener('click',function(){
    window.location.href = 'LipMakeup.html';
  })

  document.getElementById('four').addEventListener('click',function(){
    window.location.href = 'Accesories.html';
  })



    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const overlay = document.getElementById('overlay');
    const closeButton = cart.querySelector('.close');
    const addToCartButton = document.getElementById('AddCart');
    const buyNowButton = document.getElementById('BuyNow');
    const quantity = document.getElementById("quantity");
    const add = document.getElementById("add");
    const sub = document.getElementById("sub");
    const checkoutButton = document.getElementById('CheckOut');

    let value = 1;

  
    let cartItems = getCartFromCookies();
     
   


    // Display existing cart items from cookies
    if (cartItems.length > 0) {
        for (const item of cartItems) {
            displayCartItem(item);
        }
        updateSubtotal();
        updateCartBadge()
    }

    // Show cart when cart button is clicked
    cartButton.addEventListener('click', () => {
        cart.style.right = '0';
        overlay.style.display = 'block';
            
    
        
    });

    // Hide cart when close button is clicked
    closeButton.addEventListener('click', () => {
        cart.style.right = '-450px';   // Move cart back off-screen
        overlay.style.display = 'none';
       
    });

    // Optional: Hide cart if user clicks outside of it
    overlay.addEventListener('click', () => {
       
            cart.style.right = '-450px'; 
            overlay.style.display = 'none';
        
    });

  
    
  

    add.addEventListener("click",()=>{
       value ++;
       quantity.innerHTML = value;
        
    })

    sub.addEventListener("click",()=>{
        if(value>1){
            value --;
            quantity.innerHTML = value;

        }
    })

   


   
    addToCartButton.addEventListener('click', function() {
      
        const productTitle = document.getElementById('title').innerText;
        const productPrice = parseInt(document.getElementById('price').innerText.replace('$', '')); 
        const productImage = document.getElementById('sourceImg').getAttribute('src');
       
        
     
       
        const product = {
            
            title: productTitle,
            price: productPrice,
            imageUrl: productImage,
            quantity: value  // Store the selected quantity with the product
           
        };
      

       
        addToCart(product);
        updateSubtotal();
        updateCartBadge()
        value = 1; // Reset quantity to 1 after adding to cart
        quantity.innerHTML = value; // Update quantity display
       
    });
    buyNowButton.addEventListener('click', function () {
        const quant = document.getElementById('quantity').textContent;
        localStorage.setItem('productQuantity', quant);
    });

    
  
    function addToCart(product) {
    // Check if the product already exists in the cart
    const existingItem = cartItems.find(item => item.title === product.title);


    if (existingItem) {
        
        // If item exists, update the quantity and subtotal
        existingItem.quantity += product.quantity;
       
        
    } else {
        // Otherwise, add the product to the cart
        cartItems.push(product);
        
    }

       
        saveCartToCookies(cartItems);
        displayCartItem(product);
      
       

     
    }
    function displayCartItem() {
        const cartContainer = document.querySelector('.cart-content');
        cartContainer.innerHTML = ''; // Clear existing cart items
    
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
                    <button class="btn btn-danger ms-4 me-3 delete-btn">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
    
            const deleteButton = cartElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                removeCartItem(item);
                cartElement.remove(); 
                updateCartBadge();
            });
    
            cartContainer.appendChild(cartElement);
        });
        updateCheckoutButton();
    }

   

    function removeCartItem(product) {
        const index = cartItems.findIndex(item => item === product);
        if (index !== -1) {
            cartItems.splice(index, 1); // Remove item from cartItems array
            saveCartToCookies(cartItems); // Update cookies with modified cartItems
            updateSubtotal(); // Update subtotal display
            updateCheckoutButton();
        }
    }
    function saveCartToCookies(cart) {
        const cartJson = JSON.stringify(cart);
        document.cookie = `cart=${encodeURIComponent(cartJson)}; path=/;`;
    }
    

    function getCartFromCookies() {
        const cartCookie = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('cart='));

        if (cartCookie) {
            const cartJson = decodeURIComponent(cartCookie.split('=')[1]);
            return JSON.parse(cartJson);
        } else {
            return []; // Return empty array if cart cookie doesn't exist
        }
    }

    
    function updateSubtotal() {
        let subtotal = 0;

        for (const item of cartItems) {
          subtotal += item.price*item.quantity;
        }
   
        const subtotalElement = document.getElementById('subtotal');
        subtotalElement.innerHTML = `$${subtotal}`;
    }

  
    function updateCartBadge() {
        const totalItems = cartItems.length;
        cartBadge.innerText = totalItems;
        
    }
    function updateCheckoutButton() {
        if (cartItems.length === 0) {
            checkoutButton.disabled = true;
        } else {
            checkoutButton.disabled = false;
        }
    }
    
    updateCheckoutButton();
    updateCartBadge();


  });

   
   

    
   
