
// VARAHEY SWEET RATE MENU
// Edit the price values below whenever your shop rate changes.
// Current prototype rates are shown per 500g. Verify them with your final shop menu before publishing.
const PRODUCTS = [
 {id:'ajmaar-kalakand',name:'Ajmaar Kalakand',price:400,image:'assets/ajmaar-kalakand.jpg',badge:'SPECIAL'},
 {id:'kaju-katli',name:'Kaju Katli',price:680,image:'assets/kaju-katli.jpg',badge:'FAVOURITE'},
 {id:'motichoor-laddu',name:'Motichoor Laddu',price:260,image:'assets/motichoor-laddu.jpg',badge:'POPULAR'},
 {id:'badam-burfi',name:'Badam Burfi',price:340,image:'assets/badam-burfi.jpg',badge:'RICH'},
 {id:'malai-peda',name:'Malai Peda',price:300,image:'assets/malai-peda.jpg',badge:'FRESH'},
 {id:'rasgulla',name:'Rasgulla',price:220,image:'assets/rasgulla.jpg',badge:'CLASSIC'},
 {id:'gulab-jamun',name:'Gulab Jamun',price:240,image:'assets/gulab-jamun.jpg',badge:'CLASSIC'},
 {id:'moong-dal-halwa',name:'Moong Dal Halwa',price:280,image:'assets/moong-dal-halwa.jpg',badge:'TRADITIONAL'},
 {id:'besan-barfi',name:'Besan Barfi',price:240,image:'assets/besan-barfi.jpg',badge:'FAVOURITE'},
 {id:'dry-fruit-roll',name:'Dry Fruit Roll',price:600,image:'assets/dry-fruit-roll.jpg',badge:'PREMIUM'},
 {id:'coconut-laddu',name:'Coconut Laddu',price:260,image:'assets/coconut-laddu.jpg',badge:'FRESH'},
 {id:'jalebi',name:'Jalebi',price:180,image:'assets/jalebi.jpg',badge:'CRISPY'}
];
let cart = JSON.parse(localStorage.getItem('varaheyCart') || '{}');

function money(n){ return '₹' + n.toLocaleString('en-IN'); }
function save(){ localStorage.setItem('varaheyCart', JSON.stringify(cart)); }
function getProduct(id){ return PRODUCTS.find(p=>p.id===id); }
function addToCart(id, qty=1){ cart[id]=(cart[id]||0)+qty; save(); renderCart(); openCart(); }
function changeQty(id, delta){ cart[id]=(cart[id]||0)+delta; if(cart[id]<=0) delete cart[id]; save(); renderCart(); }
function renderProducts(){
 const grid=document.getElementById('productGrid');
 grid.innerHTML=PRODUCTS.map(p=>`<article class="product"><div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span>${p.badge}</span></div><div class="product-body"><h3>${p.name}</h3><div class="price">${money(p.price)} <small>/ 500g</small></div><div class="product-actions"><div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><b>${cart[p.id]||1}</b><button onclick="changeQty('${p.id}',1)">+</button></div><button class="add" onclick="addToCart('${p.id}')">🛒 Add to Cart</button></div></div></article>`).join('');
}
function renderCart(){
 const list=document.getElementById('cartItems'), empty=document.getElementById('cartEmpty');
 const ids=Object.keys(cart).filter(id=>cart[id]>0);
 if(!ids.length){list.innerHTML='';empty.style.display='block';}else{empty.style.display='none';list.innerHTML=ids.map(id=>{const p=getProduct(id),q=cart[id];return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div class="ci-info"><b>${p.name}</b><span>${money(p.price)} / 500g</span><div class="ci-controls"><button onclick="changeQty('${id}',-1)">−</button><b>${q}</b><button onclick="changeQty('${id}',1)">+</button><button class="remove" onclick="changeQty('${id}',-999)">Remove</button></div></div><strong>${money(p.price*q)}</strong></div>`}).join('');}
 const count=ids.reduce((s,id)=>s+cart[id],0); const total=ids.reduce((s,id)=>s+getProduct(id).price*cart[id],0);
 document.getElementById('cartCount').textContent=count; document.getElementById('cartTotal').textContent=money(total); renderProducts();
}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartOverlay').classList.add('open');document.body.classList.add('locked');}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartOverlay').classList.remove('open');document.body.classList.remove('locked');}
function checkout(){
 const ids=Object.keys(cart).filter(id=>cart[id]>0); if(!ids.length){alert('Please add at least one sweet to your cart.');return;}
 const lines=ids.map(id=>{const p=getProduct(id);return `${p.name} - ${cart[id]} x 500g = ${money(p.price*cart[id])}`;});
 const total=ids.reduce((s,id)=>s+getProduct(id).price*cart[id],0);
 const msg=`Hello VARAHEY SWEET, I would like to place an order:\n\n${lines.join('\n')}\n\nSubtotal: ${money(total)}\nDelivery: FREE within 3 KMs\n\nPlease confirm availability and delivery time.`;
 window.open('https://wa.me/919676647106?text='+encodeURIComponent(msg),'_blank');
}
document.getElementById('cartButton').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('cartOverlay').onclick=closeCart;document.getElementById('checkout').onclick=checkout;document.getElementById('shopNow').onclick=closeCart;
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',closeCart));
renderCart();
