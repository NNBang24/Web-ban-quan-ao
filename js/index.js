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

// 
// silde-show images 

let currentIndex = 0;
const imgElement = document.querySelector('.img-slideshow');
function changeImage() {
  currentIndex++;
  if (currentIndex >= imagesList.length) {
    currentIndex = 0
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });
}
setInterval(changeImage, 3000);

// click chuyeen tiep
const navigationLeftButton = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imagesList.length - 1;
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });

}
const navigationRightButton = () => {
  currentIndex++;
  if (currentIndex >= imagesList.length) {
    currentIndex = 0;
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else {
      item.classList.remove('active')
    }
  });

}
const navigationLeft = document.querySelector('.navigation-left');
navigationLeft.addEventListener('click', navigationLeftButton)
const navigationRight = document.querySelector('.navigation-right');
navigationRight.addEventListener('click', navigationRightButton)


// hiển thị thêm sản phẩm 


const loadMoreBtn = document.querySelector('#load-more-btn');
const productMainShirt = document.querySelector('.product-shirt-main')
const productMainShirtPage = document.querySelector('.product-shirt-main-page')
let currenDisplay = 6;


const filterProducts = products.filter(item => {
   return item.tags && item.tags.includes('noi bat')
})
function renderProduct(container, start, end) {
  const showProduct = filterProducts.slice(start, end)
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
    if (item.priceSale < item.price) {
      priceHTML = `
      <p>${item.priceSale.toLocaleString('vi-VN')}đ</p>
      <p class="sale-m">${item.price.toLocaleString('vi-VN')}đ</p>
      `

    }
    // hien thi san pham noi  bat 
    let outsantHTML = '';
    if (item.tags && item.tags.includes('noi bat')) {
      outsantHTML = ` <img src="${item.imageURL}" alt="${item.name}" />`
    }
    else {
      return;
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
  if (end >= filterProducts.length) {
    loadMoreBtn.classList.add('hidden')
  }
}


// hien thi san pham trang index 
renderProduct(productMainShirt, 0, currenDisplay)

// renderProduct(currenDisplay, products.length);

loadMoreBtn.addEventListener("click", () => {
  const prevDisplay = currenDisplay;
  currenDisplay += 8
  renderProduct(productMainShirt  , prevDisplay, currenDisplay);
  // loadMoreBtn.classList.add('hidden')
});
function renderProductList(container, list) {
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
    if (item.priceSale < item.price) {
      priceHTML = `
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
// hien co bao nhieu san pham tren icon gio hang 

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

let cartItems = [];

if (currentUser) {
  cartItems = cart.filter(item => item.email === currentUser.email);
}

const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cartItems.reduce((total, item) => total + Number(item.quantity), 0);

  if (totalQuantity > 0) {
    quantityElement.textContent = totalQuantity;
    quantityElement.classList.remove('hidden');
  } else {
    quantityElement.classList.add('hidden');
  }
} else {
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
// chuyen account
const buttonMyAccount = document.querySelector('.btn-my-account');
buttonMyAccount.addEventListener('click' ,() => {
  if(currentUser) {
    window.location.href ='my-account.html'
  }
  else {
    window.location.href = 'register.html'
  }
})





