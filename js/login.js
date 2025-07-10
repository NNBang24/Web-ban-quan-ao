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

// login

// const emailLogin = document.querySelector('#email-login');
// const passwordLogin = document.querySelector('#password-login');
// const buttonLogin = document.querySelector('.button-login')
// buttonLogin.addEventListener('click' ,(even) => {
//   even.preventDefault();
//   const email = emailLogin.value.trim();
//   const password = passwordLogin.value.trim();
//   if( email === '' || password === ''){
//     alert('Không được bỏ trống');
//     return ;
//   }

//   const loderUser = localStorage.getItem('user')
//   if(!loderUser) {
//     alert('Chưa có tài khoản nào đăng ký')
//     return;
//   }
//   const user = JSON.parse(loderUser);

//   const confirmUser = user.find(item => item.email === email && item.password === password) ;

//   if(!confirmUser) {
//     alert('Email hoặc password không đúng');
//     return ;
//   }
//   localStorage.setItem('currentUser' ,JSON.stringify({
//     email :confirmUser.email ,
//     password : confirmUser.password ,
//     user : confirmUser,
//     isLogin : true ,
//   }))
//   alert('Đăng nhập thành công');
//   window.location.href='index.html'
// })


// lay du lieu tu locastorage de dang nhap 
const inputEmail = document.getElementById('email-login');
const inputPassword = document.getElementById('password-login');
const buttonLogin = document.querySelector('.button-login');

buttonLogin.addEventListener('click', (event) => {
  event.preventDefault();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  if (email === '' || password === '') {
    alert('Không được bỏ trống ')
    return;
  }
  const loadUser = localStorage.getItem('user');
  const user = JSON.parse(loadUser);
  
  const confirmUser = user.find(item => {
    return item.email === email && item.password === password;
  });
  if (!confirmUser) {
    alert('Email hoặc Password không đúng');
    return;;
  }

  localStorage.setItem('currentUser', JSON.stringify({
    email: confirmUser.email,
    password: confirmUser.password,
    user: confirmUser,
    isLogin: true,
  }))
  alert('Đăng nhập thành công')
  window.location.href = 'index.html'

})
