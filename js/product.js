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
const productMainShirtPage = document.querySelector('.product-shirt-main-page')
let currenDisplay = 8;
// hien thi san pham nam haoc nu 
const optionMen = document.querySelector('.option-men');
const optionWoman = document.querySelector('.option-woman')

// hien thij ta ca san pham 
function renderProduct(container ,start, end) {
  const showProduct = products.slice(start, end);
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
    divEl.innerHTML = `
      <div class="img_hidden">
        <a href="" class="img_box">
          <img src="${item.imageURL}" alt="${item.name}" />
          <div class="product_overlay"></div>
          ${saleHTML}
        </a>
      </div>
      <a href="" class="product_name">${item.name}</a>
      <div class="money_sale">
        ${priceHTML}
      </div>
    `;

    container.appendChild(divEl);
  });
}
// hien thi san pham trang product
renderProduct(productMainShirtPage,0, currenDisplay);


// hien thi san pham la khi click nu hoac nam 
function renderProductList (container , list) {


}



// click remove mat nut hien thi them
loadMoreBtn.addEventListener("click", () => {
  renderProduct(productMainShirtPage,currenDisplay, products.length);
  loadMoreBtn.classList.add('hidden')
});

// click option nam hien thi danh sach toan la  do nam
// optionMen.addEventListener("click", () => {
//   productMainShirtPage.innerHTML = ''; // xoá hết sản phẩm hiện tại
//   const shirtMen = products.filter((item) => item.category.includes('Nam'));
 
// });
// optionWoman.addEventListener("click", () => {
//   productMainShirtPage.innerHTML = '';
//   const shirtWomen = products.filter((item) => item.category.includes('Nữ'));
//   renderProduct(productMainShirtPage,shirtWomen,products.length)
// });
const menProducts = products.filter(p => p.category.includes("Nam"));

console.log(menProducts);