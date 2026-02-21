const express = require('express');
const app = express();

const CONFIG = {
  MINHA_CHAVE_PIX: "24999582173", // Sua chave PIX oficial
  MEU_WHATSAPP: "5524999582173", 
  DISCORD_OFICIAL: "https://discord.gg/2kQNPxxEnV",
  NOME_LOJA: "BROOK STORE"
};

const products = [
  { id: "holograma-rosa", title: "Holograma rosa", price: 1.00, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_973ea4.png", description: "Melhor holograma saindo por preço de uma bala" },
  { id: "auxilio-mira-ios", title: "Auxílio de mira ios", price: 2.00, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_973e27.png", description: "Melhor auxilio ios disponível no mercado." },
  { id: "free-fire-amazon", title: "Free fire Amazon", price: 2.99, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_97418c.jpg", description: "Adquira seu free fire da Amazon para trazer mais fps" },
  { id: "painel-da-barbie", title: "Painel da barbie", price: 5.00, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_973de4.png", description: "Melhor painel da loja. Completo com Aimbot e FOV Hack." },
  { id: "painel-dark-aura", title: "Painel dark aura", price: 6.99, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_973e66.png", description: "Painel dark aura, no preço de um doritos!" },
  { id: "painel-uriel", title: "Painel do uriel", price: 20.99, image: "https://raw.githubusercontent.com/lovable-uploads/main/image_973a5f.png", description: "Painel uriel de elite." }
];

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>\${CONFIG.NOME_LOJA}</title>
    </head>
    <body class="bg-[#0a0b14] text-white font-sans p-6">
        <header class="text-center mb-10 uppercase font-black">
            <h1 class="text-5xl text-blue-500 italic drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">\${CONFIG.NOME_LOJA}</h1>
            <p class="text-gray-400 mt-2 tracking-widest underline decoration-blue-500">O Brabo dos Painéis</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            \${products.map(p => \`
                <div class="bg-gray-900/40 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition-all flex flex-col items-center">
                    <img src="\${p.image}" class="h-32 mb-4 object-contain shadow-blue-500/20 shadow-xl" onerror="this.src='https://via.placeholder.com/150/000/FFF?text=IMG'">
                    <h3 class="text-lg font-bold uppercase">\${p.title}</h3>
                    <p class="text-blue-500 font-black text-2xl my-2 italic font-mono">R$ \${p.price.toFixed(2)}</p>
                    <button onclick="window.location.href='/checkout/\${p.id}'" class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-black uppercase text-sm mt-auto shadow-lg shadow-blue-600/30">Comprar Agora</button>
                </div>
            \`).join('')}
        </div>
    </body>
    </html>
  `);
});

app.get('/checkout/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.redirect('/');

  const pixPayload = \`00020101021126580014BR.GOV.BCB.PIX0114\${CONFIG.MINHA_CHAVE_PIX}5204000053039865404\${product.price.toFixed(2)}5802BR5911BROOKSTORE6009SAOPAULO62070503***6304\`;
  const qrCodeUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=\${encodeURIComponent(pixPayload)}\`;

  res.send(\`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Checkout - \${product.title}</title>
    </head>
    <body class="bg-[#0a0b14] text-white flex items-center justify-center min-h-screen p-4">
        <div class="bg-[#121421] border border-gray-800 w-full max-w-md rounded-[40px] p-8 text-center shadow-2xl">
            <h2 class="text-2xl font-black mb-6 italic text-blue-500 uppercase font-serif">PAGAMENTO PIX</h2>
            <div class="bg-white p-4 rounded-3xl inline-block mb-6 shadow-[0_0_30px_rgba(255,255,255,0.15)]"><img src="\${qrCodeUrl}"></div>
            <div class="bg-black/50 p-4 rounded-2xl border border-gray-800 mb-6 text-center">
                <p class="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Valor do \${product.title}</p>
                <p class="text-3xl font-black text-blue-500 font-mono">R$ \${product.price.toFixed(2)}</p>
            </div>
            <div class="space-y-3">
                <button onclick="window.open('https://wa.me/\${CONFIG.MEU_WHATSAPP}?text=Fiz+o+pagamento+de+R$+\${product.price.toFixed(2)}+pelo+\${product.title}', '_blank')" class="w-full bg-[#25D366] py-4 rounded-2xl font-black uppercase shadow-lg shadow-green-600/20 transition hover:scale-105">WhatsApp</button>
                <button onclick="window.open('\${CONFIG.DISCORD_OFICIAL}', '_blank')" class="w-full bg-[#5865F2] py-4 rounded-2xl font-black uppercase shadow-lg shadow-blue-600/20 transition hover:scale-105">Entrar no Discord</button>
            </div>
            <a href="/" class="block mt-6 text-gray-500 text-sm hover:underline italic">Voltar</a>
        </div>
    </body>
    </html>
  \`);
});

module.exports = app;
