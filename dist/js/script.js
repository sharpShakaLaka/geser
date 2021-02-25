window.addEventListener('DOMContentLoaded', () => {
    
    // slider

    const
        slides = document.querySelectorAll('.slider__slideblock'),
        buttonPrev = document.querySelector('#prev'),
        buttonNext = document.querySelector('#next'),
        slideStates = ['slider__frame_first', 'slider__frame_second', 'slider__frame_third'],
        sliderDots = document.querySelectorAll('.slider__dot'),
        infoButtons = document.querySelectorAll('.info');
    
    slides.forEach((item, index) => {
        item.setAttribute('data-index', index);
        item.classList.add(slideStates[index]);
    });

    function activateButton() {
        infoButtons.forEach(item => {
            if(item.parentElement.getAttribute('data-index') === '0') {
                setTimeout( ()=> {
                    item.classList.remove('hidden');
                    item.classList.add('block');    
                }, 750);
            } else {
                item.classList.add('hidden');
                item.classList.remove('block');
            }
        });    
    }
    activateButton();

    buttonNext.addEventListener('click', () => {
        slides.forEach((item) => {
            const prevIndex = item.getAttribute('data-index');
            switch (prevIndex) {
                case '0':
                    item.setAttribute('data-index', 2);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[2]);
                break;
                case '1':
                    item.setAttribute('data-index', 0);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[0]);
                break;
                case '2':
                    item.setAttribute('data-index', 1);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[1]);
                break;
            }
        });
        activateButton();
    });

    buttonPrev.addEventListener('click', () => {
        slides.forEach((item) => {
            const prevIndex = item.getAttribute('data-index');
            switch (prevIndex) {
                case '0':
                    item.setAttribute('data-index', 1);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[1]);
                break;
                case '1':
                    item.setAttribute('data-index', 2);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[2]);
                break;
                case '2':
                    item.setAttribute('data-index', 0);
                    item.classList.remove(slideStates[prevIndex]);
                    item.classList.add(slideStates[0]);
                break;
            }
        });
        activateButton();
    });

    sliderDots.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            slides.forEach((item) => {
               const index = item.getAttribute('data-index');
               item.classList.remove(slideStates[index]);
            });
            sliderDots.forEach((dot, number) => {
                dot. classList.remove('slider__dot_active');
            });
            e.target.classList.add('slider__dot_active');

            if (index === 0) {
                slides[0].setAttribute('data-index', 0);
                slides[0].classList.add(slideStates[0]);
                slides[1].setAttribute('data-index', 1);
                slides[1].classList.add(slideStates[1]);
                slides[2].setAttribute('data-index', 2);
                slides[2].classList.add(slideStates[2]);
            } else if (index === 1) {
                slides[0].setAttribute('data-index', 2);
                slides[0].classList.add(slideStates[2]);
                slides[1].setAttribute('data-index', 0);
                slides[1].classList.add(slideStates[0]);
                slides[2].setAttribute('data-index', 1);
                slides[2].classList.add(slideStates[1]);
            } else if (index ===2) {
                slides[0].setAttribute('data-index', 1);
                slides[0].classList.add(slideStates[1]);
                slides[1].setAttribute('data-index', 2);
                slides[1].classList.add(slideStates[2]);
                slides[2].setAttribute('data-index', 0);
                slides[2].classList.add(slideStates[0]);
            }
            activateButton();
        });
    });

    // telIconAnimation

    const
        tel = document.querySelector ('#tel'),
        telInactive = document.querySelector("#inactive"),
        telActive = document.querySelector("#active");
    
    tel.addEventListener('mouseenter', (e) => {
            fadeOut(telInactive, 10);
            fadeIn(telActive, 10);    
    });
    tel.addEventListener('mouseleave', (e) => {
        fadeOut(telActive, 10);
        fadeIn(telInactive, 10);    
    });

    function fadeOut(element, time) {
        let opacity = 1;
        let timer = setInterval(() => {
            if(opacity <= 0.1) {
                clearInterval(timer);
                element.style.display = "none";
            }
            element.style.opacity = opacity;
            opacity -= opacity * 0.3;
        }, time);
    }

    function fadeIn(element, time) {
        let opacity = 0.01;
        element.style.display = "block";
        let timer = setInterval(function() {
            if(opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += opacity * 0.3;
        }, time);
    }

    //logoAnumation

    const
        logoBlock = document.querySelector('.header__logo'),
        logoIcons = document.querySelectorAll('.header__figure img');

    logoBlock.addEventListener('mouseover', () => {
        logoIcons[0].classList.add('bounce');
        logoIcons[1].classList.add('bounce__second');
        setTimeout( () => {
            logoIcons[0].classList.remove('bounce');
            logoIcons[1].classList.remove('bounce__second');
        }, 2000);
    });

    // toTop Button and order Button fade

    const scrollToTopButton = document.getElementById('to-top');
    const orderButton = document.getElementById('order');
    const scrollFunc = () => {
        let y = window.scrollY;
        if (y > 590) {
            scrollToTopButton.classList.add('show');
            scrollToTopButton.classList.remove('hide');
            orderButton.classList.add('show');
            orderButton.classList.remove('hide');

        } else {
            scrollToTopButton.classList.add('hide');
            scrollToTopButton.classList.remove('show');
            orderButton.classList.add('hide');
            orderButton.classList.remove('show');

        }
    };
    window.addEventListener("scroll", scrollFunc);

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 10);
        }
    };

    scrollToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    }); 

    // form

    const
        formButton = document.getElementById('button_submit'),
        inputName = document.getElementById('name'),
        inputOrg = document.getElementById('org'),
        inputTel = document.getElementById('phone'),
        form = document.querySelector('.popup__form');

    form.addEventListener('input', (e) => {
        if (e.target.tagName == "INPUT" &&
            (inputName.value != "" && inputOrg.value != "" && inputTel.value != "")) {
                formButton.classList.remove('btn__popup_disabled');
                formButton.removeAttribute('disabled');
                formButton.classList.add('btn__hover');
        } else {
            formButton.classList.add('btn__popup_disabled');
            formButton.setAttribute('disabled', 'disabled');
            formButton.classList.remove('btn__hover');
        }
    });

    //popup

    const
        orderButtons = document.querySelectorAll('.btn__order'),
        closeButtons = document.querySelectorAll('.popup__close'),
        inputs = document.querySelectorAll('.popup__text'),
        popup = document.querySelector('.popup'),
        dialogFirst = document.getElementById('popup_first'),
        dialogSecond = document.getElementById('popup_second'),
        buttonSubmit = document.getElementById('button_submit'),
        buttonClose = document.getElementById('button_close');

    orderButtons.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.remove('hidden');
            popup.classList.add('flex');
            dialogFirst.classList.remove('hidden');
            dialogFirst.classList.add('block');
            document.body.style.overflow = 'hidden';

        });
    });
    closeButtons.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.add('hidden');
            popup.classList.remove('flex');
            inputs.forEach(input => {
                input.value = '';
            });    
            document.body.style.overflow = '';
        });
    });
    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        dialogFirst.classList.remove('block');
        dialogFirst.classList.add('hidden');
        dialogSecond.classList.remove('hidden');
        dialogSecond.classList.add('block');
    });
    buttonClose.addEventListener('click', (e) => {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
        dialogSecond.classList.remove('block');
        dialogSecond.classList.add('hidden');
        inputs.forEach(input => {
            input.value = '';
        });    
        document.body.style.overflow = '';
    });
    
});