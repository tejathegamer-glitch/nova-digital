const products = [
  {id:1,name:"The Everyday Productivity Ebook",category:"ebooks",categoryLabel:"Ebook & guide",price:149,description:"A practical guide to planning your time and focus.",icon:"📘",tag:"BESTSELLER",bg:"#e8edf2",cover:"#203d5e",type:"ebook"},
  {id:2,name:"Ultimate Study Planner",category:"templates",categoryLabel:"Digital template",price:99,description:"Organise your tasks, goals and study sessions.",icon:"",tag:"POPULAR",bg:"#f8efd9",cover:"#fff",type:"template"},
  {id:3,name:"Excel Budget Tracker",category:"templates",categoryLabel:"Spreadsheet",price:199,description:"Track spending and plan your monthly budget.",icon:"📊",tag:"SMART PICK",bg:"#e4f0e9",cover:"#1c684f",type:"template"},
  {id:4,name:"Learn Design Basics",category:"courses",categoryLabel:"Mini course",price:499,description:"A beginner-friendly introduction to visual design.",icon:"▶",tag:"NEW",bg:"#e7eaf6",cover:"#1c344e",type:"course"},
  {id:5,name:"Social Media Starter Kit",category:"design",categoryLabel:"Design assets",price:249,description:"Editable content layouts for your next campaign.",icon:"✦",tag:"CREATOR FAVOURITE",bg:"#f7e7e0",cover:"#e6a04b",type:"design"},
  {id:6,name:"Personal Finance Guide",category:"ebooks",categoryLabel:"Ebook & guide",price:129,description:"Understand everyday money habits and budgeting.",icon:"💡",tag:"QUICK READ",bg:"#e6eff6",cover:"#3c6e86",type:"ebook"},
  {id:7,name:"Presentation Template Pack",category:"templates",categoryLabel:"Presentation",price:299,description:"Clean slide layouts for projects and pitches.",icon:"",tag:"READY TO USE",bg:"#f2e6f4",cover:"#fff",type:"template"},
  {id:8,name:"Digital Illustration Toolkit",category:"design",categoryLabel:"Design assets",price:349,description:"A starter collection for your creative workflow.",icon:"✎",tag:"CREATIVE PICK",bg:"#f6edda",cover:"#c87945",type:"design"}
];

const state = {category:"all",query:"",searchCategory:"all",sort:"featured",cart:{}};
const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const toast = document.getElementById("toast");
let toastTimer;

const money = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);

function artMarkup(product, small=false){
  if(product.type === "template"){
    return `<div class="product-emoji"><i></i><i></i><i></i><i></i></div>`;
  }
  const icon = product.icon || "✦";
  return `<div class="product-emoji">${icon}${small ? "" : `<span>${product.type === "course" ? "LEARN • CREATE" : product.type === "design" ? "MAKE IT YOURS" : "DIGITAL EDITION"}</span>`}</div>`;
}

function renderProducts(){
  let visible = products.filter(p => {
    const categoryMatch = state.category === "all" || p.category === state.category;
    const searchCategoryMatch = state.searchCategory === "all" || p.category === state.searchCategory;
    const searchText = `${p.name} ${p.categoryLabel} ${p.description}`.toLowerCase();
    return categoryMatch && searchCategoryMatch && searchText.includes(state.query.toLowerCase());
  });
  if(state.sort === "low") visible.sort((a,b)=>a.price-b.price);
  if(state.sort === "high") visible.sort((a,b)=>b.price-a.price);
  if(state.sort === "name") visible.sort((a,b)=>a.name.localeCompare(b.name));

  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-art ${p.type}" style="--product-bg:${p.bg};--product-cover:${p.cover}">
        <span class="product-tag">${p.tag}</span>${artMarkup(p)}
      </div>
      <div class="product-details">
        <div class="product-category">${p.categoryLabel}</div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-bottom">
          <div class="product-price">${money(p.price)}<small>One-time price · demo</small></div>
          <button class="add-button" type="button" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button>
        </div>
      </div>
    </article>`).join("");

  emptyState.classList.toggle("hidden", visible.length !== 0);
  productGrid.classList.toggle("hidden", visible.length === 0);
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === state.category));
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2400);
}

function addToCart(id){
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  showToast("Added to your cart");
}

function renderCart(){
  const entries = Object.entries(state.cart).filter(([,qty])=>qty>0);
  const count = entries.reduce((sum,[,qty])=>sum+qty,0);
  const subtotal = entries.reduce((sum,[id,qty])=>sum+products.find(p=>p.id===Number(id)).price*qty,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerItemCount").textContent = `(${count})`;
  document.getElementById("cartSubtotal").textContent = money(subtotal);
  document.getElementById("cartItems").innerHTML = entries.map(([id,qty])=>{
    const p = products.find(item=>item.id===Number(id));
    return `<div class="cart-row">
      <div class="cart-thumb" style="--product-bg:${p.bg}">${p.icon || (p.type==="template"?"▦":"✦")}</div>
      <div><h3>${p.name}</h3><div class="row-price">${money(p.price)}</div>
        <div class="qty-controls"><button type="button" data-qty="-1" data-id="${p.id}" aria-label="Decrease quantity">−</button><span>${qty}</span><button type="button" data-qty="1" data-id="${p.id}" aria-label="Increase quantity">+</button></div>
      </div>
      <button class="remove-button" type="button" data-remove="${p.id}">Remove</button>
    </div>`;
  }).join("");
  document.getElementById("cartEmpty").classList.toggle("hidden",count>0);
  document.getElementById("cartSummary").classList.toggle("hidden",count===0);
}

function openCart(){
  cartDrawer.classList.add("open");
  overlay.classList.remove("hidden");
  cartDrawer.setAttribute("aria-hidden","false");
  document.body.classList.add("cart-open");
  document.getElementById("closeCart").focus();
}
function closeCart(){
  cartDrawer.classList.remove("open");
  overlay.classList.add("hidden");
  cartDrawer.setAttribute("aria-hidden","true");
  document.body.classList.remove("cart-open");
  document.getElementById("cartToggle").focus();
}

document.getElementById("searchForm").addEventListener("submit",event=>{
  event.preventDefault();
  state.query = document.getElementById("searchInput").value.trim();
  state.searchCategory = document.getElementById("searchCategory").value;
  state.category = "all";
  renderProducts();
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("searchInput").addEventListener("input",event=>{
  state.query = event.target.value.trim();
  state.searchCategory = document.getElementById("searchCategory").value;
  renderProducts();
});
document.getElementById("searchCategory").addEventListener("change",event=>{
  state.searchCategory = event.target.value;
  renderProducts();
});
document.getElementById("categoryChips").addEventListener("click",event=>{
  const button = event.target.closest("[data-category]");
  if(!button)return;
  state.category = button.dataset.category;
  state.searchCategory = "all";
  document.getElementById("searchCategory").value = "all";
  renderProducts();
});
document.querySelectorAll("[data-category-link]").forEach(link=>link.addEventListener("click",()=>{
  state.category = link.dataset.categoryLink;
  state.searchCategory = "all";
  renderProducts();
}));
document.getElementById("allCategories").addEventListener("click",()=>{
  state.category = "all";state.searchCategory="all";state.query="";
  document.getElementById("searchInput").value="";
  document.getElementById("searchCategory").value="all";
  renderProducts();document.getElementById("products").scrollIntoView({behavior:"smooth"});
});
document.getElementById("sortSelect").addEventListener("change",event=>{state.sort=event.target.value;renderProducts();});
productGrid.addEventListener("click",event=>{
  const button = event.target.closest("[data-add]");
  if(button)addToCart(Number(button.dataset.add));
});
document.getElementById("clearFilters").addEventListener("click",()=>{
  state.category="all";state.query="";state.searchCategory="all";
  document.getElementById("searchInput").value="";
  document.getElementById("searchCategory").value="all";
  renderProducts();
});
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",event=>{if(event.key==="Escape" && cartDrawer.classList.contains("open"))closeCart();});
document.getElementById("cartItems").addEventListener("click",event=>{
  const qtyButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if(qtyButton){
    const id=Number(qtyButton.dataset.id);
    state.cart[id]=(state.cart[id]||0)+Number(qtyButton.dataset.qty);
    if(state.cart[id]<=0)delete state.cart[id];
    renderCart();
  }
  if(removeButton){delete state.cart[Number(removeButton.dataset.remove)];renderCart();}
});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  showToast("Demo checkout only — no payment was taken.");
});
document.getElementById("accountButton").addEventListener("click",()=>{
  showToast("Account sign-in will be added in a future version.");
});
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
