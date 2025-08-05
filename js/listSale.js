import { imagesList, products } from './products.data.js';

//
const openPopup = document.querySelector(".open-popup");
const navigationPopup = document.querySelector(".navigation-popup");
const closePopup = document.querySelector(".delete-navigation");
const imgBannerPopup = document.querySelector(".img-banner-overlod-navigation");
//
const navigationSit = document.querySelector(".navigation-sit");
const menuSub = document.querySelector(".menu-sub1");
const navigationUp = document.querySelector(".navigation-up");
//nút input tìm kiếm
const openInput = document.querySelector(".open-input");
const openInputFind = document.querySelector(".input-find");

openPopup.addEventListener("click", () => {
  navigationPopup.classList.add("navigation-popup--open");
});

closePopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});
imgBannerPopup.addEventListener("click", () => {
  navigationPopup.classList.remove("navigation-popup--open");
});

//
navigationSit.addEventListener("click", () => {
  menuSub.classList.add("menu-sub1--open");
  navigationSit.classList.add("hidden");
  navigationUp.classList.remove("hidden");
});

// })
navigationUp.addEventListener("click", () => {
  menuSub.classList.remove("menu-sub1--open");
  navigationUp.classList.add("hidden");
  navigationSit.classList.remove("hidden");
});
//
openInput.addEventListener("click", () => {
  openInputFind.classList.remove("hidden");
});
const closeInputFind = document.querySelector('.input-find');

closeInputFind.addEventListener('blur', () => {
  closeInputFind.classList.add('hidden')
});
  



// hiển thị thêm sản phẩm 


const loadMoreBtn = document.querySelector('#load-more-btn');
const productMainShirt = document.querySelector('.product-shirt-main')
const productMainShirtPage = document.querySelector('.product-shirt-main-page')
let currenDisplay = 6;



function renderProduct(container ,start, end) {
  // const showProduct = products.slice(start, end);
  const showProduct = products.filter((item) => {
    return item.tags && item.tags.includes('sale')
  }).slice(start,end)
  showProduct.forEach(item => {
    const divEl = document.createElement('div');
    divEl.classList.add('product-main');
    // hien thi sale 
    let saleHTML = '';
    if (item.tags) {
      if (item.tags && item.tags.includes('sale 30%')) {
        saleHTML = `<div class="sale">sale 30%</div>`;
      } else if (item.tags && item.tags.includes('sale 40%')) {
        saleHTML = `<div class="sale">sale 40%</div>`;
      }
    }
    // hien thi gia ca 
    let priceHTML = ` <p>${item.price.toLocaleString('vi-VN')}đ</p>`
    if(item.priceSale < item.price) {
      priceHTML= `
      <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
      <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
      `

    }
    // hien thi san pham noi  bat 
    let outsantHTML ='' ;
    if(item.tags && item.tags.includes('sale')){
      outsantHTML=` <img src="${item.imageURL}" alt="${item.name}" />`
    }
    else{
      return ;
    }
    divEl.innerHTML = `
      <div class="img_hidden">
        <a href="product-detail.html?id=${item.id}" class="img_box">
         ${outsantHTML}
          <div class="product_overlay"></div>
          ${saleHTML}
        </a>
      </div>
      <a href="product-detail.html?id=${item.id}" class="product_name">${item.name}</a>
      <div class="money_sale">
        ${priceHTML}
      </div>
    `;

    container.appendChild(divEl);
  });
}


// hien thi san pham trang index 
renderProduct(productMainShirt,0, currenDisplay)

// renderProduct(currenDisplay, products.length);

loadMoreBtn.addEventListener("click", () => {
  renderProduct(productMainShirt,currenDisplay, products.length);
  loadMoreBtn.classList.add('hidden')

}); 
function renderProductList (container , list) {
  container.innerHTML = '';
  list.forEach(item => {
    const divEl = document.createElement('div');
    divEl.classList.add('product-main');
    // hien thi sale 
    let saleHTML = '';
    if (item.tags) {
      if (item.tags && item.tags.includes('sale 30%')) {
        saleHTML = `<div class="sale">sale 30%</div>`;
      } else if (item.tags && item.tags.includes('sale 40%')) {
        saleHTML = `<div class="sale">sale 40%</div>`;
      }
    }
    // hien thi gia ca 
    let priceHTML = ` <p>${item.price.toLocaleString('vi-VN')}đ</p>`
    if(item.priceSale < item.price) {
      priceHTML= `
      <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
      <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
      `

    }
    divEl.innerHTML = `
      <div class="img_hidden">
        <a href="product-detail.html?id=${item.id}" class="img_box">
          <img src="${item.imageURL}" alt="${item.name}" />
          <div class="product_overlay"></div>
          ${saleHTML}
        </a>
      </div>
      <a href="product-detail.html?id=${item.id}"class="product_name">${item.name}</a>
      <div class="money_sale">
        ${priceHTML}
      </div>
    `;
    container.appendChild(divEl);
  })
}
const inputFind = document.querySelector('.input-find');
inputFind.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchText = inputFind.value.trim().toLowerCase();
    const inputNameDrop = products.filter(item =>
      item.name.toLowerCase().includes(searchText)
    );
    renderProductList(productMainShirtPage, inputNameDrop);
  }
});
//
// hien co bao nhieu san pham tren icon gio hang 
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const cartItems = cart.filter(item => {
  return item.email === currentUser.email
})
const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cartItems.reduce((total, item) => total + Number(item.quantity  ), 0);

  if (totalQuantity > 0) {
    quantityElement.textContent = totalQuantity;
    quantityElement.classList.remove('hidden');
  } else {
    quantityElement.classList.add('hidden');
  }
} else {
  // Ẩn nếu chưa đăng nhập
  if (quantityElement) {
    quantityElement.classList.add('hidden');
  }
}

// dang xuat 
const spanLogOut = document.querySelector('.log-out');

spanLogOut.addEventListener('click', () => {
  const result = confirm("Bạn chắc chắn muốn đăng xuất không");
  if (result) {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  }
});