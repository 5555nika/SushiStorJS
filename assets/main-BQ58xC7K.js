(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),localStorage.clear();var e=document.querySelector(`.cart-wrapper`),t=document.querySelector(`.total-price`),n=document.querySelector(`[data-cart-empty]`),r=document.querySelector(`[data-cart-delivery]`),i=document.querySelector(`.delivery-cost`);function a(){let a=e.querySelectorAll(`.cart-item`),o=0;a.forEach(e=>{let t=e.querySelector(`[data-counter]`),n=e.querySelector(`.price__currency`),r=parseInt(t?.textContent||`1`,10),i=parseInt(n?.textContent||`0`,10);o+=r*i}),t.textContent=o.toString(),o>0?(n.classList.add(`none`),r.classList.remove(`d-none`)):(n.classList.remove(`none`),r.classList.add(`d-none`)),o>=600?(i.classList.add(`free`),i.textContent=`бесплатно`):(i.classList.add(`free`),i.textContent=`$25`),localStorage.setItem(`cart`,e.innerHTML)}function o(){let t=localStorage.getItem(`cart`);t&&(e.innerHTML=t,a())}o(),window.addEventListener(`click`,e=>{let t=e.target,n=t.dataset.action;if(n===`plus`||n===`minus`){let e=t.closest(`.counter-wrapper`)?.querySelector(`[data-counter]`);if(e){let r=parseInt(e.textContent||`1`,10);if(n===`plus`)r++;else if(n===`minus`){if(r>1)r--;else if(t.closest(`.cart-wrapper`)&&r===1){t.closest(`.cart-item`)?.remove(),a();return}}e.textContent=r.toString(),t.closest(`.cart-wrapper`)&&a()}}}),window.addEventListener(`click`,t=>{let n=t.target;if(n.hasAttribute(`data-cart`)){let t=n.closest(`.card`);if(!t)return;let r={id:t?.dataset.id||``,title:t?.querySelector(`.item-title`)?.textContent||``,price:t?.querySelector(`.price-currency`)?.textContent||``,imgSrc:t?.querySelector(`.product-img`)?.getAttribute(`src`)||``,itemsInBox:t?.querySelector(`[data-items-in-box]`)?.textContent||``,weight:t?.querySelector(`.price-weigth`)?.textContent||``,count:t?.querySelector(`[data-counter]`)?.textContent||`1`},i=e.querySelector(`[data-id="${r.id}"]`);if(i){let e=i.querySelector(`[data-counter]`);e.textContent=(parseInt(e?.textContent||`0`,10)+parseInt(r.count,10)).toString()}else{let t=`
                <div class="cart-item" data-id="${r.id}">
                    <div class="cart-body">
                        <div class="cart-item__img">
                            <img src="${r.imgSrc}" alt="${r.title}">
                        </div>
                        <div class="cart-item__details">
                            <div class="cart-item__title">${r.title}</div>
                            <div class="cart-text__muted">${r.itemsInBox} / ${r.weight}</div>
                            <div class="figures" >
                                <div class="items counter-wrapper">
                                    <div class="items-control" data-action="minus">−</div>
                                    <div class="items-current" data-counter>${r.count}</div>
                                    <div class="items-control" data-action="plus">+</div>
                                </div>
                                    <div class="price">
                                        <span class="price__currency">${r.price}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div> `;e.insertAdjacentHTML(`beforeend`,t)}let o=t.querySelector(`[data-counter]`);o&&(o.textContent=`1`,a())}});