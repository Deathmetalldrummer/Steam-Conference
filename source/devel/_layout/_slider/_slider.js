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
