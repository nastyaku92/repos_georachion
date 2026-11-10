document.addEventListener('DOMContentLoaded', () => {

    console.log('scripts public');
    

    let winWidth = document.body.clientWidth;

    const options = { searchable: false, placeholder: 'Выберите вариант', searchtext: 'Поиск...', selectedtext: 'выбрано' };
    document.querySelectorAll('select').forEach(function (selectElement) {
        NiceSelect.bind(selectElement, options);
    });

    // Маска для телефона
    const telInputs = document.querySelectorAll("input[type='tel']");
    if (telInputs.length > 0 && typeof Inputmask !== 'undefined') {
        Inputmask("+7 (999) 999 - 99 - 99").mask(telInputs);
    }

    // Добавление скрытого поля
    const ajaxForms = document.querySelectorAll(".ajax_form");
    ajaxForms.forEach(form => {
        const hiddenDiv = document.createElement('div');
        hiddenDiv.className = 'd-none';
        hiddenDiv.innerHTML = '<input type="text" name="org" value="" class="_org" style="visibility:hidden; height: 0; width: 0; padding: 0; border:none;"/>';
        form.appendChild(hiddenDiv);
    });

    // Offcanvas боковая панель (ниже header)
    const offcanvas = document.getElementById('offcanvasMenu');
    // Затемнение фона (backdrop)
    let backdrop = document.getElementById('offcanvasBackdrop');

    // Создаём backdrop динамически, если его нет
    if (!backdrop && offcanvas) {
        backdrop = document.createElement('div');
        backdrop.id = 'offcanvasBackdrop';
        backdrop.className = 'offcanvas-backdrop-below';
        offcanvas.parentNode.insertBefore(backdrop, offcanvas);
    }

    const menuToggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('closeOffcanvas');
    const navIcon = document.getElementById('nav-icon1');

    // Инициализация slinky
     let slinkyInitialized = false;
    const slinkyMenu = document.querySelector('.slinky-menu');

    // Функция открытия offcanvas
    function openOffcanvas() {
        if (menuToggle.classList.contains('show')) {
            closeOffcanvas();
        } else {
            offcanvas.classList.add('show');
            backdrop.classList.add('show');
            menuToggle.classList.add('show');
            navIcon.classList.add('open');

            // Инициализируем slinky при первом открытии
            if (!slinkyInitialized && slinkyMenu) {

                 if (typeof slinkyMenu.slinky === 'function') {
                   /*  slinkyMenu.slinky({
                        title: true,
                        resize: true
                    }); */

                    new SlinkyVanilla(slinkyMenu, {
                        title: true,
                        resize: true
                    });
                }
                slinkyInitialized = true; 
            } 
        }
    }

    // Функция закрытия offcanvas
    function closeOffcanvas() {
        offcanvas.classList.remove('show');
        backdrop.classList.remove('show');
        menuToggle.classList.remove('show');
        navIcon.classList.remove('open');
    }

    // Открытие по кнопке меню
    if (menuToggle) {
        menuToggle.addEventListener('click', openOffcanvas);
    }

    // Закрытие по кнопке close
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOffcanvas);
    }

    // Закрытие по клику на backdrop
    if (backdrop) {
        backdrop.addEventListener('click', closeOffcanvas);
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && offcanvas && offcanvas.classList.contains('show')) {
            closeOffcanvas();
        }
    });


// Закрытие offcanvas и скролл к секции при клике по пункту меню
if (slinkyMenu) {
    slinkyMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            closeOffcanvas();

            // Ждём окончания анимации закрытия (подстройте под свою CSS-анимацию)
            setTimeout(() => {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }, 300); // 300 мс — время transition закрытия offcanvas
        });
    });
}



    // Находим все dropdown элементы
    const dropdownItems = document.querySelectorAll('.fixed-header .nav-item.dropdown');

    dropdownItems.forEach(function (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        // Пропускаем, если нет toggle или меню
        if (!toggle || !menu) return;

        // Создаем экземпляр дропдауна Bootstrap
        const bsDropdown = new bootstrap.Dropdown(toggle);

        let showTimer;
        let hideTimer;

        // Функция показа дропдауна
        function showDropdown() {
            clearTimeout(hideTimer);
            clearTimeout(showTimer);
            showTimer = setTimeout(() => {
                bsDropdown.show();
            }, 100);
        }

        // Функция скрытия дропдауна
        function hideDropdown() {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                bsDropdown.hide();
            }, 200);
        }

        // Обработчики для toggle (ссылки)
        toggle.addEventListener('mouseenter', showDropdown);
        toggle.addEventListener('mouseleave', hideDropdown);

        // Обработчики для меню
        menu.addEventListener('mouseenter', showDropdown);
        menu.addEventListener('mouseleave', hideDropdown);

        // Делаем ссылку кликабельной (только если href не равен "#")
        toggle.addEventListener('click', function (e) {
            if (this.href && !this.href.endsWith('#')) {
                window.location.href = this.href;
            }
        });
    });

/*     setTimeout(function () {
        AOS.init({
            once: true,
            duration: 800,
            easing: "ease-out-cubic",
            delay: 0,
            offset: 120,
            //disable: 'mobile'
        });

    }, 100) // fix */


    // Инициализация Fancybox
        if (typeof Fancybox !== 'undefined') {
        const fancyboxElements = document.querySelectorAll("[data-fancybox]");
        if (fancyboxElements.length > 0) {
            Fancybox.bind("[data-fancybox]", {
                // Your custom options
                animated: false,
                placeFocusBack: false,
                // // autoFocus: false,
                 Images: {
                     zoom: false,
                 },
                //showClass: "f-fadeIn",
                //hideClass: "f-fadeOut",
            });
        }
    }

    // Create an example popover
    document.querySelectorAll('[data-bs-toggle="popover"]')
        .forEach(popover => {
            new bootstrap.Popover(popover)
        })

    // Create an example popover
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
        .forEach(tooltip => {
            new bootstrap.Tooltip(tooltip)
        })


    if (document.querySelector('.swiper-projects')) {
        new Swiper('.swiper-projects', {
            modules: [SwiperNavigation, SwiperPagination, SwiperAutoplay],
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-projects .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            },
            /*  autoplay: {
                 delay: 5000,
                 disableOnInteraction: false,
             }, */
        });
    }



});

// var myModal = document.getElementById('exampleModal')
// var myInput = document.getElementById('myInput')
//
// myModal.addEventListener('shown.bs.modal', function () {
//     myInput.focus()
// })

// Функция для отправки данных формы
function submitForm(form, formData, config) {

    /*test result*/
    console.log('FormData содержимое:');
    formData.forEach((value, key) => {
        if (value instanceof File) {
            console.log(`  ${key}: Файл "${value.name}" (${value.type})`);
        } else {
            console.log(`  ${key}: "${value}"`);
        }
    });

    // Закрываем модальное окно формы
    const modalForm = document.getElementById(config.modalFormId);
    if (modalForm) {
        const bootstrapModal = bootstrap.Modal.getInstance(modalForm);
        if (bootstrapModal) {
            bootstrapModal.hide();
        } else {
            modalForm.style.display = 'none';
        }
    }

    // Открываем модальное окно результата
    const modalResult = document.getElementById(config.modalResultId);
    if (modalResult) {
        const resultModal = new bootstrap.Modal(modalResult);
        resultModal.show();
    }
    return false;

    //fetch(config.ajaxUrl, {
    fetch('/local/templates/name/ajax/feedback.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'ok') {
                // Закрываем модальное окно формы
                const modalForm = document.getElementById(config.modalFormId);
                if (modalForm) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modalForm);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    } else {
                        modalForm.style.display = 'none';
                    }
                }

                // Открываем модальное окно результата
                const modalResult = document.getElementById(config.modalResultId);
                if (modalResult) {
                    const resultModal = new bootstrap.Modal(modalResult);
                    resultModal.show();

                    // Опционально: меняем текст сообщения в модальном окне
                    /*  const messageElement = modalResult.querySelector('.modal-body p');
                     if (messageElement && config.successMessage) {
                         messageElement.textContent = config.successMessage;
                     } */
                }

                // Очищаем форму
                /* form.reset();

                // Восстанавливаем значения по умолчанию
                if (config.hasAgreement) {
                    const agreementCheckbox = form.querySelector('[name="agreement"]');
                    if (agreementCheckbox) {
                        agreementCheckbox.checked = true;
                    }
                }

                const sMessageField = form.querySelector('.s-message');
                if (sMessageField) {
                    sMessageField.value = '';
                } */
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке формы:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        });
}

// Функция для настройки валидации формы
function setupFormValidation(form, config) {
    const validation = new JustValidate(form, {
        errorFieldCssClass: 'custom-error',
        successFieldCssClass: 'custom-valid',
        errorLabelCssClass: ['custom-error-label', 'custom-error'],
        errorLabelStyle: {
            backgroundColor: ''
        },
        focusInvalidField: true,
        lockForm: true,
    });

    // Валидация имени
    const nameField = form.querySelector('[name="name"]');
    if (nameField) {
        validation.addField(nameField, [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите ваше имя'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Имя должно содержать не менее 2 символов'
            }
        ]);
    }

    // Валидация телефона
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField) {
        validation.addField(phoneField, [
            {
                rule: 'required',
                errorMessage: 'Пожалуйста, введите номер телефона'
            },
            /*  {
                 rule: 'customRegexp',
                 value: /^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
                 errorMessage: 'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX'
             } */
        ]);
    }

    // Валидация email (если есть)
    if (config.hasEmail) {
        const emailField = form.querySelector('[name="email"]');
        if (emailField) {
            validation.addField(emailField, [
                {
                    rule: 'required',
                    errorMessage: 'Пожалуйста, введите email'
                },
                {
                    rule: 'email',
                    errorMessage: 'Введите корректный email адрес'
                }
            ]);
        }
    }

    // Валидация соглашения (если есть)
    if (config.hasAgreement) {
        const agreementField = form.querySelector('[name="agreement"]');
        if (agreementField) {
            validation.addField(agreementField, [
                {
                    rule: 'required',
                    errorMessage: 'Необходимо согласие с политикой конфиденциальности'
                }
            ]);
        }
    }

    validation.onSuccess((event) => {
        event.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);

        // Добавляем кастомные данные из конфигурации
        Object.keys(config.customData).forEach(key => {
            formData.append(key, config.customData[key]);
        });

        // Добавляем текущую страницу
        formData.append('page', window.location.href);

        // Отправляем форму
        submitForm(form, formData, config);
    });


/*     // остановим анимацию Trig.js после проигрывания
    const elements = document.querySelectorAll(".animate-once");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // даём анимации отработать
                setTimeout(() => {
                    if (el.classList.contains('trig') && !el.classList.contains('animation-played')) {
                        el.classList.add('animation-played');
                    }

                    el.classList.remove("enable-trig"); // отключаем повтор
                    obs.unobserve(el); // перестаём следить
                }, 1000); // подстрой под длительность анимации
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(el => observer.observe(el)); */

const elements = document.querySelectorAll(".animate-once");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const targets = el.querySelectorAll('.trig-target');

    if (!targets.length) {
      el.classList.remove("enable-trig");
      obs.unobserve(el);
      return;
    }

    let pending = targets.length;

    const finish = () => {
      if (--pending > 0) return;
      el.classList.add('animation-played');
      el.classList.remove("enable-trig");
      obs.unobserve(el);
    };

    targets.forEach(target => {
      // ждём, пока trig.js навесит trig и стартует анимацию
      const waitForAnim = () => {
        const anims = target.getAnimations();
        if (anims.length) {
          Promise.all(anims.map(a => a.finished.catch(() => {})))
            .then(finish);
        } else {
          // анимация ещё не стартовала — проверяем чуть позже
          requestAnimationFrame(waitForAnim);
        }
      };
      waitForAnim();
    });
  });
}, { threshold: 0.3 });

elements.forEach(el => observer.observe(el));

};

// Делаем функции глобальными
window.submitForm = submitForm;
window.setupFormValidation = setupFormValidation;