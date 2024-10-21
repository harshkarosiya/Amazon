import { cart , removeFromCart, updateQuantity, calculateQuantity, updateOption} from "./cart.js";
import {products, getProduct } from "./product.js";
import { deliveryOptions, getdeliverOption } from "./deliveryoption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderpaymentsumarry } from "./paymentCheckout.js";
import './cart-class.js';


 
function renderOrderSumarry(){
    let orderSumarry = '';

    cart.forEach((cartItem) =>{
    const productId = cartItem.productId;
    
        const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getdeliverOption(deliveryOptionId);
    const today = dayjs();
        const delivery = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = delivery.format('dddd, MMMM D');
    orderSumarry += `<div class="container js-container-${matchingProduct.id}">
        <div class="date">Delivery date: ${dateString}</div>
        <div class="container-2">
            <div class="image"><img src="${matchingProduct.image}" width="65px" alt=""></div>
            <div class="product-detail">
                <p class="name">${matchingProduct.name}</p>
                <p class="price">$${(matchingProduct.priceCents/100).toFixed(2)}</p>
                <p class="quantity">Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> <span class="update-button js-update-button" data-product-id ="${matchingProduct.id}" >Update</span>   
                <input type="text" class="update-input js-input-${matchingProduct.id}" name="" >  <span class="save-button js-save" data-product-id ="${matchingProduct.id}" id="js-inputs" >Save</span>  <span class="delete-button js-delete-button" data-product-id ="${matchingProduct.id}">Delete<span></p>
            </div>
            <div class="date-option">
            <div class="Choose">Choose a delivery option:</div>
            ${deliveryDate(matchingProduct, cartItem)}
        </div>
    </div>
    </div>
    
        `;
    });

    function deliveryDate(matchingProduct, cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const delivery = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = delivery.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0
        ?'FREE '
        :`$${(deliveryOption.priceCents / 100).toFixed(2)} - `;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=`
        <div class="dates js-option-dates"
        data-product-id ="${matchingProduct.id}"
        data-delivery-option-id ="${deliveryOption.id}">
            <div class="radio">
                <input type="radio" ${isChecked ?'checked' :''} class="delivery-option" name="option-${matchingProduct.id}" id="free"> 
            </div>
            <div class="right-date">
                <p class="Choose-date">${dateString}</p>
                <span>${priceString}shipping</span> 
            </div>
        </div>
        `
        });
        return html;
    }

    document.querySelector('.js-main-container').innerHTML= orderSumarry;



    document.querySelectorAll('.js-delete-button').
    forEach((link)=>{
    link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-container-${productId}`)
    container.remove();
    updatecartQuantity();
    renderpaymentsumarry();
    });
    });

     function updatecartQuantity(){
    const cartQuantity = calculateQuantity();
        document.querySelector('.js-a-link')
    .innerHTML = ` ${cartQuantity} items`;
    }
    updatecartQuantity();

    document.querySelectorAll('.js-update-button').
    forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            console.log(productId);
            const container = document.querySelector(`.js-container-${productId}`);
            container.classList.add('is-editing-quantity');
        });
    });
    document.querySelectorAll('.js-save').
    forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            console.log(productId);
            

            const container = document.querySelector(`.js-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const quantityInput = document.querySelector(`.js-input-${productId}`);

            let newQuantity = Number(quantityInput.value);
          
            
            if(newQuantity<0 || newQuantity>= 1000){
                alert('Qunatity must be atleast 0 and less than 1000');
                return;
            }
            updateQuantity(productId, newQuantity);
            

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = newQuantity;
            updatecartQuantity();
            renderpaymentsumarry();
        });
    });

    document.querySelectorAll('.js-option-dates')
    .forEach((element) =>{
    element.addEventListener('click', () =>{
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
        updateOption(productId, deliveryOptionId);
        renderOrderSumarry();
       renderpaymentsumarry();
    });
    });


   
}
renderOrderSumarry();  
renderpaymentsumarry();