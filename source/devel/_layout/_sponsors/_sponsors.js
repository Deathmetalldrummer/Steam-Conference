$('.themes__').on('themeChanged', function (e) {
    $('.sponsors__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/sponsors/${itemAlt}_theme_${e.detail.theme}.png`})
    })
});
