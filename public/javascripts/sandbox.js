$(document).ready(function(){
	$('a.subset').hide();

	$('a.test').click(function(){
		$(this).next('a.subset').show();
	});
});