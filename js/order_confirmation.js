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

const orderConfirmation = localStorage.getItem('checkoutForm');
const orderParse = orderConfirmation ? JSON.parse(orderConfirmation) : [];
const currentUser = localStorage.getItem('currentUser');
const currentUserParse = JSON.parse(currentUser);
const order = orderParse.filter(item => {
  return item.emailCurrentUser === currentUserParse.email ;
});

const sectionOrder = document.querySelector('.section-order');

order.forEach(item => {
  item.product.forEach(prod => {
    const divEl = document.createElement('div');
    divEl.classList.add('div-ordor-page');
    const price = prod.price.replace(/[^\d]/g, '');

    const totalPrice = Number(prod.quantity) * Number(price);
    divEl.innerHTML = `
        <div class="div-confirmation-img">
            <img src="${prod.img}" alt="">
            <h2>${prod.name}</h2>
        </div>
        <div class="div-confirmation-quantity">
            <span>x ${prod.quantity}</span>
        </div>
        <div class="div-confirmation-price">
            <span>${totalPrice.toLocaleString('vi-VN')} đ</span>
        </div>
      `;
    sectionOrder.appendChild(divEl);
  });
});

order.forEach(item => {
  if (item.total) {
    const divTotalPrice = document.createElement('div');
    divTotalPrice.classList.add('total-price');
    divTotalPrice.innerHTML = `<span>Tổng tiền thanh toán : ${item.total}</span>`;
    sectionOrder.appendChild(divTotalPrice);
  }
});


/// tiep tuc 
const continueButton = document.querySelector('.continue-cart');
continueButton.addEventListener('click' ,() => {
  window.location.href = 'index.html'
})
// history 
const historyButton = document.querySelector('.history-cart');
historyButton.addEventListener('click' ,() => {
  window.location.href = 'my-account.html'
})
window.addEventListener('beforeunload', function () {
  localStorage.removeItem('checkoutForm'); 
});

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