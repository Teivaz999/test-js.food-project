function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, slidesWrapper, field}){
    const slides = document.querySelectorAll(slide),
dots = document.createElement('ol'),
dotsAr=[],
mainSlider = document.querySelector(container),
prev = document.querySelector(prevArrow),
next = document.querySelector(nextArrow);
let sliderIndex = 1,
offset = 0,
wrapper = document.querySelector(slidesWrapper),
inner = document.querySelector(field),
width = window.getComputedStyle(wrapper).width,
total = document.querySelector(totalCounter),
current = document.querySelector(currentCounter);

mainSlider.style.position = "relative";
dots.classList.add('.carousel-indicators');
dots.style.cssText = `
position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

mainSlider.append(dots);

for(let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if(i == 0){
        dot.style.opacity = 1;
    }
    dots.append(dot);
    dotsAr.push(dot);
}

quantitySlide();
editSlideScore();

wrapper.style.overflow= "hidden";
inner.style.display = "flex";
inner.style.width = 100 * slides.length + "%";
inner.style.transition = '0.5s all';

slides.forEach(slide => {
    slide.style.width = width;
});

function clickDots(){
    dotsAr.forEach(dot => dot.style.opacity = '.5');
        dotsAr[sliderIndex - 1].style.opacity = 1;
}

function quantitySlide(){
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
}

function editSlideScore(){
    if(sliderIndex < 10){
        current.textContent = `0${sliderIndex}`;
    } else {
        current.textContent = sliderIndex;
    }
}

next.addEventListener('click', () => {
    if(offset == +width.slice(0, width.length-2) * (slides.length - 1)){
        offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }
        inner.style.transform = `translateX(-${offset}px)`;

        if(sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        
        editSlideScore();
        clickDots();
});

prev.addEventListener('click', () => {
    if(offset == 0){
        offset += +width.slice(0, width.length-2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length-2);
        }
        inner.style.transform = `translateX(-${offset}px)`;

        if(sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }
        
        editSlideScore();
        clickDots();
});

dotsAr.forEach(dot => {
    dot.addEventListener('click', (e) =>{
        const slideTo = e.target.getAttribute('data-slide-to');

        sliderIndex = slideTo;
        offset = +width.slice(0, width.length-2) * (slideTo - 1);
        inner.style.transform = `translateX(-${offset}px)`;

        editSlideScore();

        clickDots();
    });
});
}

export default slider;