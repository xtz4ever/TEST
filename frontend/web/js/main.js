"use strict";

// подключение common.js

// для select и input с span добавление padding

function selectAndInputPadding() {
    $(".select.span, .modal_form_input_wrap.span, .authorization_method_input_wrap.label").each(function () {
        var widthLabel = $(this).find("label").width();
        var widthSpan = $(this).find("span").width();
        $(this).find(".slct").css("paddingLeft", widthSpan + 25);
        $(this).find("input").css("paddingLeft", widthLabel + 25);
        $('.personal_account .authorization_method_input_wrap.label label').css("position", "absolute");
    });
}

function selectAndInputPaddingMobile() {
    $(".select.span, .modal_form_input_wrap.span, .authorization_method_input_wrap.label").each(function () {
        $(this).find(".slct").css("paddingLeft", 20);
        $(this).find("input").css("paddingLeft", 20);
        $('.personal_account .authorization_method_input_wrap.label label').css("position", "static");
    });
}

// Табы
function tabs(parent) {
    parent.find("button:not('button[type=submit]')").on('click', function (event) {
        //ссылки которые будут переключать табы
        event.preventDefault();
        event.stopPropagation();

        parent.find("button").removeClass('active'); //убираем активные состояния у ссылок

        $(this).addClass('active'); //Добавляем активное состояние у той что нажали

        var data = $(this).data('tab'); //создаём переменную с датой
        parent.find('.quick_order_tab').hide().removeClass("active"); //убираем активные состояния у табов
        parent.find('.quick_order_tab[data-tab=' + data + ']').show("fade", 500).addClass('active'); //если таб соответствует тому, какой data
        if (window.matchMedia("(min-width: 520px)").matches) {
            selectAndInputPadding();
        }
        if (window.matchMedia("(max-width: 520px)").matches) {
            selectAndInputPaddingMobile();
        }
    });
};

tabs($(".quick_order_proxy_wrap"));
tabs($(".authorization_method"));

function tabs2(parent) {
    parent.find(".tabs-item").on('click', function (event) {
        //ссылки которые будут переключать табы
        event.preventDefault();

        parent.find(".tabs-item[data-tab2]").removeClass('active'); //убираем активные состояния у ссылок

        $(this).addClass('active'); //Добавляем активное состояние у той что нажали

        var data = $(this).data('tab2'); //создаём переменную с датой

        parent.find('.tabs-wrap[data-tab2]').removeClass("active").hide(); //убираем активные состояния у табов
        parent.find('.tabs-wrap[data-tab2=' + data + ']').show("fade", 500).addClass('active'); //если таб соответствует тому, какой data
        if (window.matchMedia("(min-width: 520px)").matches) {
            selectAndInputPadding();
        }
        if (window.matchMedia("(max-width: 520px)").matches) {
            selectAndInputPaddingMobile();
        }
        mCustomScrollbarPartnersStatistic();
    });
}

tabs2($(".save_even_more_one"));
tabs2($(".save_even_more_two"));
tabs2($(".partners_private_office_tab"));

function tabs3(parent) {
    parent.find(".tabs-item-affiliate-program").on('click', function (event) {
        //ссылки которые будут переключать табы
        event.preventDefault();

        parent.find(".tabs-item-affiliate-program[data-tab3]").removeClass('active'); //убираем активные состояния у ссылок

        $(this).addClass('active'); //Добавляем активное состояние у той что нажали

        var data = $(this).data('tab3'); //создаём переменную с датой

        parent.find('.tabs-wrap-affiliate-program[data-tab3]').removeClass("active").hide(); //убираем активные состояния у табов
        parent.find('.tabs-wrap-affiliate-program[data-tab3=' + data + ']').show("fade", 500).addClass('active'); //если таб соответствует тому, какой data
    });
}

tabs3($(".affiliate_program_tab"));

function tabsPromotionalMaterials(obj) {
    var buttons = document.querySelectorAll(obj.btn);

    var func = function func(e) {
        "use strict";

        e.preventDefault();
        var thisButtons = this.parentNode.parentNode.querySelectorAll(obj.btn);
        var thisBodyTabs = this.parentNode.parentNode.querySelectorAll(obj.tabsBody);
        for (var i = thisButtons.length; i--;) {
            thisButtons[i].classList.remove(obj.classBtn);
            thisBodyTabs[i].classList.remove(obj.classBody);
        }
        this.classList.add(obj.classBtn);
        var item = [].indexOf.call(thisButtons, this);
        thisBodyTabs[item].classList.add(obj.classBody);
    };

    [].forEach.call(buttons, function (item) {
        return item.addEventListener('click', func);
    });
}

function articleSearch(parent) {
    parent.find(".tabs-item").on('click', function (event) {
        //ссылки которые будут переключать табы
        event.preventDefault();

        parent.find(".tabs-item").removeClass('active'); //убираем активные состояния у ссылок

        $(this).addClass('active'); //Добавляем активное состояние у той что нажали

        var data = $(this).data('search'); //создаём переменную с датой

        parent.find('.tabs-wrap').removeClass("active").hide(); //убираем активные состояния у табов
        parent.find('.tabs-wrap[data-search=' + data + ']').show("fade", 200).addClass('active'); //если таб соответствует тому, какой data
    });
}

articleSearch($(".articles"));

//accordion
function accordion() {
    $(".accordion .accordion_title").click(function () {
        var $content = $(this).next();
        if ($content.is(":visible")) {
            //если нажали на title аккордеона,
            $content.slideUp('fast', function () {//и если контент аккордеона видимый, то
            }); //убираем его
            $(this).children().removeClass("active"); //убираем активный класс у стрелки к примеру
            $(this).removeClass("active");
        } else {
            $(".accordion .accordion_content").slideUp('fast'); //если невидимый, прячем все скрытые
            $(".accordion .accordion_title").children() //убираем активный класс у стрелки к примеру
                .removeClass("active");
            $content.slideToggle("fast");
            $(".accordion .accordion_title").removeClass("active");
            $(this).addClass("active");
            $(this).children().addClass("active"); //добавляем активный класс у стрекли к примеру
        }
    });
}

// Функция копирования текста в элементе
function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

// Функции добавления элементов через нажатие на чек в таблице
function IPcheckTpl(text, i, dataId, dataOrderType, dataOrderId, dataOrderPrice) {
    return "\n\t\t\t<div class='proxy_list_item' data-id='" + dataId + "' data-order_type='" + dataOrderType + "' data-order_id='" + dataOrderId + "' data-order_price='" + dataOrderPrice + "' data-text='" + i + "'>\n\t\t\t\t<i title='\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u043A\u0441\u0438 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430' class='fa fa-close'></i>\n\t\t\t\t<span>" + text + "</span>\n\t\t\t</div>\n\t\t\t";
}

function IPchecked(input, attr) {
    var id = parseInt(input.attr('data-text')),
        ipArr = input.parents('tbody').find("tr"),
        limit = 0,
        ip = 0,
        text = '',
        flag = 0,
        dataId = void 0,
        dataOrderType = void 0,
        dataOrderId = void 0,
        dataOrderPrice = void 0;

    ipArr.each(function () {
        limit++;
        if (id === limit) {
            ip = 1;
            $(this).find('td').each(function () {
                flag++;
                if (flag === ip) {
                    text = $(this).text();
                    dataId = $(this).find('.check').attr('data-id');
                    dataOrderType = $(this).find('.check').attr('data-order_type');
                    dataOrderId = $(this).find('.check').attr('data-order_id');
                    dataOrderPrice = $(this).find('.check').attr('data-order_price');

                    if (input.is(':checked')) {
                        $('.proxy_list_items').append(IPcheckTpl(text, attr, dataId, dataOrderType, dataOrderId, dataOrderPrice));
                    } else {
                        $('.select_all_check').find("input:checkbox").prop('checked', false);
                        $('.proxy_list_items').find('[data-text=' + attr + ']').remove();
                    }
                }
            });
        }
    });
}

function addDataAttrChecked() {
    var limit = 0;
    $('.personal_account_ipv4_table').find('input[type=checkbox]').each(function () {
        "use strict";

        limit++;
        $(this).attr('data-text', limit);
    });
}

// Создаём цикл для инициализации mCustomScrollbar в нужных select
function mCustomScrollbar() {
    $(document).find('.select .drop').each(function () {
        // var log = '';
        // var height = $(this).height();
        // log += 'Высота элементов: ' + height;
        // console.log(log);
        //инициализация mCustomScrollbar
        if ($(this).height() >= 397) {
            $(this).mCustomScrollbar({
                theme: "my-theme"
            });
        }
    });
}

function mCustomScrollbarModal() {
    $(document).find('.select .drop').each(function () {
        // var log = '';
        // var height = $(this).height();
        // log += 'Высота элементов: ' + height;
        // console.log(log);
        //инициализация mCustomScrollbar
        if ($(this).height() >= 267) {
            $(this).mCustomScrollbar({
                theme: "my-theme"
            });
        }
    });
}

// Создаём цикл для инициализации mCustomScrollbar в нужных select
function mCustomScrollbarPartnersStatistic() {
    $(document).find('.partners_private_office_tab .partners_private_office__number .select .drop').each(function () {
        if ($(this).height() >= 140) {
            $(this).mCustomScrollbar({
                theme: "my-theme"
            });
        }
    });
}

// в модалке селекты ограничиваем количество букв
function selectLimitLetters() {
    $(document).find('.popup .select.span .slct').each(function () {

        var self = $(this).text();

        var str = self.slice(0, 25); //например макс 100 символов
        var a = str.split(' ');
        a.splice(a.length - 1, 1);
        str = a.join(' ');

        if (window.matchMedia("(max-width: 400px)").matches) {
            if ($(this).text().length >= 31) {
                $(this).html(str + ' ...');
            }
        }
    });
}

//Клик на ссылке promo
$('.extend_proxy_wrap .promo, .quick_order .quick_order_center a.promo, .popup.pop_order_form .authorization_method a.promo, .header_bottom a.promo').on("click", function (e) {
    e.preventDefault();
    $(this).siblings("input").show("fade", 500).addClass('active').add(this).hide();
    $(this).siblings("i").show("fade", 500);
});
$('.quick_order .authorization_method .enter_promo_wrap > i, .popup.pop_order_form .authorization_method .enter_promo_wrap > i, .personal_account_ipv4 .extend_proxy_wrap .enter_promo_wrap > i, .header_bottom .enter_promo_wrap > i').on("click", function (e) {
    e.preventDefault();
    $(this).siblings("a").show("fade", 500).add(this).siblings('input').hide().removeClass('active').add(this).hide();
});

function footerDropdown() {
    $('#footer-dropdown').off().on('click', function () {
        var $elem = $('.footer_dropdown');
        if ($elem.is(":hidden") || $elem.css("visibility") == "hidden" || $elem.css("opacity") == 0) {
            $('.footer_dropdown').addClass('active');
            $(this).addClass('active');
        } else {
            $('.footer_dropdown').removeClass('active');
            $(this).removeClass('active');
        }
    });
}

function setCursorPos(elem, pos) {
    if (elem.setSelectionRange) {
        elem.focus();
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        var range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

$(document).ready(function () {
    // страница partners_private_office.html кнопка показать код
    $('.partners_private_office__profile_body_balance .show-code').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('hide-code')) {
            $(this).parent().siblings('.affiliate-links').hide('fade').end().add(this).children().text('Показать код').removeClass('hide-code');
        } else {
            $(this).parent().siblings('.affiliate-links').show('fade').end().add(this).children().text('Скрыть код').addClass('hide-code');
        }
    });
    // табы promotional-materials
    tabsPromotionalMaterials({
        btn: '.tabs-items-wrap > .tabs-item-promotional-materials',
        tabsBody: '.tabs-wrap',
        classBody: 'active',
        classBtn: 'active'
    });
    tabsPromotionalMaterials({
        btn: '.tabs-items-wrap-inner > .tabs-item-promotional-materials',
        tabsBody: '.tabs-wrap-inner',
        classBody: 'active',
        classBtn: 'active'
    });
    // инициализация swiper слайдера
    var swiperArticles = new Swiper('.frequent-questions-and-articles__articles .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 0,
        direction: 'vertical',
        navigation: {
            nextEl: '.frequent-questions-and-articles__articles .button-next',
            prevEl: '.frequent-questions-and-articles__articles .button-prev'
        },
        breakpoints: {
            // when window width is <= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            // when window width is <= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 0
            }
        }
    });
    // убираем активное состояние у кнопки в первом экране
    $('.header_bottom_btn button').on('click', function () {
        var self = $(this);
        setTimeout(function () {
            self.blur();
        }, 1000);
    });

    // Показываем пароль
    function ShowHidePassword(el) {
        var element = el;
        element.replaceWith(element.clone().attr('type', element.attr('type') == 'password' ? 'text' : 'password'));
    }

    $('.show-password').on('click', function (e) {
        e.preventDefault();
        var elem = $(this).parent().siblings('input');
        ShowHidePassword(elem);
    });
    // делаем при клике чтобы курсор становился в конец певрого слова или вводимого
    $(".header-input").click(function () {
        var arr = $(this).val().split(' '),
            arrMain = $(this).val().split(" " + arr[arr.length - 1]);
        if (arr[0] == "0") {
            $(this).val(" " + arr[1]);
            setCursorPos(this, arrMain[0].length - 1);
        } else if (arr[0] == "" && arr[1] == "шт.") {
            $(this).val('');
        } else {
            $(this).val(arr[0].replace(/\D/g, '') + ' ' + 'шт.');
            setCursorPos(this, arrMain[0].length);
        }
    });
    $(".header-input").on('keyup', function (e) {
        var arr = $(this).val().split(' '),
            arrMain = $(this).val().split(" " + arr[arr.length - 1]);
        if (arr[0] == "" && arr[1] == "шт.") {
            $(this).val('');
        } else if (e.keyCode == 46) {
            $(this).val(arr[0]);
        } else if (arr[0] == "") {
            $(this).val(arr[0] + ' ' + 'шт.');
            setCursorPos(this, arrMain[0].length);
        } else if (!arr[1]) {
            $(this).val(arr[0] + ' ' + 'шт.');
            setCursorPos(this, arrMain[0].length);
        }
    });
    $(".header-input").on('blur', function () {
        var arr = $(this).val().split(' ');
        if (arr[0] == "" && arr[1] == "шт.") {
            $(this).val('');
        } else if (!arr[1] && arr[0] == "") {
            $(this).val('');
        } else if ($(this).val() === '') {
            $(this).val('');
        } else {
            $(this).val(arr[0].replace(/\D/g, '') + ' ' + 'шт.');
        }
    });
    // вводим только цифры
    $("input.only-num").keydown(function (event) {
        // Разрешаем нажатие клавиш backspace, Del, Tab и Esc
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
            // Разрешаем выделение: Ctrl+A
            event.keyCode == 65 && event.ctrlKey === true ||
            // Разрешаем клавиши навигации: Home, End, Left, Right
            event.keyCode >= 35 && event.keyCode <= 39) {
            return;
        } else {
            // Запрещаем всё, кроме клавиш цифр на основной клавиатуре, а также Num-клавиатуре
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
    // клик на ссылку вызова footer_dropdown
    $('#footer-dropdown > a').on('click', function (e) {
        e.preventDefault();
    });

    if (window.matchMedia("(max-width: 992px)").matches) {
        footerDropdown();
    }
    $(document).click(function (event) {
        if ($(event.target).closest("#footer-dropdown").length) return;
        $('.footer .footer_dropdown').removeClass('active');
        $('#footer-dropdown').removeClass('active');
        event.stopPropagation();
    });

    // пример выборки текстовых узлов
    // https://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
    // на чистом var text = document.getElementsByClassName('articles__search-dropdown-item')[0];
    //console.log(text.childNodes[0].textContent = articlesSearchInput + ' ');
    // активация при поиске выпадающего списка
    $('#articles__search-input').on('keyup', function () {
        var articlesSearchInput = $('#articles__search-input').val();
        $('.articles__search-dropdown').show();
        // $.each($('.articles__search-dropdown-item'),
        // 	function () {
        // 		$(this).contents().filter(function () {
        // 			return this.nodeType === 3;
        // 		})[0].textContent = articlesSearchInput + ' ';
        // 	})
    });
    $('#articles__search-input').on('focus', function () {
        if ($('#articles__search-input').val().length >= 1) {
            $('.articles__search-dropdown').show();
        }
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".articles__search").length) return;
        $('.articles__search-dropdown').hide();
        event.stopPropagation();
    });
    // активация по клику кнопок волюты quick_order_min_block_item_currency_selection на главной странице
    $('.quick_order .quick_order_min_block_sum .quick_order_min_block_item_currency_selection button').on('click', function () {
        $('.quick_order .quick_order_min_block_sum .quick_order_min_block_item_currency_selection button').removeClass('active');
        $(this).addClass('active');
    });
    // Вызовы функций selectAndInputPadding и  selectAndInputPaddingMobile
    if (window.matchMedia("(min-width: 520px)").matches) {
        selectAndInputPadding();
    }
    if (window.matchMedia("(max-width: 520px)").matches) {
        selectAndInputPaddingMobile();
    }
    //кликабельная строка в таблице
    $('tbody tr[data-href]').addClass('clickable').click(function () {
        window.open($(this).attr('data-href'));
    }).find('a, .check').hover(function () {
        $(this).parents('tr').off('click');
    }, function () {
        $(this).parents('tr').click(function () {
            window.open($(this).attr('data-href'));
        });
    });
    // Скролл по кнопке добавить ещё ipv6
    $(document).on('click', '.proxy_ipv6 .center button', function () {
        var anchor = $(this).parent();
        $('html, body').stop().animate({
            scrollTop: anchor.offset().top - 300
        }, 1000);
    });
    // Неизменяемая строка в input
    var unchangeableInputVal = "site.ru/ghtrrekger";
    var unchangeableInput = $('#unchangeable');

    $('#unchangeable').on('keyup', function () {
        var check = unchangeableInput.val().slice(0, unchangeableInputVal.length);
        if (check !== unchangeableInputVal) {
            unchangeableInput.val(unchangeableInputVal);
        }
    });

    // Инициализация datepicker

    $(".datepicker").datepicker({
        showOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd.mm.yy",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        dayNamesMin: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
        firstDay: 1,
        beforeShow: function beforeShow(input, inst) {
            // Handle calendar position before showing it.
            // It's not supported by Datepicker itself (for now) so we need to use its internal variables.
            var calendar = inst.dpDiv;

            // Dirty hack, but we can't do anything without it (for now, in jQuery UI 1.8.20)
            setTimeout(function () {
                calendar.position({
                    my: 'right top',
                    at: 'right bottom',
                    collision: 'none',
                    of: input
                });
            }, 1);
        }
    });
    var counterProxy = 0;
    //событие на check в таблицах
    $(".personal_account_ipv4_table input:checkbox").change(function () {
        $(this).parents("tr").toggleClass("active");
        IPchecked($(this), $(this).attr('data-text'));
        $('.extend_proxy_wrap__hide-block').show();
        if ($(this).is(':checked')) {
            counterProxy++;
        } else {
            counterProxy--;
        }
        $('#how-many-proxies-are-selected span').text(counterProxy);
    });
    addDataAttrChecked();
    //удаляем
    $(document).on('click', '.proxy_list_item i', function () {
        $('.select_all_check').find("input:checkbox").prop('checked', false);

        $(".personal_account_ipv4_table tbody tr").off('click');
        var id = $(this).parent().attr('data-text');

        $('.personal_account_ipv4_table').find('input[type=checkbox][data-text=' + id + ']').trigger('click');
        $(".personal_account_ipv4_table tbody tr").click(function () {
            window.open($(this).attr('data-href'));
        });
    });
    //событие на check в .select_all_check выделить все
    $(".select_all_check input:checkbox").change(function () {
        if ($(".select_all_check input:checkbox").is(':checked')) {
            $('.personal_account_ipv4_table input:checkbox').each(function () {
                $(".personal_account_ipv4_table tbody tr").off('click');
                if (!$(this).is(':checked')) {
                    $(this).trigger('click');
                    $(".personal_account_ipv4_table tbody tr").click(function () {
                        window.open($(this).attr('data-href'));
                    });
                }
            });
        } else {
            $('.personal_account_ipv4_table input:checkbox').each(function () {
                $(".personal_account_ipv4_table tbody tr").off('click');
                if ($(this).is(':checked')) {
                    $(this).trigger('click');
                    $(".personal_account_ipv4_table tbody tr").click(function () {
                        window.open($(this).attr('data-href'));
                    });
                }
            });
        }
    });
    //событие на check в .select_all_check удалить все
    $(".select_all_check button").on("click", function () {
        $(".personal_account_ipv4_table input:checkbox").each(function () {
            if ($(this).is(':checked')) {
                $(".personal_account_ipv4_table tbody tr").off('click');
                $(this).trigger('click');
                $(".personal_account_ipv4_table tbody tr").click(function () {
                    window.open($(this).attr('data-href'));
                });
            }
        });
        $(this).parents(".select_all_check").find("input:checkbox").prop('checked', false);
    });
    //копируем то что в input
    $(".copy_the_txt").on("click", function (e) {
        e.preventDefault();
        var copyInput = document.getElementById("copyTarget");
        copyToClipboard(copyInput);
    });

    // Активация input на странице personal_account.html
    $(".activateInput").on("click", function (e) {
        e.preventDefault();
        $(this).next().removeAttr("disabled");
        $(this).parents("form").find("input").removeAttr("disabled");
    });
    // Деактивация input на странице personal_account.html
    $(".disabledInput").on("click", function () {
        var _this = this;

        $(this).parents("form").find("input").attr("disabled", "");
        setTimeout(function () {
            $(_this).attr("disabled", "");
        }, 10);
        //$(this).parents('form').trigger('submit');
    });

    accordion();
    // Ограничиваем количество симоволов в параграфе
    $.each($(".articles_item p"), function () {
        var self = $(this).text();
        var str = self.slice(0, 150); //например макс 100 символов
        var a = str.split(' ');
        a.splice(a.length - 1, 1);
        str = a.join(' ');
        if ($(this).text().length >= 130) {
            $(this).addClass("trim");
            $(this).html(str + ' ...');
        }
    });
    $.each($(".frequent-questions-and-articles__articles-title + p"), function () {
        var self = $(this).text();
        var str = self.slice(0, 140); //например макс 100 символов
        var a = str.split(' ');
        a.splice(a.length - 1, 1);
        str = a.join(' ');
        if ($(this).text().length >= 120) {
            $(this).addClass("trim");
            $(this).html(str + ' ...');
        }
    });
    // Создаём цикл для инициализации mCustomScrollbar в нужных select
    mCustomScrollbar();

    // Флаги в quick_order
    $(".quick_order_flag_items a").on("click", function (e) {
        e.preventDefault();
        // $(".quick_order_flag_items a").find("span").hide();
        // $(".quick_order_flag_items .quick_order_flag_item").removeClass("active");
        // $(this).find("span").show("fade");
        // $(this).parent().addClass("active");

        $(".quick_order_flag_item").removeClass('animation');
        $(".quick_order_flag_item").find('span').css('display', "none");
        $(this).find('span').css('display', "inline");
        $(this).parent().addClass('animation active');
    });

    // для инициализации tooltips
    $(".quick_order .type_proxy span, .quick_order .type_proxy i, .copy_the_link_input i, .personal_account_ipv4_table .tooltip, .proxy_list_items i, .personal_account_ipv4 .copy_the_link a, .quick_order .quick_order_min_block_discounts").tooltip({
        track: true,
        position: {
            my: "left-10 bottom-20",
            collision: "none",
            using: function using(position, feedback) {
                $(this).css(position);
                $(this).addClass("arrow_left").appendTo(this);
            }
        }

    });
    $(".default-table i").tooltip({
        track: true,
        position: {
            my: "right+10 bottom-20",
            collision: "none",
            using: function using(position, feedback) {
                $(this).css(position);
                $(this).addClass("arrow_right").appendTo(this);
            }
        }

    });
    mCustomScrollbarPartnersStatistic();
    // скролл по ссылке с атрибутом href
    // $(".header_nav a[href*='#']").on("click", function(e) {
    //     e.preventDefault();
    //     var anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: $(anchor.attr('href')).offset().top
    //     }, 500);
    //     return false;
    // });

    // Скролл по классу .scroll_to и атрибуту data-scroll у кнопки к примеру (data-scroll="куда скроллим" в элементе куда скроллим ставим id потом впишем в куда скроллим)
    $(".scroll_to").on("click", function (e) {
        e.preventDefault();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $("#" + anchor.data('scroll')).offset().top
        }, 500);
        return false;
    });
});

$(window).resize(function () {
    if (window.matchMedia("(min-width: 520px)").matches) {
        selectAndInputPadding();
    }
    if (window.matchMedia("(max-width: 520px)").matches) {
        selectAndInputPaddingMobile();
    }

    selectLimitLetters();
    // Скрываем datepicker при resize
    $(".datepicker").blur();
    $(".datepicker").datepicker("hide");

    if (window.matchMedia("(max-width: 992px)").matches) {
        footerDropdown();
    }
});

$(window).scroll(function () {});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// подключение animate.js


var Animation = function () {
    function Animation() {
        _classCallCheck(this, Animation);

        this.tl1 = new TimelineMax();
        this.tl2 = new TimelineMax();
        this.tl1.pause();
        this.tl2.pause();
    }

    _createClass(Animation, [{
        key: 'description',
        value: function description() {
            this.tl1.from('.footer-arrow-up', 0.4, {
                y: 20,
                autoAlpha: 0,
                ease: Power4.easeOut
            }, 0.1);
        }
    }, {
        key: 'play',
        value: function play() {
            if ($(window).scrollTop() >= 1000) {
                var $elem = $('.footer-arrow-up');
                if ($elem.is(":hidden") || $elem.css("visibility") == "hidden" || $elem.css("opacity") == 0) {
                    //элемент скрыт
                    this.tl1.restart();
                    this.tl1.resume();
                } else {
                    //элемент видимый

                }
            }
            if ($(window).scrollTop() <= 999) {
                this.tl1.reverse();
            }
        }
    }]);

    return Animation;
}();

var anim = new Animation();

$(window).scroll(function () {
    anim.play();
});

$(window).ready(function () {
    anim.description();
    anim.play();
});
'use strict';

// подключение functions.js

$(function () {
    //SVG Fallback
    // if(!Modernizr.svg) {
    //  $("img[src*='svg']").attr("src", function() {
    //      return $(this).attr("src").replace(".svg", ".png");
    //  });
    // };
});
//изменяется - для плавной обратной анимации animate.css*/
$(window).scroll(function () {
    // для правильной рабоы надо прописать в блок которому присваивается анимация атрибут data-anim="fadeInLeft" с названием анимации
    $('.animated').each(function () {
        var imagePos = $(this).offset().top;
        var imageHght = $(this).outerHeight();
        var topOfWindow = $(window).scrollTop() + 40;
        var heightOfWindow = $(window).height();
        var animName = $(this).data('anim');
        if (!$(this).data('atop')) {
            var animTop = 0.9;
        } else {
            var animTop = $(this).data('atop');
        }
        if (imagePos < topOfWindow + heightOfWindow * animTop && imagePos + imageHght > topOfWindow) {
            $(this).css('visibility', 'visible').addClass(animName);
        } else if (imagePos + imageHght < topOfWindow || imagePos > topOfWindow + heightOfWindow) {
            $(this).css('visibility', 'hidden').removeClass(animName);
        }
    });
});

// Initialize Slidebars
(function ($) {
    // Initialize Slidebars
    var controller = new slidebars();
    controller.init();

    // Toggle Slidebars
    $('#nav-button-label').on('click', function (event) {
        // Stop default action and bubbling
        event.stopPropagation();
        event.preventDefault();
        // Toggle the Slidebar with id 'id-1'
        controller.toggle('id-1');
        $("html,body").toggleClass("slidebars");
        $(".off-canvas-wrap").toggleClass("active");
    });

    // Close Slidebar links
    $('[off-canvas] a').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        var url = $(this).attr('href'),
            target = $(this).attr('target') ? $(this).attr('target') : '_self';

        $("#nav-button-label").removeClass("nav-on");
        $("#nav-button-label .nav-line").removeClass("active");
        $(".off-canvas-wrap").removeClass("active");
        $("html,body").removeClass("slidebars");
        controller.close(function () {
            window.open(url, target);
        });
    });

    // Add close class to canvas container when Slidebar is opened
    $(controller.events).on('opening', function (event) {
        $('[canvas]').addClass('js-close-any');
    });
    // Add close class to canvas container when Slidebar is opened
    $(controller.events).on('closing', function (event) {
        $('[canvas]').removeClass('js-close-any');
    });
    // Close any
    $(document).on('click', '.js-close-any', function (event) {
        if (controller.getActiveSlidebar()) {
            event.preventDefault();
            event.stopPropagation();
            $("#nav-button-label").removeClass("nav-on");
            $("#nav-button-label .nav-line").removeClass("active");
            $(".off-canvas-wrap").removeClass("active");
            $("html,body").removeClass("slidebars");
            controller.close();
        }
    });
})($);

$(document).ready(function () {

    var md = new MobileDetect(window.navigator.userAgent);

    if (md.userAgent() == "Safari" && md.mobile() == "iPhone" || md.mobile() == "iPad") {
        $("html,body").css("overflow", "hidden !important");
    }

    // Select в модальном окне
    $(document).click(function () {
        $('.slct').removeClass('active');
        $('.slct_arrow').removeClass('active');
        $('.slct').parent().find('.drop').slideUp("fast");
    });
    $('.slct').click(function () {
        if (window.matchMedia("(min-width: 520px)").matches) {
            selectAndInputPadding();
        }
        if (window.matchMedia("(max-width: 520px)").matches) {
            selectAndInputPaddingMobile();
        }
        /* Заносим выпадающий список в переменную */
        var dropBlock = $(this).parent().find('.drop');
        var dropBlockIPv4IPv6 = $(this).parents('.header_select-item').siblings('.header_select-item.IPv4-IPv6').find('.drop');
        mCustomScrollbarModal();
        //  закрываем все открытые
        $('.slct').removeClass('active').parent().find('.drop').slideUp("fast");

        if ($(this).parents('.header_select-item').hasClass('bound-pair-select') && $(this).parents('.header_select-item').siblings('.header_select-item').hasClass('IPv4-IPv6') && !$(this).parents('.header_select-item').siblings('.header_select-item').hasClass('choice-is-made')) {
            /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
            if (dropBlockIPv4IPv6.is(':hidden')) {
                dropBlockIPv4IPv6.slideDown('fast');
                dropBlockIPv4IPv6.siblings('.slct').addClass('active');
                dropBlockIPv4IPv6.siblings(".slct_arrow").addClass('active');

                /* Работаем с событием клика по элементам выпадающего списка */
                $('.drop').find('li').off("click").click(function () {
                    /* Заносим в переменную HTML код элемента
     списка по которому кликнули */
                    var selectResult = $(this).html();
                    $(this).parents('.header_select-item').addClass('choice-is-made');
                    /* Находим наш скрытый инпут и передаем в него
     значение из переменной selectResult */

                    /* Передаем значение переменной selectResult в ссылку которая
     открывает наш выпадающий список и удаляем активность */
                    $(this).parents(".select").find(".slct").removeClass('active').html(selectResult);
                    $(".slct_arrow").removeClass('active');
                    selectLimitLetters();

                    /* Скрываем выпадающий блок */
                    dropBlock.slideUp();
                });

                /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
            } else {
                dropBlockIPv4IPv6.siblings('.slct').removeClass('active');
                dropBlockIPv4IPv6.siblings(".slct_arrow").removeClass('active');
                $(this).removeClass('active');
                $(".slct_arrow").removeClass('active');
                dropBlock.slideUp();
            }
        } else if ($(this).parents('.header_select-item').hasClass('IPv4-IPv6')) {
            if (dropBlock.is(':hidden')) {
                dropBlock.slideDown('fast');

                /* Выделяем ссылку открывающую select */
                $(this).addClass('active');
                $(this).siblings(".slct_arrow").addClass('active');

                /* Работаем с событием клика по элементам выпадающего списка */
                $('.drop').find('li').off("click").click(function () {
                    /* Заносим в переменную HTML код элемента
     списка по которому кликнули */
                    var selectResult = $(this).html();
                    $(this).parents('.header_select-item').addClass('choice-is-made');
                    /* Находим наш скрытый инпут и передаем в него
     значение из переменной selectResult */

                    /* Передаем значение переменной selectResult в ссылку которая
     открывает наш выпадающий список и удаляем активность */
                    $(this).parents(".select").find(".slct").removeClass('active').html(selectResult);
                    $(".slct_arrow").removeClass('active');
                    selectLimitLetters();

                    /* Скрываем выпадающий блок */
                    dropBlock.slideUp();
                });

                /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
            }
        } else {
            dropBlockIPv4IPv6.siblings('.slct').removeClass('active');
            dropBlockIPv4IPv6.siblings(".slct_arrow").removeClass('active');
            /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
            if (dropBlock.is(':hidden')) {
                dropBlock.slideDown('fast');

                /* Выделяем ссылку открывающую select */
                $(this).addClass('active');
                $(this).siblings(".slct_arrow").addClass('active');

                /* Работаем с событием клика по элементам выпадающего списка */
                $('.drop').find('li').off("click").click(function () {
                    /* Заносим в переменную HTML код элемента
     списка по которому кликнули */
                    var selectResult = $(this).html();
                    var selectData = $(this).data("service");
                    var selectResult_XTZ = $(this).data('wallet_id'); // ДЛЯ ПАРТНЕРКИ НЕ УДАЛЯТЬ
                    var selectIpv4target = $(this).data("ipv4-target");
                    var selectIpv4service = $(this).data("ipv4-service");
                    var selectIpv4term = $(this).data("ipv4-term");
                    var selectIpv6term = $(this).data("ipv6-term");
                    var tab1Serv = $(this).data("tab-1-service");
                    var tab2Serv = $(this).data("tab-2-service");
                    var selectDataTab2 = $(this).data('tab2');
                    if ($(this).parent().parent().parent().hasClass('save_even_more_btn_tab_select')) {

                        $(this).parents('.save_even_more_one').find('.tabs-wrap[data-tab2]').removeClass("active").hide(); //убираем активные состояния у табов
                        $(this).parents('.save_even_more_one').find('.tabs-wrap[data-tab2=' + selectDataTab2 + ']').show("fade", 500).addClass('active');
                    }
                    /* Находим наш скрытый инпут и передаем в него
     значение из переменной selectResult */

                    $(this).parents(".select").find('input').val(selectResult);
                    $('#partner-wallets').val(selectResult_XTZ); // ДЛЯ ПАРТНЕРКИ НЕ УДАЛЯТЬ
                    $(this).parents(".select").find(".slct").addClass("active_link");
                    $(this).parents(".select").parent().next().find('.slct').focus();
                    $(this).parents(".select").next().find('.slct').focus();

                    /* Передаем значение переменной selectResult в ссылку которая
     открывает наш выпадающий список и удаляем активность */
                    $(this).parents(".select").find(".slct").removeClass('active').html(selectResult).attr("data-service", selectData).attr("data-ipv4-target", selectIpv4target).attr("data-ipv4-service", selectIpv4service).attr("data-ipv4-term", selectIpv4term).attr("data-ipv6-term", selectIpv6term).attr("data-tab-1-service", tab1Serv).attr("data-tab-2-service", tab2Serv);
                    $(".slct_arrow").removeClass('active');
                    selectLimitLetters();

                    /* Скрываем выпадающий блок */
                    dropBlock.slideUp();
                });

                /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
            } else {
                $(this).removeClass('active');
                $(".slct_arrow").removeClass('active');
                dropBlock.slideUp();
            }
        }

        /* Предотвращаем обычное поведение ссылки при клике */
        return false;
    });
    // Открываем модальное окно
    $(document).on("click", ".modal", function (e) {
        e.preventDefault();
        var id = $(this).data('modal');
        var txt = $(this).data('info');
        // var title =  $(this).data('title'); // для изменения title в модалке
        $(".popup[data-modal=" + id + "]").toggle("fade", 200).find("form").css('display', 'block');
        $(".popup[data-modal=" + id + "] input[name=form_name]").val(txt);
        // $(".popup[data-modal="+id+"] h2").html(title); // прописать в ссылку data-title="нужный title"
        mCustomScrollbarModal();
        setTimeout(function () {

            if (window.matchMedia("(min-width: 520px)").matches) {
                selectAndInputPadding();
            }
            if (window.matchMedia("(max-width: 520px)").matches) {
                selectAndInputPaddingMobile();
            }
        }, 200);

        if (window.matchMedia("(min-width: 992px)").matches) {
            $("body").css({ "overflow": "hidden", "padding-right": "17px" });
        }
        if (window.matchMedia("(max-width: 992px)").matches) {

            $("body").css({ "overflow": "hidden", "padding-right": "0px" });
        }
    });
    // overlay для закрытия
    $(".overlay").click(function () {
        $(this).parent().toggle("fade", 200);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    // закрываем модальное окно на крестик
    $(".popup .close").click(function (e) {
        e.preventDefault();
        $(this).parents(".popup").hide("drop", { direction: "up" }, 200);
        $("body").css({ "overflow": "inherit", "padding-right": "0" });
    });
    //обработчик кнопки на нажатие btn_mnu
    $("#nav-button-label").click(function (e) {
        e.preventDefault();
        $(this).toggleClass('nav-on'); // добавляет класс для анимации самой кнопки
        $(this).next().slideToggle(); // открывает меню main_nav_block, которое было скрыто
        $(this).find('.nav-line').toggleClass('active');
        $(".mnu_dropdown").toggleClass("active");
    });
    // Скрыть элемент при клике за его пределами бутерброд и его выпадающее меню
    $(document).click(function (event) {
        if ($(event.target).closest("#nav-button-label").length) return;
        if ($(event.target).closest("[off-canvas]").length) return;
        $("#nav-button-label").removeClass("nav-on");
        $("#nav-button-label .nav-line").removeClass("active");

        event.stopPropagation();
    });
    //  Отправка форм
    $("form:not('#form3')").submit(function () {
        // перехватываем все при событии отправки

        var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = [];
        form.find('.modal_form_input').each(function () {
            // пробежим по каждому полю в форме

            if ($(this).val() == '') {
                // если находим пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
            } else if ($(this).val() !== '') {
                // если находим не пустое
                $(this).siblings(".modal_input_error").hide("fade", 500);
                $(this).siblings("i").show("fade", 500);
                error.push(false); // нет ошибки
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        form.find('.modal_form_phone').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(\+|d+)*\d[\d\(\)\-]{4,14}\d$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings(".modal_input_error").removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500);
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().show("fade", 500).addClass('input_error_phone').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    $(this).siblings("i").hide("fade", 500);
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        form.find('.modal_form_email').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9\-]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings(".modal_input_error").show("fade", 500);
                $(this).siblings("i").hide("fade", 500);
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings(".modal_input_error").removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings(".modal_input_error").hide("fade", 500).removeClass('input_error_email');
                    $(this).siblings("i").show("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings(".modal_input_error").show("fade", 500).addClass('input_error_email').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    $(this).siblings("i").hide("fade", 500);
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function () {
                $(this).siblings('.modal_input_error').hide("fade", 500);
            });
        });
        var erorr_finish = 0;
        for (var i = 0; i < error.length; i++) {
            if (error[i] == false) {
                erorr_finish = erorr_finish + 1;
            }
            ;
            // console.log(error[i]);
        }
        //console.log(erorr_finish);
        var size = error.length - 1;
        if (erorr_finish > size) {
            // в зависимости от полей которые проверяются (в нашем случае 3 поля)
            var data = form.serialize(); // подготавливаем данные
            // $.ajax({ // инициализируем ajax запрос
            // 	type: 'POST', // отправляем в POST формате, можно GET
            // 	url: 'mail.php', // путь до обработчика, у нас он лежит в той же папке
            // 	dataType: 'json', // ответ ждем в json формате
            // 	data: data, // данные для отправки
            // 	beforeSend: function (data) { // событие до отправки
            // 		form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
            // 	},
            // 	success: function (data) { // событие после удачного обращения к серверу и получения ответа
            // 		if (data['error']) { // если обработчик вернул ошибку
            // 			alert(data['error']); // покажем её текст
            // 		} else { // если все прошло ок
            //
            // 			if (data['form_type'] == 'modal') {
            // 				$('.dm-modal form').hide();
            // 				$('.dm-modal .close').hide();
            // 				form.trigger('reset');
            // 				$('.dm-modal .success_mail').addClass('active'); //пишем что всё ок
            // 				setTimeout(function () {
            // 					form.parents('.popup').hide("fade", 500);
            // 					$('.dm-modal .success_mail').removeClass('active');
            // 					$('.dm-modal .modal_form_input_wrap i').hide();
            // 					$('.dm-modal .close').show("fade", 2000);
            // 					//$("body").css({ "overflow": "inherit", "padding-right": "0" });
            // 				}, 3000);
            // 			}
            // 			if (data['form_type'] == 'normal') { //надо писать в обычных формах <input type="hidden" name="form_type" value="normal">
            // 				form.trigger('reset');
            // 				$('.dm-modal .success_mail').addClass('active');
            // 				$('.popup[data-modal=modal-res]').toggle("fade", 500);
            // 				//$("body").css({ "overflow": "hidden", "padding-right": "17px" });
            // 				setTimeout(function () {
            // 					$('.popup[data-modal=modal-res]').hide("fade", 500);
            // 					$('.dm-modal .success_mail').removeClass('active', 500);
            // 					$('.dm-modal .modal_form_input_wrap i').hide();
            // 					//$("body").css({ "overflow": "inherit", "padding-right": "0" });
            // 				}, 3000);
            // 			}
            // 		}
            // 	},
            // 	error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
            // 		alert(xhr.status); // покажем ответ сервера
            // 		alert(thrownError); // и текст ошибки
            // 	},
            // 	complete: function (data) { // событие после любого исхода
            // 		form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
            // 	}
            //
            // });
        }
        //return false; // вырубаем стандартную отправку формы
    });

    //  Отправка форм с файлом вносим input[type=file]
    var files;
    $('input[type=file]').change(function () {
        files = this.files;
        //alert(files);
    });

    //  Отправка форм с файлом submit
    $("#form3").on('submit', function (e) {
        // перехватываем все при событии отправки
        e.preventDefault();
        var $data = new FormData(),
            form = $(this),
            error = [],
            $inputs = $("#form3").find('input[type=hidden]'),
            $phone = $("#form3").find('input[name=phone]'),
            $email = $("#form3").find('input[name=email]'),
            $name = $("#form3").find('input[name=name]'),
            $textarea = $("#form3").find('textarea');

        $.each(files, function (key, value) {
            if (!this.name.match(/(.txt)|(.pdf)|(.docx)|(.doc)|(.xlsx)$/i)) {
                alert("Неправильный формат тектового файла.");
                return false;
                error.push(true);
            } else if ((this.size / 1024).toFixed(0) > 1524) {
                alert("Слишком большой размер.");
                return false;
                error.push(true);
            }
            $data.append(key, value);
        });

        $.each($inputs, function (key, value) {
            $data.append($(this).attr('name'), $(this).val());
        });

        //добавление основных тестовых полей вместо serialize
        $data.append($textarea.attr('name'), $textarea.val());
        $data.append($phone.attr('name'), $phone.val());
        $data.append($email.attr('name'), $email.val());
        $data.append($name.attr('name'), $name.val());

        form.find('.modal_form_input').each(function () {
            // пробежим по каждому полю в форме

            if ($(this).val() == '') {
                // если находим пустое
                $(this).siblings().show("fade", 500);
                error.push(true); // ошибка
            } else if ($(this).val() !== '') {
                // если находим не пустое
                $(this).siblings().hide("fade", 500);
                error.push(false); // нет ошибки
            }
            $(this).focus(function () {
                $(this).siblings().hide("fade", 500);
            });
        });
        form.find('.modal_form_phone').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(\+|d+)*\d[\d\(\)\-]{4,14}\d$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings().show("fade", 500);
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_phone')) {
                    $(this).siblings().removeClass('input_error_phone').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().hide("fade", 500);
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().show("fade", 500).addClass('input_error_phone').text("").prepend("Введите правильный телефон<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function () {
                $(this).siblings().hide("fade", 500);
            });
        });
        form.find('.modal_form_email').each(function () {
            // пробежим по каждому полю в форме
            var pattern = /^(([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+\.)*([a-zA-Z0-9]|[!#$%\*\/\?\|^\{\}`~&'\+=-_])+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
            if ($(this).val() == '') {
                // если пустое
                $(this).siblings().show("fade", 500);
                error.push(true); // ошибка
                if ($(this).siblings().hasClass('input_error_email')) {
                    $(this).siblings().removeClass('input_error_email').text("").prepend("Заполните поле<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                }
            } else if ($(this).val() !== '') {
                if ($(this).val().match(pattern)) {
                    $(this).siblings().hide("fade", 500).removeClass('input_error_email');
                    error.push(false); // нет ошибок
                } else {
                    $(this).siblings().show("fade", 500).addClass('input_error_email').text("").prepend("Введите правильный Email<div class='modal_error_triangle'></div><div class='modal_error_chest_img'></div>");
                    error.push(true); // ошибка
                }
            }
            $(this).focus(function () {
                $(this).siblings().hide("fade", 500);
            });
        });

        if (files === undefined) {
            $('.fileLoad input').val('Файл не выбран!');
            $('.file-load-block input[type=text]').css('border', '1px solid red');
            error.push(true); // ошибка
        }

        var erorr_finish = 0;

        for (var i = 0; i < error.length; i++) {
            if (error[i] == false) {
                erorr_finish = erorr_finish + 1;
            }

            //console.log(error[i]);
        }
        //console.log(erorr_finish);
        var size = error.length - 1;
        if (erorr_finish > size) {
            // $.ajax({
            // 	url: 'mail.php',
            // 	type: 'POST',
            // 	contentType: false,
            // 	processData: false,
            // 	dataType: 'json',
            // 	data: $data,
            // 	beforeSend: function (loading) {
            // 		$('.fileLoad input').val('Файл загружается');
            // 	},
            // 	success: function (data) {
            // 		$('.dm-modal .success_mail').addClass('active');
            // 		$('.popup2 .close').hide();
            // 		$('.fileLoad input').val('Файл загружен!');
            // 		$('.file-load-block input[type=text]').css('color', '#b2d04e');
            // 		$('.popup[data-modal=modal-res]').show().delay(2000).fadeOut(
            // 			function () {
            // 				$('.popup[data-modal=modal-res]').hide("fade", 500);
            // 				form.trigger('reset');
            // 				$('.dm-modal .sucess_mail').addClass('active');
            // 				$("#win2 .close").trigger('click');
            // 				$('.popup2 .close').show();
            // 				$('.fileLoad input').val('Выберите файл');
            // 				files = undefined;
            // 				$('.file-load-block input[type=text]').css('color', '#fff)');
            // 				$('.file-load-block input[type=text]').css('border', '1px solid #fff');
            // 			}
            // 		);
            // 	}
            // });
        }
    });
});

$(".loader_inner").fadeOut(200);
$(".loader").fadeOut(200);
/*asd*/