window.addEventListener('DOMContentLoaded', ()=> {
    
    const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

      function hideTabContent(){
          tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          });

          tabs.forEach(item => {
              item.classList.remove('tabheader__item_active');
          });
      }

      function showTabContent(i = 0){
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');
          tabs[i].classList.add('tabheader__item_active');
      }

      hideTabContent();
      showTabContent();


      tabsParent.addEventListener('click', (e) => {
          const target = e.target;

          if(target && target.classList.contains('tabheader__item')){
              tabs.forEach((item, i) => {
                  if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
              });
          }
      });

      //------------------

      const deadline = '2022-5-5';

      function getTimeRemaining(endtime){
          const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 *60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

          return {
              'total':t,
              'days':days,
              'hours':hours,
              'minutes':minutes,
              'seconds':seconds
          };
      }

      function getZero (num){
          if(num >= 0 && num < 10){
              return `0${num}`;
          } else {
              return num;
          }
      }

      function setClock (selector, endtime) {
          const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);
            
          updateClock();

          function updateClock(){
              const t = getTimeRemaining(endtime);

              days.innerHTML = getZero(t.days);
              hours.innerHTML = getZero(t.hours);
              minutes.innerHTML = getZero(t.minutes);
              seconds.innerHTML = getZero(t.seconds);

              if(t.total <= 0) {
                  clearInterval(timeInterval);
              }
          }
      }

      setClock('.timer', deadline);

      //------------------

      const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal');

      function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); 
      }

      function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }

      modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
      });


        modal.addEventListener('click', (e) => {
            if(e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalScroll);
        }
    }

    window.addEventListener('scroll', showModalScroll);

    //Классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => {element.classList.add(className);});
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
        this.parent.append(element);
        }
    }
      
    const getResources = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url} Statuscode:${res.status}`);
        }
        return await res.json();
    };

    getResources('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    /* getResources('http://localhost:3000/menu')
    .then(data => createCard(data));

    function createCard(data){
        data.forEach(({img, altimg, title, descr, price}) => {
        const element = document.createElement('div');

        element.classList.add('menu__item');

        element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>`;

                document.querySelector('.menu .container').append(element);
        });
    } */


const forms = document.querySelectorAll('form');

const message = {
    loading:'icons/spinner.svg',
    success:'Спасибо, скоро свяжемся',
    failure:'Что-то пошло не так'
};

forms.forEach(item =>{
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method:'POST',
    headers:{
        'Content-type': 'application/json'
    },
    body:data
    });

    return await res.json();
};

function bindPostData(form){
form.addEventListener('submit', (e) =>{
e.preventDefault();

const statusMessage = document.createElement('img');
statusMessage.src = message.loading;
statusMessage.style.cssText = `
display:block;
margin:0 auto;
`;
form.insertAdjacentElement('afterend', statusMessage);

/* const request = new XMLHttpRequest(forms);
request.open('POST', 'server.php'); */


// request.setRequestHeader('Content-type', 'application/json');
const formData = new FormData(form);

const json = JSON.stringify(Object.fromEntries(formData.entries()));

postData('http://localhost:3000/requests', json)
.then(data => {
    console.log(data);
        ShowThanksModal(message.success);
        statusMessage.remove();
}).catch(() => {
    ShowThanksModal(message.failure);
}).finally(() => {
    form.reset();
});

/* request.addEventListener('load', ()=> {
    if(request.status === 200){
        console.log(request.response);
        ShowThanksModal(message.success);
        form.reset();
        statusMessage.remove();
    } else {
        ShowThanksModal(message.failure);
    }
});  */
});
}

function ShowThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>x</div>
        <div class="modal__title">${message}</div>
    </div>`;
    
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() =>{
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res[0].img));

const slides = document.querySelectorAll('.offer__slide'),
prev = document.querySelector('.offer__slider-prev'),
next = document.querySelector('.offer__slider-next');
let sliderIndex = 1,
total = document.querySelector('#total'),
current = document.querySelector('#current');

showSlides(sliderIndex);
if(sliderIndex < 10){
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;

}
if(sliderIndex > slides.length) {
    sliderIndex = 1;
}

function showSlides(n) {

    if(sliderIndex < 10){
        current.textContent = `0${sliderIndex}`;
    } else {
        current.textContent = sliderIndex;
    }

    if(n > slides.length) {
        sliderIndex = 1;
    }
    if(n < 1) {
        sliderIndex = slides.length;
    }

    slides.forEach(item => item.style.display = "none");
    slides[n - 1].style.display = "";
}

function plusSlides(n){
    showSlides(sliderIndex + n);
}

prev.addEventListener('click', () =>{
    plusSlides(-1);
    console.log(sliderIndex);
})
next.addEventListener('click', () =>{
    plusSlides(1);
    console.log(sliderIndex);
})
});