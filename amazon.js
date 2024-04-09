import { products } from "./product.js";
import { cart, addtoCart } from "./cart.js";

let producthtml = '';
 products.forEach((product) => {
   producthtml += `   <div class="amazon-grid">
        <div class="product-image"> <img src="${product.image}" class="product-images" alt="" ></div>
        <div class="product-name">${product.name}</div>
        <div class="product-raiting"> <img src="images/rating-${product.rating.stars *10}.png"  class="rating"> <p class="raiting-count">${product.rating.count}</p></div>
        <div class="product-amount"> $${(product.priceCents / 100 ).toFixed(2)}</div>  
        <select name="" id="" class="quantity">
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
        <option value="">5</option>
        <option value="">6</option>
        <option value="">7</option>
        <option value="">8</option>
        <option value="">9</option>
        <option value="">10</option>
        </select> <br>
<button class="add-to-cart js-add-to-cart" data-product-id = "${product.id}">Add to Cart</button>
</div>`

});
document.querySelector('.js-main-grid').innerHTML = producthtml;
 
   function updateScore(){
    let cartQuantity = 0;
    cart.forEach((item) =>{
        cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity')
.innerHTML = cartQuantity;
};


 document.querySelectorAll('.js-add-to-cart')
 .forEach( (button) => {
     button.addEventListener('click', () => {
        let productId = button.dataset.productId;
       addtoCart(productId);
       updateScore();
     });
 });
 
 
 