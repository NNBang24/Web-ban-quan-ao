import { user } from './products.data.js';

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
    const historyOrder = localStorage.getItem('historyOrder');
    const info= historyOrder ? JSON.parse(historyOrder) : [];
    // dnag nhap truoc khi vo trang tai khoang cua toi 
    const currentUser = localStorage.getItem('currentUser');
    const parseUser = JSON.parse(currentUser)
    if (!parseUser) {
        alert('Bạn phải đăng nhập trước khi vô trang')
        window.location.href = 'login.html'
        // return;
    }
    const userAll = localStorage.getItem('user');
    const userName = JSON.parse(userAll);
    // lay ten va mail cua user do 
    const foundUser = userName.find( item => {
        return item.mail == parseUser.mail && item.password === parseUser.password;
    })
    // loc thoe gmail 
    const inforUsers = info.filter(item => {
        return item.emailCurrentUser === parseUser.email
    }) 


    const infoContainer = document.querySelector('.container');
    const divUserMail = document.createElement('div');
    divUserMail.classList.add('div-user-mail')
    divUserMail.innerHTML =`
                            <p><strong>Họ và tên:</strong> <span >${foundUser.name}</span></p>
                            <p><strong>Email:</strong> <span>${foundUser.email}</span></p>
    `
infoContainer.appendChild(divUserMail)
inforUsers.forEach(user => {
    const divElMyAccount = document.createElement('div');
    divElMyAccount.classList.add('div-my-account');
    divElMyAccount.innerHTML = `
                 <div class="info">
                        <h3>Thông tin cá nhân</h3>
                        <div class="content-info">
                            <p><strong>Họ và tên:</strong> <span id="fullName">${user.name}</span></p>
                            <p><strong>Email đặt hàng:</strong> <span id="email">${user.email}</span></p>
                        </div>
                    </div>

                    <div class="orders">
                        <h3>Lịch sử đặt hàng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>    
                                    <th>Ngày đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody id="orderHistory">
                                <tr>
                                    <td>${user.id}</td>    
                                    <td>${new Date(user.date).toLocaleString('vi-VN')}</td>
                                    <td>${user.total}</td>
                                    <td>Đã xác nhận đơn hàng </td>
                                </tr>
    
                            </tbody>
                        </table>
                    </div>
    `;
    infoContainer.appendChild(divElMyAccount);


});




// console.log(JSON.parse(localStorage.getItem('checkoutForm')));
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
  if(parseUser) {
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