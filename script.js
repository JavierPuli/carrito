  let cart = [];
        let theme = 'light';
        let stock = {
            camiseta: { S: 4, M: 4, L: 4 },
            vaqueros: { S: 4, M: 4, L: 4 },
            abrigo: { S: 4, M: 4, L: 4 },
            calzonas: { S: 4, M: 4, L:4},
            calzoncillo: { S:4, M: 4, L:4},
            calcetines: { S:4, M:4, L:4}
        };

        let camiseta=document.getElementById('camiseta');
            let vaqueros=document.getElementById('vaqueros');
            let abrigo=document.getElementById('abrigo');
            let calzonas=document.getElementById('calzonas');
            let calzoncillo=document.getElementById('calzoncillo');
            let calcetines=document.getElementById('calcetines');

        function addToCart(product, price, size, productKey) {
            const availableStock = stock[productKey][size];
            const existingProduct = cart.find(item => item.product === product && item.size === size);

            if (availableStock > 0) {
                if (existingProduct) {
                    if (existingProduct.quantity < availableStock) {
                        existingProduct.quantity++;
                    } else {
                        alert('Stock insuficiente para esta talla.');
                        return;
                    }
                } else {
                    cart.push({ product, price, size, quantity: 1 });
                }
                updateCart();
            } else {
                alert('Sin stock.');
            }
        }

        function updateCart() {
            const cartBody = document.getElementById('cart-body');
            cartBody.innerHTML = '';

            let total = 0;
            cart.forEach(item => {
                const subtotal = item.price * item.quantity;
                total += subtotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.product}</td>
                    <td>${item.size}</td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.product}', '${item.size}', this.value, '${item.product.toLowerCase()}')"></td>
                    <td>$${item.price}</td>
                    <td>$${subtotal}</td>
                    <td><button onclick="removeFromCart('${item.product}', '${item.size}')">Borrar</button></td>
                `;
                cartBody.appendChild(row);
            });

            document.getElementById('total-price').textContent = `Total: $${total}`;
            saveCart();
        }

        function updateQuantity(product, size, quantity, productKey) {
            const item = cart.find(item => item.product === product && item.size === size);

            if (item) {
                const availableStock = stock[productKey][size];
                if (quantity <= availableStock) {
                    item.quantity = parseInt(quantity);
                } else {
                    alert('Stock insuficiente para esta talla.');
                    item.quantity = availableStock;
                }
            }

            updateCart();
        }

        function removeFromCart(product, size) {
            cart = cart.filter(item => !(item.product === product && item.size === size));
            updateCart();
        }

        function clearCart() {
            cart = [];
            updateCart();
        }

        function confirmPurchase() {
            let outOfStock = false;

            cart.forEach(item => {
                const productKey = item.product.toLowerCase();
                if (stock[productKey][item.size] >= item.quantity) {
                    stock[productKey][item.size] -= item.quantity;
                } else {
                    outOfStock = true;
                    alert(`Stock insuficiente para ${item.product} (${item.size}). Compra cancelada.`);
                }
            });

            if (!outOfStock) {
                alert('Compra realiza.');
                clearCart();
                saveStock();
            }
        }

        function changeTheme(newTheme) {
            theme = newTheme;
            document.body.className = newTheme === 'dark' ? 'theme-dark' : '';
            saveTheme();
        }

        function saveCart() {
            document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/`;
        }

        function loadCart() {
            const cookies = document.cookie.split('; ');
            const cartCookie = cookies.find(row => row.startsWith('cart='));
            if (cartCookie) {
                cart = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));
            }
            updateCart();
        }

        function saveStock() {
            document.cookie = `stock=${encodeURIComponent(JSON.stringify(stock))}; path=/`;
        }

        function loadStock() {
            const cookies = document.cookie.split('; ');
            const stockCookie = cookies.find(row => row.startsWith('stock='));
            if (stockCookie) {
                stock = JSON.parse(decodeURIComponent(stockCookie.split('=')[1]));
            }
        }

        function saveTheme() {
            document.cookie = `theme=${theme}; path=/`;
        }

        function loadTheme() {
            const cookies = document.cookie.split('; ');
            const themeCookie = cookies.find(row => row.startsWith('theme='));
            if (themeCookie) {
                theme = themeCookie.split('=')[1];
                document.body.className = theme === 'dark' ? 'theme-dark' : '';
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            loadCart();
            loadTheme();
            loadStock();
        });

        function filterProduct(){   
            let busqueda= document.getElementById('busqueda').value;
            window.alert(busqueda);
            let container=document.getElementById('contenedor');
            container.innerHTML=`<h1>Busqueda: ${busqueda}</h1>`;
            if('camiseta'.includes(busqueda)){
                container.innerHTML+=camiseta.outerHTML;
            }
            if('vaqueros'.includes(busqueda)){
                container.innerHTML+=vaqueros.outerHTML;
            }
            if('abrigo'.includes(busqueda)){
                container.innerHTML+=abrigo.outerHTML;
            }
            if('calzonas'.includes(busqueda)){
                container.innerHTML+=calzonas.outerHTML;
            }
            if('calzoncillo'.includes(busqueda)){
                container.innerHTML+=calzoncillo.outerHTML;
            }
            if('calcetines'.includes(busqueda)){
                container.innerHTML+=calcetines.outerHTML;
            }
        }
        