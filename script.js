/*
 NOVA DIGITAL manual-payment storefront.
 Edit MANUAL_PAYMENT below with your own verified business payment details.
 This static website does not verify payments. Check your bank/UPI account yourself
 before delivering any digital product. Never add passwords, OTPs, PINs, or secret keys.
*/
const MANUAL_PAYMENT = {
  upiId: "YOUR-UPI-ID-HERE",
  storeEmail: "YOUR-STORE-EMAIL-HERE",
  qrImagePath: "upi-qr.png",
  storeName: "NOVA DIGITAL"
};
const products = [
 {id:"ebook-productivity",name:"The Art of Starting",category:"ebooks",label:"Ebook / PDF guide",price:149,desc:"A thoughtful guide to getting started with your next idea.",icon:"N.",tag:"EDITOR'S PICK",bg:"#e5e7d8",cover:"#263d32",type:"ebooks"},
 {id:"finance-guide",name:"Everyday Finance",category:"ebooks",label:"Ebook / PDF guide",price:129,desc:"Understand the basics of budgeting and money habits.",icon:"✦",tag:"QUICK READ",bg:"#e4e9e7",cover:"#4e7770",type:"ebooks"},
 {id:"study-planner",name:"The Study System",category:"templates",label:"Canva / planner template",price:99,desc:"A clean planner for goals, study sessions and routines.",icon:"▦",tag:"POPULAR",bg:"#f1e8d7",cover:"#fff",type:"templates"},
 {id:"budget-tracker",name:"Money, Organised",category:"templates",label:"Spreadsheet template",price:199,desc:"A practical monthly budget and spending tracker.",icon:"↗",tag:"SMART PICK",bg:"#e1e9df",cover:"#355d4a",type:"templates"},
 {id:"presentation-pack",name:"The Presentation Edit",category:"templates",label:"Presentation templates",price:299,desc:"Flexible layouts for projects, pitches and ideas.",icon:"▤",tag:"READY TO USE",bg:"#ece3dc",cover:"#fff",type:"templates"},
 {id:"design-course",name:"Design Foundations",category:"courses",label:"Online course",price:499,desc:"Learn the building blocks of visual design.",icon:"▶",tag:"LEARN",bg:"#e4e7dc",cover:"#263d32",type:"courses"},
 {id:"study-notes-maths",name:"Maths Revision Notes",category:"study",label:"Study notes / PDF",price:79,desc:"A sample listing for organised revision notes.",icon:"∑",tag:"STUDY SMART",bg:"#e4e9e7",cover:"#4e7770",type:"ebooks"},
 {id:"exam-prep-pack",name:"Exam Prep Pack",category:"study",label:"Study bundle",price:149,desc:"A sample bundle for notes, checklists and practice.",icon:"✓",tag:"STUDENT PICK",bg:"#f1e8d7",cover:"#263d32",type:"ebooks"},
 {id:"website-starter",name:"Website Starter Kit",category:"software",label:"Code / website template",price:399,desc:"A starter code package for a simple responsive website.",icon:"</>",tag:"BUILD FASTER",bg:"#e1e9df",cover:"#263d32",type:"courses"},
 {id:"creator-kit",name:"The Creator Kit",category:"design",label:"Creative assets",price:249,desc:"A starter set of social content design layouts.",icon:"✳",tag:"CREATOR FAVOURITE",bg:"#f0e1d9",cover:"#c66d4d",type:"design"},
 {id:"creative-toolkit",name:"Creative Toolkit",category:"design",label:"Design assets",price:349,desc:"A useful starter toolkit for your creative workflow.",icon:"✎",tag:"MAKE SOMETHING",bg:"#e9e5d7",cover:"#bd805e",type:"design"},
 {id:"font-pairing-pack",name:"Font Pairing Collection",category:"fonts",label:"Fonts / typography resource",price:199,desc:"A sample typography resource listing. Check licence terms before selling fonts.",icon:"Aa",tag:"TYPE LOVERS",bg:"#ece3dc",cover:"#263d32",type:"ebooks"},
 {id:"preset-pack",name:"Creator Preset Pack",category:"fonts",label:"Presets / creative resource",price:249,desc:"A sample listing for downloadable creative presets.",icon:"✺",tag:"CREATIVE TOOL",bg:"#f0e1d9",cover:"#c66d4d",type:"design"}
];
const state={category:"all",query:"",sort:"featured",cart:{}};
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
function productArt(p){if(p.type==="templates")return `<div class="art-cover"><i></i><i></i><i></i><i></i></div>`;return `<div class="art-cover">${p.icon}<small>NOVA DIGITAL</small></div>`;}
function renderProducts(){
 let list=products.filter(p=>(state.category==="all"||p.category===state.category)&&(`${p.name} ${p.label} ${p.desc}`.toLowerCase().includes(state.query.toLowerCase())));
 if(state.sort==="low")list.sort((a,b)=>a.price-b.price);if(state.sort==="high")list.sort((a,b)=>b.price-a.price);if(state.sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 $("productGrid").innerHTML=list.map(p=>`<article class="product-card"><div class="product-art ${p.type}" style="--bg:${p.bg};--cover:${p.cover}"><span class="product-tag">${p.tag}</span>${productArt(p)}</div><div class="product-info"><div class="product-category">${p.label}</div><h3 class="product-title">${p.name}</h3><p class="product-desc">${p.desc}</p><div class="product-bottom"><div class="price">${money(p.price)}<small>One-time price</small></div><button class="add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div></article>`).join("");
 $("empty").classList.toggle("hidden",list.length>0);$("productGrid").classList.toggle("hidden",list.length===0);
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));
}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2400);}
function add(id){state.cart[id]=(state.cart[id]||0)+1;renderCart();toast("Added to your bag");}
function renderCart(){
 const entries=Object.entries(state.cart).filter(([,q])=>q>0),count=entries.reduce((s,[,q])=>s+q,0),subtotal=entries.reduce((s,[id,q])=>s+products.find(p=>p.id===id).price*q,0);
 $("cartCount").textContent=count;$("bagCount").textContent=`(${count})`;$("subtotal").textContent=money(subtotal);
 $("cartItems").innerHTML=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `<div class="cart-row"><div class="cart-thumb" style="--bg:${p.bg}">${p.icon}</div><div><h3>${p.name}</h3><div class="row-price">${money(p.price)}</div><div class="qty"><button data-qty="-1" data-id="${id}">−</button><span>${q}</span><button data-qty="1" data-id="${id}">+</button></div></div><button class="remove" data-remove="${id}">Remove</button></div>`}).join("");
 $("cartEmpty").classList.toggle("hidden",count>0);$("checkoutButton").disabled=count===0;
}
function openCart(){$("drawer").classList.add("open");$("shade").classList.remove("hidden");}
function closeCart(){$("drawer").classList.remove("open");$("shade").classList.add("hidden");}
$("searchForm").addEventListener("submit",e=>{e.preventDefault();state.query=$("searchInput").value.trim();renderProducts();$("products").scrollIntoView({behavior:"smooth"});});
$("searchInput").addEventListener("input",e=>{state.query=e.target.value.trim();renderProducts();});
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(b){state.category=b.dataset.category;renderProducts();}});
document.querySelectorAll("[data-filter]").forEach(a=>a.addEventListener("click",()=>{state.category=a.dataset.filter;renderProducts();}));
$("sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderProducts();});
$("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(b.dataset.add);});
$("cartToggle").addEventListener("click",openCart);$("closeCart").addEventListener("click",closeCart);$("shade").addEventListener("click",closeCart);
$("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){const id=q.dataset.id;state.cart[id]=(state.cart[id]||0)+Number(q.dataset.qty);if(state.cart[id]<=0)delete state.cart[id];renderCart();}if(r){delete state.cart[r.dataset.remove];renderCart();}});
function currentCartSummary(){
 const entries=Object.entries(state.cart).filter(([,q])=>q>0);
 const total=entries.reduce((sum,[id,q])=>sum+products.find(p=>p.id===id).price*q,0);
 return {entries,total,lines:entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `${p.name} x ${q} — ${money(p.price*q)}`;})};
}
function configured(value,placeholder){return value && value!==placeholder ? value : "Not configured yet";}
$("checkoutButton").addEventListener("click",()=>{
 const {entries,total}=currentCartSummary();
 if(!entries.length){toast("Your bag is empty.");return;}
 const orderRef="NOVA-"+new Date().toISOString().replace(/[-:TZ.]/g,"").slice(0,14)+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
 $("orderReference").textContent=orderRef;
 $("manualAmount").textContent=money(total);
 $("upiIdText").textContent=configured(MANUAL_PAYMENT.upiId,"YOUR-UPI-ID-HERE");
 const hasUpi=MANUAL_PAYMENT.upiId && MANUAL_PAYMENT.upiId!=="YOUR-UPI-ID-HERE";
 $("upiPayLink").classList.toggle("hidden",!hasUpi);
 if(hasUpi){const params=new URLSearchParams({pa:MANUAL_PAYMENT.upiId,pn:MANUAL_PAYMENT.storeName,am:total.toFixed(2),cu:"INR",tn:orderRef});$("upiPayLink").href="upi://pay?"+params.toString();}
 const qr=$("upiQrImage");
 qr.src=MANUAL_PAYMENT.qrImagePath;
 qr.onerror=()=>{qr.classList.add("hidden");$("qrPlaceholder").classList.remove("hidden");};
 qr.onload=()=>{qr.classList.remove("hidden");$("qrPlaceholder").classList.add("hidden");};
 $("manualPayment").classList.remove("hidden");
 $("checkoutMessage").textContent="After paying, submit your order details. Your product is sent only after manual payment verification.";
 $("manualPayment").scrollIntoView({behavior:"smooth",block:"nearest"});
});
$("orderEmailForm").addEventListener("submit",e=>{
 e.preventDefault();
 const {entries,total,lines}=currentCartSummary();
 if(!entries.length){toast("Your bag is empty.");return;}
 if(!MANUAL_PAYMENT.storeEmail||MANUAL_PAYMENT.storeEmail==="YOUR-STORE-EMAIL-HERE"){
   toast("Store email is not configured. Edit MANUAL_PAYMENT in script.js.");
   $("checkoutMessage").textContent="Please configure storeEmail in script.js before using the order email button.";
   return;
 }
 const orderRef=$("orderReference").textContent;
 const body=[`Order reference: ${orderRef}`,`Customer name: ${$("buyerName").value.trim()}`,`Customer email: ${$("buyerEmail").value.trim()}`,`Products:`,...lines,`Total: ${money(total)}`,`Payment reference / UTR: ${$("paymentReference").value.trim()||"Not provided"}`,``,`Please verify payment in the bank/UPI account before fulfilling this order.`].join("\n");
 const subject=`NOVA DIGITAL order ${orderRef}`;
 window.location.href=`mailto:${encodeURIComponent(MANUAL_PAYMENT.storeEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();
