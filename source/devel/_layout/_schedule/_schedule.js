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
