const cartIcon = document.querySelector("#cart-icon");
const mainCart = document.querySelector(".main-cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => mainCart.classList.add("active"))
cartClose.addEventListener("click", () => mainCart.classList.remove("active"))

const addCard = document.querySelectorAll(".add-cart");
addCard.forEach(button =>{
    button.addEventListener("click", ev =>{
        // addCard.style.backgroundColor = "red";
        // console.log("work ")
        button.style.color = "gray";
        const prodBox = ev.target.closest(".cart-item");
        addToCart(prodBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = prodBox =>{
    const prodImageSrc = prodBox.querySelector("img").src
    const prodTitle = prodBox.querySelector(".title1").textContent
    const prodPrice = prodBox.querySelector(".price").textContent

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === prodTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box"); 
    cartBox.innerHTML = `
        <img src="${prodImageSrc}" alt="img" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${prodTitle}</h2>
                    <span class="cart-price">Rs. ${prodPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash cart-remove"></i>
            `;
            cartContent.appendChild(cartBox);
            // console.log(cartBox);
            cartBox.querySelector(".cart-remove").addEventListener("click", () => {
                cartBox.remove();
                updateCartCount(-1);
                updatePrice();

            });

            cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
                const numberElem = cartBox.querySelector(".number");
                const decrementBtn = cartBox.querySelector("#decrement");
                let quantity = numberElem.textContent;
                
                if (event.target.id === "decrement" && quantity >1) {
                    quantity--;
                    if (quantity === 1){
                        decrementBtn.style.color = "#999";
                    }
                } else if (event.target.id === "increment") {
                    quantity++;
                    decrementBtn.style.color = "#333";
                } 
                numberElem.textContent = quantity;
                
                updatePrice();
            })
            updateCartCount(1);
            updatePrice();
};

const updatePrice = () => {
    const totalPriceEle = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        // console.log(cartBox); 
        const priceEle = cartBox.querySelector(".cart-price");
        const quantityElem = cartBox.querySelector(".number")
        const price = priceEle.textContent.replace("Rs.", "");
        const quantity = quantityElem.textContent;
        total += price * quantity;
    });
    totalPriceEle.textContent = `Rs.${total}`
}

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

const buyNowBtn = document.querySelector(".btn-buy");
buyNowBtn.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    } 
    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);
    updatePrice();
    alert("Thank you for your parchase");
});

let scrollTop =  document.querySelector(".scroll-top");
scrollTop.addEventListener("click", () =>{
    document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
    });
})

function show() {
    
}

function checkField() {
    let input1 = document.getElementById('input1');
    let input2 = document.getElementById('input2');
    let input3 = document.getElementById('input3');
    let msg = document.getElementById('msg');
    if(input1.value.trim() === ""){
        // console.log("yes")
        alert("Please fill the name");
    }
    if(input2.value.trim() === ""){
        alert("Please fill the mail");
    }
    if(input3.value.trim() === ""){
        alert("Please fill the number");
    }
    if(msg.value.trim() === ""){
        alert("Please fill the message");
    }
}

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.container'),
//     smooth: true
// }); 
