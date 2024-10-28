/* app.js */
const productsE1= document.querySelector(".products");
const cartItemsE1= document.querySelector(".cart-items");
const subtotalE1= document.querySelector(".subtotal");
const totalItemsInCartE1= document.querySelector(".total-items-in-cart");

function renderProducts(){
    products.forEach((product) => {
        productsE1.innerHTML += `
        
         <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                       ${product.description}
                        </p>
                    </div>
                    
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/5023504.png" alt="add to cart">
                    </div>
                </div>
        
        
        `;
        
        
    });
}

renderProducts();

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
function addToCart(id){
    if(cart.some((item)=> item.id === id)){
        changeNumberOfUnits("plus", id);
        }
        else{
         const item= products.find((product) => product.id === id);
            cart.push({
                    ...item,
                    numberOfUnits: 1,      
            });
         }
        updateCart();
    }

function updateCart(){
  renderCartItems();
  renderSubtotal();
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubtotal(){  
  let totalPrice =0, totalItems = 0;
  
  cart.forEach((item) => {
     totalPrice += item.price * item.numberOfUnits;
     totalItems += item.numberOfUnits;
  });
  
   subtotalE1.innerHTML =`Total (${totalItems} items): $${totalPrice.toFixed(2)}`
   totalItemsInCartE1.innerHTML = totalItems;
}



function renderCartItems(){
    cartItemsE1.innerHTML="";
    cart.forEach((item) =>{
         cartItemsE1.innerHTML += `
              <div class="cart-item">
                    <div class="item-info" onclick="removeItemFromCart(${item.id})">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                    </div>
                </div>
          `;    
        });
}
 

function removeItemFromCart(id){
  cart = cart.filter( (item) => item.id !==id);
  updateCart();
}
function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;
        
        if(item.id === id){
            if(action === "minus" && numberOfUnits >1){
                numberOfUnits--;
            }
            else if (action === "plus" && numberOfUnits < item.instock){
                  numberOfUnits++;
                     }
        }
        return {
           ...item,
              numberOfUnits,    
            };
        });
    updateCart();
}