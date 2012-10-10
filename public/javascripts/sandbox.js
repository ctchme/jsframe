$(document).ready(function(){
	$('nav.subset').hide();

	$('a.test').click(function(){
		$(this).next('nav.subset').slideToggle(300);
		//$(this).text('testing');
	})
})