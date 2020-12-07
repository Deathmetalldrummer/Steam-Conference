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
