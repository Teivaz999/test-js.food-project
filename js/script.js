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
          forms(modalTimerId);
          modal('[data-modal]', '.modal');
          slider();
          tabs();
          timer();
});

