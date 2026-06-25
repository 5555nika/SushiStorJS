const cartWrapper = document.querySelector('.cart-wrapper') as HTMLElement    
const cartEmptyBadge = document.querySelector('[data-cart-empty]') as HTMLElement    
const cartDelivery = document.querySelector('[data-cart-delivery]') as HTMLElement    
const deliveryCost = document.querySelector('.delivery-cost') as HTMLElement    
const totalPriceEl = document.querySelector('.total-price') as HTMLElement      

const toggleCartStatus = (): void => {
    const cartItems = cartWrapper.querySelectorAll('.cart-item')
    let totalPrice = 0

    cartItems.forEach(item => {
        const amountEl = item.querySelector('[data-counter]') as HTMLElement
        const countEl = item.querySelector('.price__currency') as HTMLElement

        const currentAmount = parseInt(amountEl.textContent || '1',10)
        const currentPrice = parseInt(countEl.textContent || '0',10)

        totalPrice += currentAmount * currentPrice    
    })
        totalPriceEl.textContent = totalPrice.toString()

        if (totalPrice > 0) {
            cartEmptyBadge.classList.add('none')
            cartDelivery.classList.remove('d-none')
        } else {
            cartEmptyBadge.classList.remove('none')
            cartDelivery.classList.add('d-none')
        }

        if (totalPrice >= 600) {
            deliveryCost.classList.add('free')
            deliveryCost.textContent = 'бесплатно'
        } else {
            deliveryCost.classList.remove('free')
            deliveryCost.textContent = '250 ₽'
        }
        if (totalPrice > 0) {
            
        }

     // Сохраняем состояние корзины при каждом изменении
        localStorage.setItem('cartHtml', cartWrapper.innerHTML)
}

// Загружаем корзину при загрузке страницы
const loadCart = () => {
    const savedCart = localStorage.getItem('cartHtml')
    if (savedCart) {
        cartWrapper.innerHTML = savedCart
        toggleCartStatus()
    }
}
loadCart()


window.addEventListener('click', (e: MouseEvent): void => {

    const target = e.target as HTMLElement
    const action = target.dataset.action

    if (action === 'minus' || action === 'plus') {
        const counterWrapper = target.closest('.counter-wrapper')
        const counter = counterWrapper?.querySelector('[data-counter]') as HTMLElement | null

        if (counter) {
            let value = parseInt(counter.textContent || '1', 10)

            if (action === 'plus') {
                value++
            } else if (action === 'minus') {
                if (value > 1) {
                    value--
                } else if (target.closest('.cart-wrapper') && value === 1) {
                    target.closest('.cart-item')?.remove()
                    toggleCartStatus()
                    return
                }
            }

            counter.textContent = value.toString()

            if (target.closest('.cart-wrapper')) {
                toggleCartStatus()
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
            id: card.dataset.id || '' ,
            imgSrc: card.querySelector('.product-img')?.getAttribute('src') || '' ,
            title: card.querySelector('.item-title')?.textContent || '' ,
            itemsInBox: card.querySelector('[data-items-in-box]')?.textContent || '',
            weight: card.querySelector('.price-weigth')?.textContent || '',
            price: card.querySelector('.price-currency')?.textContent || '',
            count:  card.querySelector('[data-counter]')?.textContent || '1'
        }
    
        const productId = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)
        if (productId) {
            const counterEl = productId.querySelector('[data-counter]') as HTMLElement
            const currentCount = parseInt(counterEl.textContent || '0', 10)
            const newCount = currentCount + parseInt(productInfo.count, 10) 
            counterEl.textContent = newCount.toString() 
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
                </div> `;
                cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML)
        }

        // --- Анимация полета в корзину ---
        const img = card.querySelector('.product-img') as HTMLImageElement
        const cartCard = document.querySelector('.cart-card') as HTMLElement
        
        if (img && cartCard) {
            const flyImg = img.cloneNode() as HTMLImageElement
            const imgRect = img.getBoundingClientRect()
            const cartRect = cartCard.getBoundingClientRect()
            
            // Задаем начальные стили для клона картинки
            flyImg.style.position = 'fixed'
            flyImg.style.left = `${imgRect.left}px`
            flyImg.style.top = `${imgRect.top}px`
            flyImg.style.width = `${imgRect.width}px`
            flyImg.style.height = `${imgRect.height}px`
            flyImg.style.transition = 'all 0.6s ease-in-out'
            flyImg.style.zIndex = '1000'
            flyImg.style.borderRadius = '50%'
            flyImg.style.objectFit = 'cover'
            
            document.body.appendChild(flyImg)

            // Через небольшую задержку меняем координаты на корзину (запустится CSS transition)
            setTimeout(() => {
                flyImg.style.left = `${cartRect.left + cartRect.width / 2}px`
                flyImg.style.top = `${cartRect.top + 50}px`
                flyImg.style.width = '20px'
                flyImg.style.height = '20px'
                flyImg.style.opacity = '0'
            }, 10)

            // Удаляем клон после завершения анимации
            setTimeout(() => {
                flyImg.remove()
            }, 600)
        }
        // --------------------------------


        const dataCounter = card.querySelector('[data-counter]') as HTMLElement
        if (dataCounter) dataCounter.textContent = '1'
        toggleCartStatus()
    }

})