import { imagesList ,products} from './products.data.js';

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
const closeInput = document.querySelector(".body");
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
// 
// silde-show images 
  

let currentIndex = 0 ;
const imgElement = document.querySelector('.img-slideshow');
function changeImage (){
  currentIndex++ ;
  if (currentIndex >= imagesList.length){
    currentIndex = 0
  }
  imgElement.src = imagesList[currentIndex];
  const indexItems = document.querySelectorAll('.index-item')
  indexItems.forEach((item , index) => {
    if (index === currentIndex) {
      item.classList.add('active')
    }
    else{
      item.classList.remove('active')
    }
  });
}
setInterval(changeImage ,3000);
/////
const productList = document.getElementById('product-list');

products.forEach(product => {
  const saleTag = product.tags && product.tags.includes('sale') ? `<div class="sale">SALE</div>` : '';
  const productHTML = `
    <div class="product-main">
      <div class="img_hidden">
        <a href="#" class="img_box">
          <img src="${product.imageURL}" alt="${product.name}" />
          <div class="product_overlay"></div>
          ${saleTag}
        </a>
      </div>
      <a href="#" class="product_name">${product.name}</a>
      <p>${product.price.toLocaleString('vi-VN')}đ</p>
    </div>
  `;
  productList.innerHTML += productHTML;
});

