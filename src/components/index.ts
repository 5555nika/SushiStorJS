localStorage.clear();
const cartWrapper = document.querySelector('.cart-wrapper')  as HTMLElement   
const totalPriceEl = document.querySelector('.total-price')  as HTMLElement   
const cardEmptyBadge = document.querySelector('[data-cart-empty]')  as HTMLElement   
const cardDelivery = document.querySelector('[data-cart-delivery]')  as HTMLElement   
const deliveryCost = document.querySelector('.delivery-cost')  as HTMLElement   

    function toggleStatusCart (): void {
        const cartItems = cartWrapper.querySelectorAll('.cart-item') 
        let totalPrice = 0 

        cartItems.forEach(item => {
            const count = item.querySelector('[data-counter]') as HTMLElement
            const price = item.querySelector('.price__currency') as HTMLElement

            const countEl = parseInt(count?.textContent  || '1', 10)
            const priceEl = parseInt(price?.textContent  || '0', 10)

            totalPrice += countEl * priceEl            
        })
        totalPriceEl.textContent = totalPrice.toString()

        if (totalPrice > 0) {
            cardEmptyBadge.classList.add('none')
            cardDelivery.classList.remove('d-none')
        } else {
            cardEmptyBadge.classList.remove('none')
            cardDelivery.classList.add('d-none')
        }

        if (totalPrice >= 600) {
            deliveryCost.classList.add('free')
            deliveryCost.textContent = 'бесплатно'
        } else {
            deliveryCost.classList.add('free')
            deliveryCost.textContent = '$25'
        }
    localStorage.setItem('cart', cartWrapper.innerHTML)
    }

    function loadCart () {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            cartWrapper.innerHTML = savedCart
            toggleStatusCart()
        }
    }
    loadCart()

    window.addEventListener('click', (e: MouseEvent): void => {
        const target = e.target as HTMLElement
        const action = target.dataset.action 

        if (action === 'plus' || action === 'minus') {
            const counterWrapper = target.closest('.counter-wrapper')
            const  counter = counterWrapper?.querySelector('[data-counter]')  as HTMLElement | null

            if (counter) {
                let value = parseInt(counter.textContent || '1', 10)

                if (action === 'plus') {
                    value++
                } else if (action === 'minus') {
                    if (value > 1) {
                        value--
                    } else if (target.closest('.cart-wrapper') && value === 1) {
                        target.closest('.cart-item')?.remove()
                        toggleStatusCart()
                        return
                    }                    
            }
            counter.textContent = value.toString()

            if (target.closest('.cart-wrapper')) {
                toggleStatusCart()
            }
        }
    }

    })

    window.addEventListener('click', (e: MouseEvent): void => {
        const target = e.target as HTMLElement
        if (target.hasAttribute('data-cart')) {
            const card = target.closest('.card') as HTMLElement
            if (!card) return
        const productInfo = {
            id: card?.dataset.id || '',
            title: card?.querySelector('.item-title')?.textContent || '',
            price: card?.querySelector('.price-currency')?.textContent || '',
            imgSrc: card?.querySelector('.product-img')?.getAttribute('src') || '',
            itemsInBox: card?.querySelector('[data-items-in-box]')?.textContent || '',
            weight: card?.querySelector('.price-weigth')?.textContent || '',
            count: card?.querySelector('[data-counter]')?.textContent || '1',
        }
            const productId = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)
            if (productId) {
                const count = productId.querySelector('[data-counter]') as HTMLElement
                const currentCount = parseInt(count?.textContent || '0', 10)
                const newCount = currentCount + parseInt(productInfo.count, 10)

                count.textContent = newCount.toString()
            } else {
            const cartItemHTML = `
                <div class="cart-item" data-id="${productInfo.id}">
                    <div class="cart-body">
                        <div class="cart-item__img">
                            <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
                        </div>
                        <div class="cart-item__details">
                            <div class="cart-item__title">${productInfo.title}</div>
                            <div class="cart-text__muted">${productInfo.itemsInBox} / ${productInfo.weight}</div>
                            <div class="figures" >
                                <div class="items counter-wrapper">
                                    <div class="items-control" data-action="minus">−</div>
                                    <div class="items-current" data-counter>${productInfo.count}</div>
                                    <div class="items-control" data-action="plus">+</div>
                                </div>
                                    <div class="price">
                                        <span class="price__currency">${productInfo.price}</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div> `
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
            }
        const dataCounter = card.querySelector('[data-counter]')  as HTMLElement
        if (dataCounter) {
            dataCounter.textContent = '1'
            toggleStatusCart()
            }
        }
    })