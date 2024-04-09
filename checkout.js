import { cart } from "./cart.js";
import { products } from "./product.js";

let orderSumarry = '';


cart.forEach((cartItem) =>{
   
    const productId = cartItem.productId;
   
    let matchingProduct;

    products.forEach((product) => {
   if (product.id === productId){
       matchingProduct = product;
   }
   
});


orderSumarry += `<div class="container">
    <div class="date">Delivery date: Wednesday, March 13</div>
    <div class="container-2">
        <div class="image"><img src="${matchingProduct.image}" width="65px" alt=""></div>
        <div class="product-detail">
            <p class="name">${matchingProduct.name}</p>
            <p class="price">$${(matchingProduct.priceCents/100).toFixed(2)}</p>
            <p class="quantity">Quantity: ${cartItem.quantity} Update Delete</p>
        </div>
        <div class="date-option">
        <div class="Choose">Choose a delivery option:</div>
    <div class="dates">
        <div class="radio">
            <input type="radio" name="option" id="free"> 
        </div>
        <div class="right-date">
            <p class="Choose-date">Thursday, March 14</p>
            <span>FREE Shipping</span> 
        </div>
    </div>
    <div class="dates">
        <div class="radio">
            <input type="radio" name="option" id="free"> 
        </div>
        <div class="right-date">
            <p class="Choose-date">Friday, March 8</p>
            <span>$4.99 - Shipping</span> 
        </div>
    </div>
    <div class="dates">
        <div class="radio">
            <input type="radio" name="option" id="free"> 
        </div>
        <div class="right-date">
            <p class="Choose-date">Wednesday, March 6</p>
            <span>$9.99 - shipping</span> 
        </div>
    </div>
    </div>
</div>
</div>
    `;
});
console.log(orderSumarry);
document.querySelector('.js-main-container').innerHTML= orderSumarry;
console.log(cart);