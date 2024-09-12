import { cart, calculateQuantity } from "./cart.js";
import { getdeliverOption } from "./deliveryoption.js";
import { getProduct } from "./product.js";

export function renderpaymentsumarry(){
        let productPrice = 0;
        let shippingPrice = 0;

    cart.forEach((cartItem) =>{

    const product = getProduct(cartItem.productId);

    productPrice += product.priceCents * cartItem.quantity;

    const deliveryOption = getdeliverOption(cartItem.deliveryOptionId);

    shippingPrice += deliveryOption.priceCents;
   
    });
    const totalBeforeTax = productPrice + shippingPrice;
    const taxPrice = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxPrice;
    const paymentSumarry = `
    <div class="order-summary">
            Order Summary
        </div>
            <div class="items">
                <div class="item">
                    Items (${calculateQuantity()}):
                </div>
                <div class="item-price">
                    $${(productPrice/100).toFixed(2)}
                </div>
                <div class="shipping">
                    Shipping & handling:
                </div>
                <div class="shipping-price">
                    $${(shippingPrice/100).toFixed(2)}
                </div>
                <div class="before-tax">
                    Total before tax:
                </div>
                <div class="before-tax-price">
                    $${(totalBeforeTax/100).toFixed(2)}
                </div>
                <div class="estimate-tax">
                    Estimated tax (10%):
                </div>
                <div class="gst">
                    $${(Math.round(taxPrice)/100).toFixed(2)}
                </div>
            </div>
            <div class="order">
                <div class="order-total">Order total:</div>
                <div class="order-total-price">
                    $${(Math.round(totalCents)/100).toFixed(2)}
                </div>
                
            </div>
            <div class="paycheck">
            <p class="use-paypal">Use PayPal</p><input type="checkbox" name="value" id="use">
            </div>
            <button class="place-your-order">Place your order</button>
        
    `;
    document.querySelector('.js-payment-form')
    .innerHTML = paymentSumarry;
   
}