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


/// xac nhan da dang nhap chua de them vao gio hang 

// const buttonAdToCart = document.querySelector('.button-detail');
// buttonAdToCart.addEventListener('click' ,() => {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   if(!currentUser || !currentUser.isLogin){
//     alert('vui lòng đăng nhập trước khi thêm sản phẩm')
//     window.location.href = 'login.html'
//     return 
//   }

//   alert('Thêm vào giỏ hàng thành công')
// });



// click san pham de den trang peoducts-detial

const params = new URLSearchParams(window.location.search);
console.log(params)

// lay id san pham ra 
const productId = params.get('id')
// console.log(productId)

// tu id toi se lay duoc mang ma toi can tim 

const productDetail = products.find(item => {
  return Number(item.id) === Number(productId)
})
// console.log(productDetail)

if (productDetail) {
  const sectionDetail = document.querySelector('.detail-main');
  const optionSizes = productDetail.sizes.map(item => {
    return ` <option value="${item}">Size ${item}</option>`
  }).join('')
  let priceHtml = '';
  if (productDetail.priceSale) {
    priceHtml = `<p class="price-detail">${productDetail.priceSale.toLocaleString('vi-VN')} VND</p>`;
  } else if (productDetail.price) {
    priceHtml = `<p class="price-detail">${productDetail.price.toLocaleString('vi-VN')} VND</p>`;
  }

  sectionDetail.innerHTML = `
            <div class="img-detail">
                <img src="${productDetail.imageURL}" alt="">
                <div class="product_overlay_detail"></div>
            </div>
            <div class="content-product">
                <p class="name-detail">${productDetail.name}</p>
                ${priceHtml}
                <div class="size-detail-drop">
                    <select name="" id="select-drop-size">
                       ${optionSizes}
                    </select>
                </div>
                <p class="thanh-chan"></p>
                <div class="input-detail-product">
                    <label for="" class="content-sl">Số Lượng</label>
                    <span class="span-detail minus">-</span>
                    <input type="number" id="quantity-detail" name="quantity" min="1" value="1">
                    <span class="span-detail plus">+</span>
                </div>
                <button class="button-detail">Add to cart</button>
                <p class="thanh-chan"></p>
                <div class="mo-to-product">
                    <p class="mo-ta">Mô tả</p>
                    <ul class="description-detail">
                        <li>${productDetail.description}</li>
                    </ul>
                </div>
            </div>
  `
}

const spanMinus = document.querySelector('.minus');
const spanPlus = document.querySelector('.plus');
const quantityDetail = document.getElementById('quantity-detail')
let quantity = 1;

// tru san pham
spanMinus.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityDetail.value = quantity;
  }
})

// cong them san pham 
spanPlus.addEventListener('click', () => {
  quantity++;
  quantityDetail.value = quantity;
})
const productShirtSame = document.querySelector('.product-shirt-main-same');
const currentDislay = 3;

// san pham tuong tu chi lay nhung san pham con lai khong lay san pham da co trong trang produtsDetail


const sameProducts = products.filter(item => {
  return item.categoryName === productDetail.categoryName && Number(item.id) !== Number(productId)
})
// console.log(sameProducts)

function renderProduct(container, start, end) {
  const showProduct = sameProducts.slice(start, end);
  showProduct.forEach(item => {
    const divEl = document.createElement('div')
    divEl.classList.add('product-main')
    let saleHTML = '';
    if (item.tags) {
      if (item.tags[1] === ('sale 30%')) {
        saleHTML = `<div class="sale">${item.tags[1]}</div>`
      }
      else if (item.tags[1] === ('sale 40%')) {
        saleHTML = `<div class="sale">${item.tags[1]}</div>`
      }
    }
    let priceHTML = `<p>${item.price.toLocaleString('vi-VN')}</p>`
    if (item.priceSale < item.price) {
      priceHTML = `
          <p>${item.priceSale.toLocaleString('vi-VN')}</p>
          <p class="sale-m">${item.price.toLocaleString('vi-VN')}</p>
      `
    }


    divEl.innerHTML = `
      <div class="img_hidden">
          <a href="product-detail.html?id=${item.id}" class="img_box">
              <img src="${item.imageURL}" alt="shirt1" />
              <div class="product_overlay"></div>
              ${saleHTML}
          </a>
      </div>
      <a href="" class="product_name">${item.name}</a>
      <div class="money_sale">
         ${priceHTML}
       </div>    
    
    `
    container.appendChild(divEl);
  });
}
renderProduct(productShirtSame, 0, currentDislay)

const buttonLoad = document.querySelector('#load-more-btn');
buttonLoad.addEventListener('click' ,() => {
  renderProduct(productShirtSame,currentDislay,sameProducts.length)
})
// khi mìn add to cart thi phải kiểm tra xem đã đăng nhập chưa , nếu chưa thì qua trang đăng nhâp j
const addToCart = document.querySelector('.button-detail');
addToCart.addEventListener('click', () => {
  const currentUser = localStorage.getItem('currentUser');
  const pareUser =JSON.parse(currentUser)
  if( !pareUser) {
    alert('Đăng nhập trước khi thêm vào giỏ hàng')
    window.location.href = 'login.html'
    return ;
  }
  if( !pareUser.isLogin) {
    alert('Đăng nhập trước khi thêm vào giỏ hàng')
    window.location.href = 'login.html'
    return ;
  }

  alert('Them vao gio hang thanh cong')
})