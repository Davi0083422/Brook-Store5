<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script><script src="https://unpkg.com/lucide@latest"></script>
    <title>BROOK STORE | OFICIAL</title>
    <style>
        body { background: #0a0514; color: white; font-family: sans-serif; }
        .purple-glass { background: rgba(25, 10, 50, 0.8); border: 1px solid #7c3aed; backdrop-filter: blur(10px); }
        .img-prod { width: 100%; height: 160px; object-fit: cover; border-radius: 20px; border: 2px solid #7c3aed33; }
        .promo-bar { background: linear-gradient(90deg, #7c3aed, #4c1d95); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.9; } 50% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="promo-bar py-2 text-center text-[10px] font-black uppercase sticky top-0 z-[60]">🔥 PROMOÇÃO: 10% DE DESCONTO NO PIX!</div>

    <header class="p-6 flex justify-between max-w-7xl mx-auto items-center border-b border-purple-900 sticky top-[36px] bg-[#0a0514]/90 z-50">
        <div class="flex items-center gap-2">
            <h1 class="text-2xl font-black italic text-purple-500 uppercase">BROOK STORE</h1>
            <i data-lucide="badge-check" class="text-blue-400 w-5 h-5"></i>
        </div>
        <button onclick="toggleCart()" class="relative p-3 bg-purple-900/30 border border-purple-500/50 rounded-2xl">
            <i data-lucide="shopping-cart"></i>
            <span id="cart-count" class="absolute -top-1 -right-1 bg-purple-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">0</span>
        </button>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-12">
        <div id="products-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"></div>
    </main>

    <a href="https://discord.com/channels/1471278435602268160/1471287589507043461" target="_blank" class="fixed bottom-6 right-6 bg-purple-600 p-4 rounded-full shadow-lg z-[100] hover:scale-110 transition">
        <i data-lucide="headphones"></i>
    </a>

    <div id="cart-sidebar" class="fixed right-0 top-0 h-full w-full md:w-96 purple-glass z-[100] translate-x-full transition-transform p-6 flex flex-col border-l border-purple-500/30">
        <div class="flex justify-between items-center mb-8 border-b border-purple-800 pb-4">
            <h3 class="font-black text-purple-400">CARRINHO</h3>
            <button onclick="toggleCart()"><i data-lucide="x"></i></button>
        </div>
        <div id="cart-items" class="flex-1 space-y-4 overflow-y-auto"></div>
        <div class="border-t border-purple-800 pt-6">
            <div class="flex justify-between font-black text-xl mb-6"><span>TOTAL:</span><span id="cart-total" class="text-purple-400">R$ 0,00</span></div>
            <button onclick="checkout()" class="w-full bg-purple-600 py-4 rounded-xl font-black uppercase">Finalizar no Pix</button>
        </div>
    </div>

    <div id="pix-modal" class="hidden fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 text-center">
        <div class="bg-[#130a24] border border-purple-500 p-8 rounded-[40px] max-w-sm w-full">
            <h3 class="text-purple-400 font-black mb-4">PAGAMENTO PIX</h3>
            <div id="qr-code" class="bg-white p-2 rounded-2xl inline-block mb-4"></div>
            <div class="mb-6 text-left">
                <p class="text-gray-400 text-[10px] uppercase font-bold mb-2">Pix Copia e Cola</p>
                <div class="flex gap-2 bg-black/40 p-3 rounded-xl border border-purple-900/50 items-center">
                    <input type="text" id="pix-key-input" readonly value="24999582173" class="bg-transparent text-[10px] w-full text-purple-300 outline-none">
                    <button onclick="copyPix()"><i data-lucide="copy" class="w-4 h-4"></i></button>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <button onclick="confirmar('W')" class="w-full bg-[#25D366] py-4 rounded-xl font-black text-xs">CONFIRMAR NO WHATSAPP</button>
                <button onclick="confirmar('D')" class="w-full bg-[#5865F2] py-4 rounded-xl font-black text-xs">DISCORD (20mil_1)</button>
                <button onclick="document.getElementById('pix-modal').classList.add('hidden')" class="text-gray-500 font-bold uppercase text-[10px] mt-2">Voltar</button>
            </div>
        </div>
    </div>

    <script>
        lucide.createIcons();
        const PIX_KEY = "24999582173";
        let cart = [];
        const prods = [
            {id: 1, n: 'Painel da Barbie', v: 5.00, i: 'https://images.weserv.nl/?url=raw.githubusercontent.com/lovable-uploads/main/image_ce1535.png'},
            {id: 2, n: 'Atalho Full V4', v: 2.99, i: 'https://images.weserv.nl/?url=raw.githubusercontent.com/lovable-uploads/main/image_cdbefb.jpg'},
            {id: 3, n: 'Holograma V2', v: 1.00, i: 'https://images.weserv.nl/?url=raw.githubusercontent.com/lovable-uploads/main/image_cdbb94.jpg'},
            {id: 4, n: 'Painel Dark Aura', v: 6.99, i: 'https://images.weserv.nl/?url=raw.githubusercontent.com/lovable-uploads/main/image_cdb7f8.png'},
            {id: 5, n: 'Painel Freestyle', v: 2.99, i: 'https://images.weserv.nl/?url=raw.githubusercontent.com/lovable-uploads/main/image_cdbb00.png'}
        ];
        const grid = document.getElementById('products-grid');
        grid.innerHTML = prods.map(p => `
            <div class="purple-glass p-5 rounded-[35px] flex flex-col items-center">
                <img src="${p.i}" class="img-prod mb-4 shadow-xl" onerror="this.src='https://via.placeholder.com/300x160/1a1033/7c3aed?text=BROOK+STORE'">
                <h3 class="text-lg font-black uppercase text-purple-100 italic">${p.n}</h3>
                <span class="text-2xl font-black text-purple-400 my-3 italic">R$ ${p.v.toFixed(2)}</span>
                <button onclick="addToCart(${p.id})" class="w-full bg-purple-600/20 border border-purple-500 py-3 rounded-xl font-black uppercase hover:bg-purple-600 transition">Comprar</button>
            </div>`).join('');
        function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('translate-x-full'); }
        function addToCart(id) {
            const p = prods.find(x => x.id === id);
            cart.push({...p, cId: Date.now()});
            updateCart();
            if(window.innerWidth > 768) toggleCart();
        }
        function updateCart() {
            const list = document.getElementById('cart-items');
            const total = cart.reduce((acc, curr) => acc + curr.v, 0);
            document.getElementById('cart-count').innerText = cart.length;
            document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
            list.innerHTML = cart.map(item => `<div class="flex items-center gap-3 bg-purple-900/20 p-3 rounded-2xl border border-purple-800/50"><div class="flex-1 text-[10px] font-black uppercase italic">${item.n}</div></div>`).join('');
        }
        function copyPix() { navigator.clipboard.writeText(PIX_KEY); alert("Copiado!"); }
        function confirmar(tipo) {
            const total = cart.reduce((acc, curr) => acc + curr.v, 0);
            const msg = `Olá Davi, fiz o PIX de R$${total.toFixed(2)} na Brook Store.`;
            window.open(tipo === 'W' ? `https://wa.me/55${PIX_KEY}?text=${encodeURIComponent(msg)}` : "https://discord.com/channels/@me", '_blank');
        }
        function checkout() {
            if(cart.length === 0) return;
            const total = cart.reduce((acc, curr) => acc + curr.v, 0);
            const pay = `00020101021126580014BR.GOV.BCB.PIX0114${PIX_KEY}5204000053039865404${total.toFixed(2)}5802BR5911BROOKSTORE6009SAOPAULO62070503***6304`;
            document.getElementById('qr-code').innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pay)}" class="rounded-xl">`;
            document.getElementById('pix-modal').classList.remove('hidden');
        }
    </script>
</body>
</html>
