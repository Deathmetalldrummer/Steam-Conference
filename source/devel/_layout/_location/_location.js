$('.themes__').on('themeChanged', function (e) {
    console.log(true, true);
    $('.location__img').each(function (index, item, arr) {
        var itemAlt = $(item).attr('data-src');
        $(item).attr({'src': `./assets/images/location/${itemAlt}_${e.detail.theme}.png`})
    })
});
