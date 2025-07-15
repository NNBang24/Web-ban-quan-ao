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
  closeInputFind.value ='';
});
  



// hiển thị thêm sản phẩm 


const loadMoreBtn = document.querySelector('#load-more-btn');
const productMainShirtPage = document.querySelector('.product-shirt-main-page')
let currenDisplay = 8;


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

    container.appendChild(divEl);
  });
}
// hien thi san pham trang product
renderProduct(productMainShirtPage,0, currenDisplay);

// hien thi san pham la khi click nu hoac nam 
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
      <a href="product-detail.html?id=${item.id}" class="product_name">${item.name}</a>
      <div class="money_sale">
        ${priceHTML}
      </div>
    `;
    container.appendChild(divEl);
  })
}

const selectDrop = document.querySelector('#select-drop')
// clik change loc Nam va NU 
selectDrop.addEventListener("change" , () =>{
  const selectValue = selectDrop.value ;
  if(selectValue === 'Nam') {
    const shirtMen = products.filter(item => {
     return item.category.includes('Nam')
    })
    renderProductList(productMainShirtPage,shirtMen);

  }
  else if(selectValue === 'Nu') {
    const shirtWomen = products.filter(item => {
      return item.category.includes('Nu')
    })
    renderProductList(productMainShirtPage,shirtWomen)
  }
  else{
    renderProduct(productMainShirtPage,0,currenDisplay)
  }
  loadMoreBtn.classList.add('hidden');

  
});

// 
const inputDrop = document.querySelector('.input-drop');
inputDrop.addEventListener('input' ,() =>{   
   const searchText = inputDrop.value.trim().toLowerCase();
    const inputNameDrop = products.filter(item => item.name.toLowerCase().includes(searchText));
    renderProductList(productMainShirtPage,inputNameDrop)
    loadMoreBtn.classList.add('hidden')
})
// inputDrop.addEventListener('blur', () => {
//   inputDrop.value ='';
// });
//
const inputFind = document.querySelector('.input-find');
inputFind.addEventListener('input' ,() =>{   
   const searchText = inputFind.value.trim().toLowerCase();
    const inputNameDrop = products.filter(item => item.name.toLowerCase().includes(searchText));
    renderProductList(productMainShirtPage  ,inputNameDrop)
})


// click remove mat nut hien thi them
loadMoreBtn.addEventListener("click", () => {
  renderProduct(productMainShirtPage,currenDisplay, products.length);
  loadMoreBtn.classList.add('hidden')
});

