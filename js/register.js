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

// register
// lay tag cho cac o input can nhap va click button
const inputEmail = document.getElementById('input-email-re');
const inputPassword = document.getElementById('input-password-re');
const inputConfirmPassword = document.getElementById('input-confirm-password');
const buttonRegister = document.querySelector('.Button-register');
const loadUser = localStorage.getItem('user');
let user = [];
if(loadUser !== null) {
    user = JSON.parse(loadUser)
}
buttonRegister.addEventListener('click' ,(even) => {
    // even.preventDefault(); 
    even.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    if( email === '' || password === '' || confirmPassword === ''){
        alert('Không được bỏ trống');
        return ;
    }
    if( password !== confirmPassword) {
        alert('Nhập mật khâu không trùng khớp');
        return ;
    }
    const target = user.find( item => {
        return item.email === email
    });
    if(target) {
        alert('Email này đã được sử dụng');
        return ;
    }
    if(password.length < 6){
        alert('Mât khẩu phải có 6 kí tự trở lên');
        return ;
    }
    
     
    user.push({
        email : email ,
        password : password,
    })
    localStorage.setItem('user',JSON.stringify(user));

    alert('Đăng ký thành công')
    window.location.href = 'login.html'
})