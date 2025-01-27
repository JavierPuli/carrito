  let carrito = [];
        let tema = 'light';
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

        function anadiralcarrito(producto, precio, talla, id) {
            const Stockdisponible = stock[id][talla];
            const productoexistente = carrito.find(item => item.producto === producto && item.talla === talla);

            if (Stockdisponible > 0) {
                if (productoexistente) {
                    if (productoexistente.quantity < Stockdisponible) {
                        productoexistente.quantity++;
                    } else {
                        alert('Stock insuficiente para esta talla.');
                        return;
                    }
                } else {
                    carrito.push({ producto, precio, talla, quantity: 1 });
                }
                alctualizarcarrito();
            } else {
                alert('Sin stock.');
            }
        }

        function actualizarcarrito() {
            const carritoBody = document.getElementById('carrito-body');
            carritoBody.innerHTML = '';

            let total = 0;
            carrito.forEach(item => {
                const subtotal = item.precio * item.quantity;
                total += subtotal;

                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${item.producto}</td>
                    <td>${item.talla}</td>
                    <td><input type="number" value="${item.quantity}" min="1" onchange="cargarcantidad('${item.producto}', '${item.talla}', this.value, '${item.producto.toLowerCase()}')"></td>
                    <td>$${item.precio}</td>
                    <td>$${subtotal}</td>
                    <td><button onclick="borrardelcarro('${item.producto}', '${item.talla}')">Borrar</button></td>
                `;
                carritoBody.appendChild(fila);
            });

            document.getElementById('precio-total').textContent = `Total: ${total}€`;
            guardarcarrito();
        }

        function cargarcantidad(producto, talla, quantity, id) {
            const item = carrito.find(item => item.producto === producto && item.talla === talla);

            if (item) {
                const Stockdisponible = stock[id][talla];
                if (quantity <= Stockdisponible) {
                    item.quantity = parseInt(quantity);
                } else {
                    alert('Stock insuficiente para esta talla.');
                    item.quantity = Stockdisponible;
                }
            }

            actualizarcarrito();
        }

        function borrardelcarro(producto, talla) {
            carrito = carrito.filter(item => !(item.producto === producto && item.talla === talla));
            actualizarcarrito();
        }

        function limpiarcarrito() {
            carrito = [];
            updateCart();
        }

        function confirmarcompra() {
            let fueradeStock = false;

            carrito.forEach(item => {
                const id = item.producto.toLowerCase();
                if (stock[id][item.talla] >= item.quantity) {
                    stock[id][item.talla] -= item.quantity;
                } else {
                    fueradeStock = true;
                    alert(`Stock insuficiente para ${item.producto} (${item.talla}). Compra cancelada.`);
                }
            });

            if (!fueradeStock) {
                alert('Compra realiza.');
                limpiarcarrito();
                guardarstock();
            }
        }

        function cambiartema(nuevotema) {
            tema = nuevotema;
            document.body.className = nuevotema === 'dark' ? 'theme-dark' : '';
            guardartema();
        }

        function guardarcarrito() {
            document.cookie = `carrito=${encodeURIComponent(JSON.stringify(carrito))}; path=/`;
        }

        function cargarcarrito() {
            const cookies = document.cookie.split('; ');
            const cartCookie = cookies.find(row => row.startsWith('carrito='));
            if (cartCookie) {
                carrito = JSON.parse(decodeURIComponent(cartCookie.split('=')[1]));
            }
            updateCart();
        }

        function guardarstock() {
            document.cookie = `stock=${encodeURIComponent(JSON.stringify(stock))}; path=/`;
        }

        function cargarStock() {
            const cookies = document.cookie.split('; ');
            const stockCookie = cookies.find(row => row.startsWith('stock='));
            if (stockCookie) {
                stock = JSON.parse(decodeURIComponent(stockCookie.split('=')[1]));
            }
        }

        function guardartema() {
            document.cookie = `tema=${tema}; path=/`;
        }

        function cargartema() {
            const cookies = document.cookie.split('; ');
            const temaCookie = cookies.find(row => row.startsWith('tema='));
            if (temaCookie) {
                tema = temaCookie.split('=')[1];
                document.body.className = tema === 'dark' ? 'theme-dark' : '';
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            cargarcarrito();
            cargartema();
            cargarStock();
        });

        function filtrarproducto(){   
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
        