$('.themes__').on('themeChanged', function (e) {
    $('.tech__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/tech/${itemAlt}_${e.detail.theme}.png`})
    })
})
