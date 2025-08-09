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

const currentCart = localStorage.getItem('cart')
const cartParse = currentCart ? JSON.parse(currentCart) : [];
const currentUser = localStorage.getItem('currentUser')
const currentUserParse = currentUser ? JSON.parse(currentUser) : [] ;

const cart = cartParse.filter(item => {
  return item.email === currentUserParse.email ;
})



// if (!currentCart) {
//   alert('Ban phai don hang trong gio hang moi truy cap docj')
//   // window.location.href = 'login.html'
//   // return;
// }

const divInformation = document.querySelector('.div-information');
if (divInformation) {
  cart.forEach(item => {
    const divCartCheckout = document.createElement('div')
    divCartCheckout.classList.add('cart-checkout-page');
    divCartCheckout.innerHTML = `
        <div class="cart-page-check">
              <img class="img-cart-checkout" src="${item.img}" alt="">
              <div class="content-checkout">
                  <div class="content-size-quantity">
                      <p class="checkout-size">Size: ${item.sizes} ,</p>
                      <p class="checkout-quantity">Số lượng: ${item.quantity}</p>
                  </div>
                  <p class="checkout-name">${item.name}</p>
              </div>
          </div>
  `
    divInformation.appendChild(divCartCheckout)
  });
}

const totalPrice = cart.reduce((total, item) => {
  const price = item.price.replace(/[^\d]/g, '');
  total += (Number(price) * Number(item.quantity));
  return total;
}, 0);

const divtTotalCheckout = document.createElement('div');
divtTotalCheckout.classList.add('total-checkout-content')
divtTotalCheckout.innerHTML = `
<p class="total-checkout">Tổng tiền: ${totalPrice.toLocaleString('vi-VN')} đ </p>
`
divInformation.appendChild(divtTotalCheckout);
// đăng nhập mới vào đực trang check out




/// xác nhập đơn hàng 
const inputName = document.querySelector('#input-name');
const inputAddress = document.querySelector('#input-address');
const inputEmail = document.querySelector('#input-email');
const inputPhone = document.querySelector('#input-phone');
const selectThanhToan = document.querySelector('#select-thanh-toan');
const buttonSubmit = document.querySelector('.button-submit');
// const totalCheckout = document.querySelector('.total-checkout');

let checkoutForm = JSON.parse(localStorage.getItem('checkoutForm')) || [];
let historyOrder = JSON.parse(localStorage.getItem('historyOrder')) || [];

buttonSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  const name = inputName.value.trim();
  const address = inputAddress.value.trim();
  const email = inputEmail.value.trim();
  const phone = inputPhone.value.trim();
  const thanhToan = selectThanhToan.value.trim();
  const total = `${totalPrice.toLocaleString('vi-VN')} đ `;

  if (name === '' || address === '' || email === '' || phone === '') {
    alert('Không được bỏ trống');
    return;
  }

  if (phone.length < 10) {
    alert('Số điện thoại không phù hợp');
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  checkoutForm.push({
    id: "NB" + Date.now(),
    date: Date.now(),
    name: name,
    address: address,
    email: email,
    phone: phone,
    thanhToan: thanhToan,
    total: total,
    product : cartItems , 
    emailCurrentUser : currentUserParse.email
  });
    historyOrder.push({
    id: "NB" + Date.now(),
    date: Date.now(),
    name: name,
    address: address,
    email: email,
    phone: phone,
    thanhToan: thanhToan,
    total: total,
    product : cartItems , 
    emailCurrentUser : currentUserParse.email
  });


  localStorage.setItem('checkoutForm', JSON.stringify(checkoutForm));
  localStorage.setItem('historyOrder' ,JSON.stringify(historyOrder));
  localStorage.removeItem('cart');
  alert('Xác Nhận đặt hàng thành công');
  window.location.href =`order_confirmation.html`
});

///
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
  if(currentUserParse) {
    window.location.href ='my-account.html'
  }
  else {
    window.location.href = 'register.html'
  }
})
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