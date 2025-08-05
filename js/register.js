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

/// click vao nut dang ky 
const inputName = document.querySelector('#input-name-re');
const inputEmail = document.querySelector('#input-email-re');
const inputPassword = document.querySelector('#input-password-re');
const inputConfirmPassword = document.querySelector('#input-confirm-password');
const buttonRegister = document.querySelector('.Button-register');
const loadUser = localStorage.getItem('user');
let user = [];
if( loadUser !== null) {
    user = JSON.parse(loadUser)
}
buttonRegister.addEventListener('click' ,(event) => {
    event.preventDefault();
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    if(name === '' || email === '' || password === '' || confirmPassword === ''){
        alert('Không được bỏ trống');
        return ;
    }
    // check coi email nay da dang ky chua
    const target = user.find(item => {
        return item.email === email ;
    })
    if( target) {
        alert( 'Email này đã được sử dụng ')
        return ;
    }

    // check xem mat khau nhat xac nhan lai co trung nhau khong 
    if( password !== confirmPassword) {
        alert('Mật khẩu không trùng khớp');
        return ;
    }
    if(password.length < 6){
        alert('Mật khẩu trên 6 chữ số')
        return ;
    }
    user.push({
        name : name ,
        email : email ,
        password : password ,
    })
    localStorage.setItem('user' ,JSON.stringify(user));
    alert('Đăng ký thành công')
    window.location.href ='login.html'

})
//
// hien co bao nhieu san pham tren icon gio hang 
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cartItems.reduce((total, item) => total + Number(item.quantity   ), 0);

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