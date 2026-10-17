/*
  NOVA DIGITAL frontend.
  Checkout stays disabled until the Supabase backend is configured.
  Never place Razorpay Key Secret or Supabase service-role keys in this file.
*/
const CONFIG = {
  // After creating a Supabase project, set these values:
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  RAZORPAY_KEY_ID: ""
};
const products=[
 {id:"ebook-productivity",name:"The Art of Starting",category:"ebooks",label:"Ebook / guide",price:149,desc:"A thoughtful guide to getting started with your next idea.",icon:"N.",tag:"EDITOR'S PICK",bg:"#e5e7d8",cover:"#263d32",type:"ebooks"},
 {id:"study-planner",name:"The Study System",category:"templates",label:"Digital template",price:99,desc:"A clean planner for goals, study sessions and routines.",icon:"▦",tag:"POPULAR",bg:"#f1e8d7",cover:"#fff",type:"templates"},
 {id:"budget-tracker",name:"Money, Organised",category:"templates",label:"Spreadsheet",price:199,desc:"A practical monthly budget and spending tracker.",icon:"↗",tag:"SMART PICK",bg:"#e1e9df",cover:"#355d4a",type:"templates"},
 {id:"design-course",name:"Design Foundations",category:"courses",label:"Mini course",price:499,desc:"Learn the building blocks of visual design.",icon:"▶",tag:"LEARN",bg:"#e4e7dc",cover:"#263d32",type:"courses"},
 {id:"social-kit",name:"The Creator Kit",category:"design",label:"Creative assets",price:249,desc:"A starter set of social content design layouts.",icon:"✳",tag:"CREATOR FAVOURITE",bg:"#f0e1d9",cover:"#c66d4d",type:"design"},
 {id:"finance-guide",name:"Everyday Finance",category:"ebooks",label:"Ebook / guide",price:129,desc:"Understand the basics of budgeting and money habits.",icon:"✦",tag:"QUICK READ",bg:"#e4e9e7",cover:"#4e7770",type:"ebooks"},
 {id:"presentation-pack",name:"The Presentation Edit",category:"templates",label:"Slide templates",price:299,desc:"Flexible layouts for projects, pitches and ideas.",icon:"▤",tag:"READY TO USE",bg:"#ece3dc",cover:"#fff",type:"templates"},
 {id:"creative-toolkit",name:"Creative Toolkit",category:"design",label:"Design assets",price:349,desc:"A useful starter toolkit for your creative workflow.",icon:"✎",tag:"MAKE SOMETHING",bg:"#e9e5d7",cover:"#bd805e",type:"design"}
];
const state={category:"all",query:"",sort:"featured",cart:{}};
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
let supabaseClient=null;
if(CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY && window.supabase){
  supabaseClient=window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_ANON_KEY);
}
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
$("checkoutButton").addEventListener("click",async()=>{
 if(!supabaseClient || !CONFIG.RAZORPAY_KEY_ID){$("checkoutMessage").textContent="Secure checkout is not configured yet. Follow README to connect Supabase and Razorpay.";toast("Checkout is not configured yet.");return;}
 // Backend function validates product IDs and prices, creates the Razorpay order.
 const items=Object.entries(state.cart).map(([product_id,quantity])=>({product_id,quantity}));
 const {data,error}=await supabaseClient.functions.invoke("create-order",{body:{items}});
 if(error||!data?.order_id){toast("Could not create checkout. Please try again.");return;}
 const checkout=new Razorpay({key:CONFIG.RAZORPAY_KEY_ID,amount:data.amount,currency:"INR",name:"NOVA DIGITAL",description:"Digital products",order_id:data.order_id,handler:async response=>{
   const verified=await supabaseClient.functions.invoke("verify-payment",{body:{...response,order_id:data.order_id}});
   if(verified.error||!verified.data?.verified){toast("Payment could not be verified. Contact support before retrying.");return;}
   state.cart={};renderCart();closeCart();toast("Payment verified. Your download access is ready.");
   // The backend response should provide authorized download information only after verification.
 },modal:{ondismiss:()=>toast("Checkout closed.")}});
 checkout.open();
});
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();
