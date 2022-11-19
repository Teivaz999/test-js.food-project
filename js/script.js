import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', ()=> {
    
          const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
          calc();
          cards();
          forms('form', modalTimerId);
          modal('[data-modal]', '.modal');
          slider({
            container:'.offer__slider',
            slide:'.offer__slide',
            nextArrow:'.offer__slider-next',
            prevArrow:'.offer__slider-prev',
            slidesWrapper:'.offer__slider-wrapper',
            totalCounter:'#total',
            currentCounter:'#current',
            field:'.offer__slider-inner'
          });
          tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
          timer(".promotion", "2022-12-05");
});

