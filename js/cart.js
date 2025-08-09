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
// tim kiem san pham 
// dăng nhap trước kho vô trang giỏ hàng 
const currentUser = localStorage.getItem('currentUser');
const pareUser = JSON.parse(currentUser)
if (!pareUser) {
  alert('Bạn phải đăng nhập trước khi vô trang giỏ hàng')
  window.location.href = 'login.html'
  // return;
}
/// them san pham vao gio hang
const currentCart = localStorage.getItem('cart')
const cartParse = currentCart ? JSON.parse(currentCart) : [];
const sectionCartRow = document.querySelector('.cart-row');


const cart = cartParse.filter(item => {
  return item.email === pareUser.email;
});
console.log("pareUser:", pareUser);
console.log("email đang lọc:", pareUser.email);


if (cart.length === 0) {
  sectionCartRow.innerHTML = `
  <p class="cart-dang-trong"> Giỏ hàng đang trống  </p>
  `
}
else {
  // hine thi tieu de cua trang 
  const divELCarPage = document.createElement('div')
  divELCarPage.classList.add('cart-page-layout');
  divELCarPage.innerHTML = `
                <div class="cart-page_head">
                    <h1>Giỏ hàng của bạn</h1>
                    <p>Hiện đang có ${cart.length} sản phẩm</p>
                </div>
                <div class="cartformpage">
                    <div class="head-cart">
                        <div class="content-item">
                            <span>Sản phẩm</span>
                        </div>
                        <div class="quantity-item">
                            <span>Số lượng</span>
                        </div>
                        <div class="price-item">
                            <span class="span-price-cart">Số Tiền</span>
                        </div>
                    </div> 
                    <div class="content-cart">
                    </div>
  `
  sectionCartRow.appendChild(divELCarPage)
  ///
  const divContentCart = document.querySelector('.content-cart')
  cart.forEach(item => {
    const divEl = document.createElement('div')
    divEl.classList.add('cart-page-layout');
    // tin gia tong san cua 1 san pham 
    const price = item.price.replace(/[^\d]/g, '');

    const totalPrice = Number(item.quantity) * Number(price);
    divEl.innerHTML = `
            
                        <div class="content-cart-page" data-id="${item.id}">
                            <div class="content-item img-cart">
                                <img src="${item.img}" alt="">

                                <div class="content-cart-product">
                                    <p>Mã sản phẩm : ${item.id} , Size : ${item.sizes}</p>
                                    <h1>${item.name}</h1>
                                    <button class="button-cart-remove">Remove</button>
                                </div>
                            </div>
                            <div class="quantity-item">
                                <span class="span-detail minus">-</span>  
                                <input type="number" class="quantity-cart" name="quantity" min="1" value="${item.quantity}">
                                <span class="span-detail plus">+</span>
                            </div>
                            <div class="price-item price-cart ">
                                <span> ${totalPrice.toLocaleString('vi-VN')} đ</span>
                            </div>
                        </div>
                        
                        
    `
    divContentCart.appendChild(divEl)
  });
  // cap nhat so luong 
  // const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
  let updateCart = cart.filter(item => {
    return item.email === currentUser.email
  })

  const contentCartPage = document.querySelectorAll('.content-cart-page');

  function updatedTotalCart() {
    const newTotal = updateCart.reduce((total, item) => {
      const price = item.price.replace(/[^\d]/g, '');
      return total + Number(price) * Number(item.quantity);
    }, 0);

    const totalPriceElemnt = document.querySelector('.total-price');
    if (totalPriceElemnt) {
      totalPriceElemnt.textContent = `${newTotal.toLocaleString('vi-VN')} đ`;
    }
    updateCart.forEach((item, index) => {
      const price = Number(item.price.replace(/[^\d]/g, ''));
      const quantity = Number(item.quantity);
      const totalItem = price * quantity;

      const cartRow = contentCartPage[index];
      const priceItem = cartRow.querySelector('.price-item');

      if (priceItem) {
        priceItem.textContent = `${totalItem.toLocaleString('vi-VN')} đ`;
      }
    });



  }

 contentCartPage .forEach((cartItem, index) => {
    const spanMinus = cartItem.querySelector('.minus');
    const spanPlus = cartItem.querySelector('.plus');
    const quantityInput = cartItem.querySelector('.quantity-cart');

    spanMinus.addEventListener('click', () => {
      let current = Number(quantityInput.value) || 1;
      if (current > 1) {
        quantityInput.value = current - 1;
        updateCart[index].quantity = Number(quantityInput.value);
        localStorage.setItem('cart', JSON.stringify(updateCart));
        updatedTotalCart();
        updateCartQuantityIcon();
      }
    });

    spanPlus.addEventListener('click', () => {
      let current = Number(quantityInput.value) || 1;
      quantityInput.value = current + 1;
      updateCart[index].quantity = Number(quantityInput.value);
      localStorage.setItem('cart', JSON.stringify(updateCart));
      updatedTotalCart();
      updateCartQuantityIcon();
    });
    quantityInput.addEventListener('change', () => {
      let newValue = Number(quantityInput.value);
      if (newValue > 1) {
        updateCart[index].quantity = newValue;
        localStorage.setItem('cart', JSON.stringify(updateCart));
        updatedTotalCart();
        updateCartQuantityIcon();
      }
      else {
        quantityInput.value =1 ;
        updateCart[index].quantity = 1;
        localStorage.setItem('cart', JSON.stringify(updateCart));
        updatedTotalCart();
        updateCartQuantityIcon();
      }
    })
  });


  // tinh tong so tien cua san pham
  function tinhTongSoTien(cart) {
    let total = 0
    cart.forEach(item => {
      const price = item.price.replace(/[^\d]/g, '');
      total += (Number(item.quantity) * Number(price));
    })
    return total;

  }
  // console.log(tinhTongSoTien(cart))

  const cartFormPage = document.querySelector('.cartformpage');
  const divTotal = document.createElement('div');
  divTotal.classList.add('total-cart');
  divTotal.innerHTML = `
          <span>Tổng tiền :</span>
          <p class="total-price"> ${tinhTongSoTien(cart).toLocaleString('vi-VN')} đ</p>  
  `
  cartFormPage.appendChild(divTotal)

  // tien hanh den trang thanh toan
  const divCheckOut = document.createElement('div');
  divCheckOut.classList.add('checkout-cart')
  divCheckOut.innerHTML = `
  <p class="price-shop-continue" >Tiếp tục mua sắm</p>
  <button class="button-checkout-cart">Thanh toán sản phẩm</button>
  `
  cartFormPage.appendChild(divCheckOut);


  // remove san pham 
  const buttonDelete = document.querySelectorAll('.button-cart-remove');
  buttonDelete.forEach(button => {
    button.addEventListener('click', (event) => {
      const deleteButton = event.target;
      const contentCart = deleteButton.parentElement;
      const contenItem = contentCart.parentElement;
      const contentCartPage = contenItem.parentElement;
      const id = contentCartPage.getAttribute('data-id');

      const isConfirm = confirm('Bạn chắc chắn muốn xoá sản phẩm này?');
      if (isConfirm) {
        let cart = [];
        const current = localStorage.getItem('cart');
        if (current !== null) {
          cart = JSON.parse(current)
        }

        // xoa san pham can xoa tren local
        const updatedCart = cart.filter(item => {
          return String(item.id) !== String(id);
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // xoa san pham tren gia dien
        contentCartPage.remove();


        /// cap nhat lai tong tien khi xoa san pham 
        const newTotal = updatedCart.reduce((total, item) => {
          const price = Number(item.price.replace(/[^\d]/g, ''));
          return total + (price * Number(item.quantity));
        }, 0);
        const totalPriceElment = document.querySelector('.total-price');
        if (totalPriceElment) {
          totalPriceElment.textContent = `${newTotal.toLocaleString('vi-VN')} đ`;
        }


        // neu khong co san pham gi se hien
        if (updatedCart.length === 0) {
          const sectionCartRow = document.querySelector('.cart-row');
          sectionCartRow.innerHTML = `
          <p class="cart-dang-trong"> Giỏ hàng đang trống  </p>
        `
        }

      }


    })
  })
  //

  // chuyen sang trang thanh toan
  const shopPriceContinue = document.querySelector('.price-shop-continue');
  shopPriceContinue.addEventListener('click', () => {
    window.location.href = `products.html`
  })

  const buttonCheckoutPage = document.querySelector('.button-checkout-cart')
  buttonCheckoutPage.addEventListener('click', () => {

    window.location.href = `checkout.html`
  })
}
// hien co bao nhieu san pham tren icon gio hang 
// const cartItems = JSON.parse(localStorage.getItem('cart')) || [];


const quantityElement = document.querySelector('.update-content-cart');

if (currentUser && quantityElement) {
  const totalQuantity = cart.reduce((total, item) => total + Number(item.quantity), 0);

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
// cap nhat hin thi icon khi click
function updateCartQuantityIcon() {
  const quantityElement = document.querySelector('.update-content-cart');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUser && quantityElement) {
    const userCart = cart.filter(item => item.email === currentUser.email);
    const totalQuantity = userCart.reduce((total, item) => total + Number(item.quantity), 0);

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
  if(pareUser) {
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