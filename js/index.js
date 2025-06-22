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
const openInputFind = document.querySelector(".input-find");

openPopup.addEventListener("click", () => {
  navigationPopup.classList.add("navigation-popup--open");
});
openPopup.addEventListener('blur',() => {
navigationPopup.classList.remove("navigation-popup--open");
} )
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
// hiển thị thêm sản phẩm 


const loadMoreBtn =  document.querySelector('#load-more-btn');
const productMainShirt = document.querySelector('.product-shirt-main')
let currenDisplay = 6;

function renderProduct ( start , end) {
  const showProduct = products.slice(start ,end);
  showProduct.forEach(item => {
    const divEl = document.createElement('div');
    divEl.classList.add('product-main');
    divEl.innerHTML =`
          <div class="img_hidden">
            <a href="" class="img_box">
              <img src="${item.imageURL}" alt="shirt1" />
              <div class="product_overlay"></div>
              <div class="sale">sale 30%</div>
            </a>
          </div>
          <a href="" class="product_name">${item.name}</a>
          <div class="money_sale">
            <p>${item.price}</p>
            <p class="sale-m">${item.priceSlae}</p>
          </div>
    `
    productMainShirt.appendChild(divEl);
  })
}
renderProduct(0,currenDisplay)
// renderProduct(currenDisplay, products.length);





loadMoreBtn.addEventListener("click", () => {
  renderProduct(currenDisplay, products.length);
  loadMoreBtn.classList.add('hidden')
  
});

// clcik mat thanh tim kiem 
// const bodyElClcik = document.querySelector('.body-click');
const openInputDelete = document.querySelector('.open-input');
openInputDelete.addEventListener('blur' ,() =>{

})