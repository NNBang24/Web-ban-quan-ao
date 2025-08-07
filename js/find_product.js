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
    closeInputFind.classList.add('hidden');
    closeInputFind.value = '';
});
const currentUser = localStorage.getItem('currentUser');
const pareUser = JSON.parse(currentUser)
const searchKey = localStorage.getItem('searchKey');
const divProductMainPage = document.querySelector('.product-shirt-main-page');

if (searchKey) {
  const foundProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchKey.toLowerCase())
  );

  if (foundProducts.length > 0) {
    divProductMainPage.innerHTML = ''; 

    foundProducts.forEach(item => {
      const divProductHtml = document.createElement('div');
      divProductHtml.classList.add('product-main');

      // Hiển thị sale 
      let saleHTML = '';
      if (item.tags) {
        if (item.tags.includes('sale 30%')) {
          saleHTML = `<div class="sale">sale 30%</div>`;
        } else if (item.tags.includes('sale 40%')) {
          saleHTML = `<div class="sale">sale 40%</div>`;
        }
      }

      // Hiển thị giá cả
      let priceHTML = `<p>${item.price.toLocaleString('vi-VN')}đ</p>`;
      if (item.priceSale < item.price) {
        priceHTML = `
          <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
          <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
        `;
      }

      divProductHtml.innerHTML = `
        <div class="img_hidden">
          <a href="product-detail.html?id=${item.id}" class="img_box">
            <img src="${item.imageURL}" alt="${item.name}" />
            <div class="product_overlay"></div>
            ${saleHTML}
          </a>
        </div>
        <a href="product-detail.html?id=${item.id}" class="product_name">${item.name}</a>
        <div class="money_sale">
          ${priceHTML}
        </div>
      `;

      divProductMainPage.appendChild(divProductHtml);
    });

  } else {
    divProductMainPage.innerHTML = `<p class ="dont_find">Không tìm thấy sản phẩm nào phù hợp.</p>`;
  }
}
const inputFind = document.querySelector('.input-find');
inputFind.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchText = inputFind.value.trim().toLowerCase();
    if (searchText !== '') {
      localStorage.setItem('searchKey', searchText); // lưu từ khóa
      window.location.href = 'find_product.html';      // chuyển trang
    }
  }
});
// chuyen account
const buttonMyAccount = document.querySelector('.btn-my-account');
buttonMyAccount.addEventListener('click' ,() => {
  if(pareUser) {
    window.location.href ='my-account.html'
  }
  else {
    window.location.href = 'register.html'
  }
})
