 // ---------------------------------------------------------page1,page2-----------------------------------

        document.addEventListener("DOMContentLoaded", () => {
            const page1 = document.getElementById("page1");
            const page2 = document.getElementById("page2");
            const page3 = document.getElementById("page3");
        
            // Wait for the logo rotation and text animation to finish
            setTimeout(() => {
                page1.style.transform = "translateY(-100%)";
                page2.style.transform = "translateY(0)";
            }, 4000);
        
            // After the welcome page display, move to the home page
            setTimeout(() => {
                page2.style.transform = "translateY(-100%)";
                page3.style.transform = "translateY(0)";
            }, 9000);
        });

        // ------------------------------------------------header--------------------------------------------------

        // function toggleMenu() {
        //     const menu = document.getElementById("menu");
        //     menu.classList.toggle("active");
        // }
        
        // ---------------------------------------------------------main-----------------------------------------------------

        const cart = {
        items: [],
        total: 0,
        totalCount: 0, // To track the total number of items
        };

        const cartElement = document.getElementById("cart");
        const cartItemsElement = document.getElementById("cart-items");
        const cartTotalElement = document.getElementById("cart-total");
        const clearCartButton = document.getElementById("clear-cart");
        const cartSymbol = document.getElementById("cart-symbol");

        // --------------------------------------------------------cart emojis-------------------------------------------------
        const cartEmoji = document.getElementById("cart-emoji");

        // Update emoji based on cart total price
        function updateEmoji() {
            if (cart.total === 0) {
                cartEmoji.textContent = "😢"; // Sad emoji for empty cart
            } else if (cart.total > 0 && cart.total <= 300) {
                cartEmoji.textContent = "😊"; // Light smile for a low cart total
            } else if (cart.total > 300 && cart.total <= 650) {
                cartEmoji.textContent = "😁"; // Medium smile for a moderate cart total
            } else if (cart.total > 650) {
                cartEmoji.textContent = "😄"; // Wide smile for a high cart total
            }
            
        }

        // Add an item to the cart
        function addToCart(name, price) {
            const existingItem = cart.items.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ name, price, quantity: 1 });
            }

            updateCart(); // Update cart details and totals
        }

        // Remove an item from the cart
        function removeFromCart(name) {
            const itemIndex = cart.items.findIndex((item) => item.name === name);

            if (itemIndex !== -1) {
                cart.items[itemIndex].quantity -= 1;

                if (cart.items[itemIndex].quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                }
            }

            updateCart(); // Update cart details and totals
        }

        // Clear all items from the cart
        clearCartButton.addEventListener("click", () => {
            cart.items = [];
            updateCart(); // Reset cart totals and items
            cartEmoji.textContent = "😡"; // Angry emoji for clearing the cart
            setTimeout(updateEmoji, 2000); // Reset emoji after 2 seconds
        });

        // Update the cart display and totals
        function updateCart() {
            // Reset and rebuild the cart item list
            cartItemsElement.innerHTML = "";
            cart.items.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - ₹${item.price} x ${item.quantity} 
                    <button class="cart-btn" data-index="${index}" data-action="increase">+</button>
                    <button class="cart-btn" data-index="${index}" data-action="decrease">-</button>
                `;
                cartItemsElement.appendChild(li);
            });

            // Calculate the total price
            cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            // Update total price display
            cartTotalElement.textContent = cart.total;
            updateEmoji(); // Ensure emoji is updated
        }

        // Show the cart
        function showCart() {
            cartElement.style.display = "block";
        }

        // Event delegation for + and - buttons
        cartItemsElement.addEventListener("click", (event) => {
            if (event.target.classList.contains("cart-btn")) {
                const action = event.target.dataset.action;
                const index = parseInt(event.target.dataset.index, 10);

                if (action === "increase") {
                    cart.items[index].quantity += 1;
                } else if (action === "decrease") {
                    cart.items[index].quantity -= 1;
                    if (cart.items[index].quantity <= 0) {
                        cart.items.splice(index, 1);
                    }
                }

                updateCart(); // Update cart details and totals
            }
        });

        // ---------------------------------------------sign in-----------------------------------------------------

        const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('password');
        const overlay = document.getElementById('overlay');
        const signOutButton = document.getElementById('signOut');
        // const cart = document.getElementById('cart');
        const videoElement = document.getElementById('order-animation');
        let isSignedIn = false; // Simulated user sign-in status
        
        // Toggle password visibility
        togglePassword.addEventListener('click', () => {
            const type = password.type === 'password' ? 'text' : 'password';
            password.type = type;
            togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
        });
        
        // Show/Hide the sign-in overlay
        function toggleSignIn() {
            overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
            if (overlay.style.display === 'none') {
                resetSignInForm(); // Reset the sign-in form when closing
            }
        }
        
        function signUp() {
            alert('Sign Up functionality will be implemented.');
        }
        
        // Mock function for reset password
        function resetPassword() {
            alert('An OTP has been sent to your email or phone.');
        }
        
        // Close overlay when clicking outside the container
        function closeOverlay() {
            overlay.style.display = 'none';
            resetSignInForm(); // Reset the sign-in form when closing
        }
        
        // Reset sign-in form
        function resetSignInForm() {
            password.value = ''; // Clear password field
            togglePassword.textContent = 'Show'; // Reset toggle button text
        }
        
        // Mock function for sign-in action
        function signIn() {
            isSignedIn = true; // Simulate successful sign-in
            alert('Signed in successfully!');
            toggleSignIn(); // Close the overlay
            updateSignOutButton(); // Update button visibility
        }
        
        // Sign Out functionality
        signOutButton.addEventListener('click', () => {
            if (isSignedIn) {
                isSignedIn = false; // Update sign-in status
                alert('You have been signed out successfully.');
                updateSignOutButton(); // Update button visibility
                resetSignInForm(); // Reset the sign-in form
            } else {
                alert('You are not signed in.');
            }
        });
        
        // Update the button's visibility on page load
        function updateSignOutButton() {
            signOutButton.style.display = isSignedIn ? 'block' : 'none';
        }
        document.addEventListener('DOMContentLoaded', updateSignOutButton);
        
        // Process Order Functionality
        function processOrder() {
            if (!isSignedIn) {
                alert('Please sign in to process your order.');
                toggleSignIn(); // Show the sign-in overlay
                return;
            }
        
            const cartMessage = document.createElement()
        }

// ---------------------------------------------------------------------menu-------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-button');
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuContainer = document.querySelector('.menu-container');

    // Set "Specials" category as default
    const defaultCategory = document.querySelector('.category-button.selected').dataset.category;
    const defaultMenu = document.querySelector(`.menu-category.${defaultCategory}`);
    defaultMenu.classList.add('active');
    menuContainer.classList.add('active');

    // Handle button clicks
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove selected class from all buttons and add it to the clicked one
            categoryButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const category = button.dataset.category;

            // Show the selected menu and hide others
            menuCategories.forEach(menuCategory => {
                if (menuCategory.classList.contains(category)) {
                    menuCategory.classList.add('active');
                } else {
                    menuCategory.classList.remove('active');
                }
            });
        });
    });

    // Ensure "Specials" category always displays by default
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.category-button') && !event.target.closest('.menu-container')) {
            menuCategories.forEach(menuCategory => {
                if (!menuCategory.classList.contains(defaultCategory)) {
                    menuCategory.classList.remove('active');
                }
            });
            defaultMenu.classList.add('active');
        }
    });
});


// --------------------------------------------------------cart----------------------------------------

        // Update the cart display
        function updateCart() {
            cartItemsElement.innerHTML = "";
            cart.items.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${item.name} - ₹${item.price} x ${item.quantity} 
                    <button class="cart-btn" data-index="${index}" data-action="increase">+</button>
                    <button class="cart-btn" data-index="${index}" data-action="decrease">-</button>
                `;
                cartItemsElement.appendChild(li);
            });

            cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cart.totalCount = cart.items.reduce((sum, item) => sum + item.quantity, 0); // Update total count

            cartTotalElement.textContent = cart.total;
            document.getElementById("cart-count").textContent = cart.totalCount; // Update total item count in header
        }

        // Add an item to the cart
        function addToCart(name, price) {
            const existingItem = cart.items.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ name, price, quantity: 1 });
            }

            showCart(); // Ensure the cart is visible
            updateCart();
        }

        // Remove an item from the cart
        function removeFromCart(name) {
            const itemIndex = cart.items.findIndex((item) => item.name === name);

            if (itemIndex !== -1) {
                cart.items[itemIndex].quantity -= 1;

                if (cart.items[itemIndex].quantity <= 0) {
                    cart.items.splice(itemIndex, 1);
                }
            }

            showCart(); // Ensure the cart is visible
            updateCart();
        }

        // Clear all items from the cart
        clearCartButton.addEventListener("click", () => {
            cart.items = [];
            updateCart();
        });

        // Add event listeners to menu items
        document.querySelectorAll(".menu-item").forEach((item) => {
            const name = item.querySelector("h3").textContent;
            const price = parseInt(item.getAttribute("data-price"), 10);

            item.querySelector(".order-increase").addEventListener("click", (event) => {
                addToCart(name, price);
                event.stopPropagation(); // Prevent triggering the hide event
            });

            item.querySelector(".order-decrease").addEventListener("click", (event) => {
                removeFromCart(name);
                event.stopPropagation(); // Prevent triggering the hide event
            });
        });

        // Show the cart
        function showCart() {
            cartElement.style.display = "block";
        }

        // Hide the cart
        function hideCart() {
            cartElement.style.display = "none";
        }

        // Handle cart visibility when clicking the cart symbol
        cartSymbol.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent bubbling
            if (cartElement.style.display === "block") {
                hideCart();
            } else {
                showCart();
            }
        });

        // Hide cart when clicking anywhere else on the page
        document.addEventListener("click", () => {
            hideCart();
        });

        // Handle cart interactions to prevent it from hiding
        cartElement.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent click events from bubbling
        });
        
        // ----------------------------------------location----------------------------

        document.addEventListener("DOMContentLoaded", function () {
            // Simulated dynamic data (replace with API call if needed)
            const locationData = {
                videoUrl: "/images/location_video.mp4", // Replace with your video URL
                address: "Vijayanagar 2nd stage opp.Zudio Mysuru",
                hours: "Mon-Sun, 7:00 AM - 9:00 PM"
            };
        
            // Set the video source dynamically
            const videoElement = document.getElementById("location-video-source");
            videoElement.src = locationData.videoUrl;
        
            // Load the new video
            const video = document.getElementById("location-video");
            video.load();
        
            // Set address and hours dynamically
            document.getElementById("location-address").textContent = locationData.address;
            document.getElementById("location-hours").textContent = `Open: ${locationData.hours}`;
        });

        // ------------------load dynamic content (location)-----------------
        fetch("https://api.example.com/location")
    .then(response => response.json())
    .then(data => {
        // Set the video source dynamically
        const videoElement = document.getElementById("location-video-source");
        videoElement.src = data.videoUrl;
        
        // Load the new video
        const video = document.getElementById("location-video");
        video.load();

        // Set address and hours dynamically
        document.getElementById("location-address").textContent = data.address;
        document.getElementById("location-hours").textContent = `Open: ${data.hours}`;
    })
    .catch(error => console.error("Error fetching location data:", error));
        
        // -------------------------------------contact us-----------------------------

        document.addEventListener("DOMContentLoaded", function() {
            // Example dynamic data for contact information
            const contactData = {
                phone: "+91-9347501328",
                email: "contact@example.com",
                address: "Vijayanagar 2nd stage opp.Zudio Mysuru"
            };
        
            // Dynamically insert the contact details into the page
            document.getElementById("contact-phone").innerText = `Phone: ${contactData.phone}`;
            document.getElementById("contact-email").innerText = `Email: ${contactData.email}`;
            document.getElementById("contact-address").innerText = `Address: ${contactData.address}`;
        });
        
    // ---------------------------------- Payments ---------------------------
    // Show/Hide payment options based on the selected payment method
function showNetBanking() {
    document.getElementById("netbanking-options").classList.remove("hidden");
    document.getElementById("card-options").classList.add("hidden");
    document.getElementById("upi-options").classList.add("hidden");
    document.getElementById("cod-options").classList.add("hidden");
}

function showCardForm() {
    document.getElementById("netbanking-options").classList.add("hidden");
    document.getElementById("card-options").classList.remove("hidden");
    document.getElementById("upi-options").classList.add("hidden");
    document.getElementById("cod-options").classList.add("hidden");
}

function showUPI() {
    document.getElementById("netbanking-options").classList.add("hidden");
    document.getElementById("card-options").classList.add("hidden");
    document.getElementById("upi-options").classList.remove("hidden");
    document.getElementById("cod-options").classList.add("hidden");
}

function showCOD() {
    document.getElementById("netbanking-options").classList.add("hidden");
    document.getElementById("card-options").classList.add("hidden");
    document.getElementById("upi-options").classList.add("hidden");
    document.getElementById("cod-options").classList.remove("hidden");
}


     