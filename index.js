


$('.themes__').on('click', function(e) {
	var target = $(e.target);
	var indexTheme = target.data('theme');
	console.log($('body').attr('data-theme'));
	$('body')
		.removeClass('theme_' + $('body').attr('data-theme'))
		.attr('data-theme', indexTheme)
		.addClass('theme_' + indexTheme);
	this.dispatchEvent(new CustomEvent('themeChanged', {detail: {theme: indexTheme}}));
});










$('.themes__').on('themeChanged', function (e) {
    $('.tech__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/tech/${itemAlt}_${e.detail.theme}.png`})
    })
})





$('.slider__navButton').on('click', function (e) {
    if ($(this).hasClass('slider__navButton_left')) {
        sliderMove(-1);
    }
    if ($(this).hasClass('slider__navButton_right')) {
        sliderMove(1)
    }
});

function sliderMove(direction) {
    const slider__lists = $('.slider__lists');
    const slider__list_active = $('.slider__list_active');
    let elem;
    let duration = 0;
    let infinity = true;
    let infinityDirection;
    switch (direction) {
        case 1:
            elem = slider__list_active.next();
            break;
        case -1:
            elem = slider__list_active.prev();
            break;
        default:
            elem = null;
            break;
    }

    if (infinity && elem && elem.length === 0) {
        switch (slider__list_active.index()) {
            case 0:
                infinityDirection = 'last';
                break;
            case (slider__lists.children().length - 1):
                infinityDirection = 'first';
                break;
            default:
                infinityDirection = null;
                break;
        }

        elem = slider__lists.children()[infinityDirection]();
    }

    if (elem && elem.length) {
        duration = (slider__list_active.children().length + 1) * 100;

        moveToEnd(slider__list_active.children(), direction);

        setTimeout(() => {
            slider__list_active.removeClass('slider__list_active');
            elem.addClass('slider__list_active');

            move(elem.children(), direction);
        }, duration);
    }
}

function moveToStart(el, direction) {
    $(el).css({
        transitionDuration: "0s",
        transform: `translateX(${-70 * direction}vw)`,
    });
}
function moveToEnd(el, direction) {
    el.css({
        transitionDuration: "0.3s",
    });

    el.each((index, item) => {
        const _direction = direction === -1 ? (index + 1) : (el.length - index);

        setTimeout(() => {
            $(item).css({
                transitionDuration: "0.3s",
                transform: `translateX(${70 * direction}vw)`,
            });
        }, _direction * 100);
    });
}
function move(el, direction) {
    moveToStart(el, direction);

    el.each((index, item) => {
        const _direction = direction === -1 ? (index + 1) : (el.length - index);

        setTimeout(() => {
            $(item).css({
                transitionDuration: "0.3s",
                transform: "translateX(0)",
            });
        }, _direction * 100);
    });
}



class Schedule {
    throttling = true;
    duration = 500;
    direction = 1;
    infinity = true;
    interval = 1000;
    intervalID;
    startInterval;
    remaining;

    // nav
    schedule__nav = $('.schedule__nav');
    schedule__navItem_active = $('.schedule__navItem_active');
    schedule__navItem_activeIndex = this.schedule__navItem_active.index();
    schedule__navItem_this = this.schedule__navItem_active.next();
    schedule__navItem_thisIndex = this.schedule__navItem_this.index();

    // content
    schedule__main = $('.schedule__main');
    schedule__main_this = this.schedule__navItem_thisIndex && $(this.schedule__main.children()[this.schedule__navItem_thisIndex]);
    schedule__mainList_active = $('.schedule__mainList_active');

    constructor() {
        const _this = this;
        $('.schedule__navItem').on('click', function (e) {
            if(_this.throttling) {
                _this.throttling = false;

                _this.schedule__navItem_this = $(this);
                _this.schedule__navItem_thisIndex = _this.schedule__navItem_this.index();
                _this.schedule__navItem_active = $('.schedule__navItem_active');
                _this.schedule__navItem_activeIndex = _this.schedule__navItem_active.index();

                _this.schedule__main_this = $(_this.schedule__main.children()[_this.schedule__navItem_thisIndex]);
                _this.schedule__mainList_active = $('.schedule__mainList_active');

                // _this.scheduleToggleClass();
                _this.getDirection();

                setTimeout(()=>{_this.throttling = true}, _this.duration);
            }
        });
        window.addEventListener('resize', function () {
            console.log('resize');
        });
        this.mainHeight();

        // $('.schedule').on('mouseenter', function () {
        //     console.log('mouseenter');
        //     _this.pause();
        // });
        // $('.schedule').on('mouseleave', function () {
        //     console.log('mouseleave');
        //     _this.play();
        // });
        // this.autoplay();
    }

    scheduleToggleClass() {
        this.schedule__navItem_this.siblings().removeClass('schedule__navItem_active');
        this.schedule__navItem_this.addClass('schedule__navItem_active');

        this.schedule__main_this.siblings().removeClass('schedule__mainList_active');
        this.schedule__main_this.addClass('schedule__mainList_active');
    }
    getDirection() {
        let direction = this.schedule__navItem_thisIndex - this.schedule__navItem_activeIndex;

        if ( direction < 0 ) {
            this.direction = -1;
            // console.log('left');
        }
        if ( direction > 0 ) {
            this.direction = 1;
            // console.log('right');
        }
        if ( direction === 0 ) {
            this.direction = 0;
            // console.log('none');
        }
        this.move();

    }
    mainHeight() {
        let arr = [];
        let main = $('.schedule__main');
        main.children().each((index, item) => {
            arr.push($(item).outerHeight());
        });
        main.height(Math.max(...arr));
    }

    move() {
        let prev = this.schedule__mainList_active;
        let next = this.schedule__main_this;

        next.css({
            display: 'block',
            transitionDuration: "0",
            right: `${-this.direction * 100}%`,
            left: `${this.direction * 100}%`,
        });
        prev.css({
            display: 'block',
            transitionDuration: "0",
            right: `0`,
            left: `0`,
        });
        setTimeout(()=>{prev.removeAttr('style')}, this.interval);

        setTimeout(()=>{
            next.css({
                transitionDuration: `${this.duration / 1000}s`,
                right: `0`,
                left: `0`,
            });
            prev.css({
                transitionDuration: `${this.duration / 1000}s`,
                right: `${this.direction * 100}%`,
                left: `${-this.direction * 100}%`,
            });
            this.scheduleToggleClass();
        }, 0);
    }

    autoplay() {
        this.direction = 1;
        clearInterval(this.intervalID);
        this.intervalID = setInterval(()=>{
            this.startInterval = Date.now();
            this.autoplayAction();
        }, this.interval);
    }
    play() {
        if (this.remaining) {
            setTimeout(()=>{
                this.autoplayAction();
                this.autoplay();
            }, this.remaining);
            this.remaining = null;
        }
    }
    pause() {
        if (!this.remaining) {
            this.remaining = !this.startInterval ? this.interval : this.interval - (Date.now() - this.startInterval);
            clearInterval(this.intervalID);
        }
    }
    autoplayAction() {
        this.schedule__navItem_active = $('.schedule__navItem_active');
        this.schedule__navItem_activeIndex = this.schedule__navItem_active.index();
        this.schedule__navItem_this = this.schedule__navItem_active.next().length ? this.schedule__navItem_active.next() : this.schedule__nav.children().first();
        this.schedule__navItem_thisIndex = this.schedule__navItem_this.index();

        this.schedule__mainList_active = $('.schedule__mainList_active');
        this.schedule__main_this = $(this.schedule__main.children()[this.schedule__navItem_thisIndex]);

        this.getDirection();
    }
}
new Schedule();

$('.themes__').on('themeChanged', function (e) {
    $('.sponsors__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/sponsors/${itemAlt}_theme_${e.detail.theme}.png`})
    })
});

$('.themes__').on('themeChanged', function (e) {
    $('.location__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/location/${itemAlt}_${e.detail.theme}.png`})
    })
});


