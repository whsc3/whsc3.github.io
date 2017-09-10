var router = new Navigo(null, true, '#!');
var lastLinks = null;
$(document).ready(function () {
	$('.button-collapse').sideNav();
	router.updatePageLinks();
	router.on({
		'/members/:member': function (params) {
			var url = params.member.toLowerCase().replace(' ','-');
			$('#content').prop('src', 'members/'+url+'/');
			activateLink($('.membersLink'));
		},
		'/members': function () {
			$('#content').prop('src', 'members.html');
			activateLink($('.membersLink'));
		},
		'/calendar': function () {
			$('#content').prop('src', "https://calendar.google.com/calendar/embed?src=klj62f1o13da1h97n8p5oipom4%40group.calendar.google.com&ctz=America/Los_Angeles");
			activateLink($('.calendarLink'));
		},
		'/home': function () {
			$('#content').prop('src', 'home.html');
			activateLink($('.homeLink'));
		},
		'/training': function () {
			$('#content').prop('src', 'training.html');
			activateLink($('.trainingLink'));
		},
		'/about': function () {
			$('#content').prop('src', 'about.html');
			activateLink($('.aboutLink'));
		},
		'': function () {
			router.navigate('/home');
		}
	}).resolve();
	router.notFound(function () {
		alert('The page '+window.location.href+' was not found.\nTaking you back to home');
		router.navigate('/home');
	});
	$(window).on('message', function(evt) {
		try {
			var member = JSON.parse(evt.originalEvent.data);
			router.navigate('/members/'+member.whsmember);
		}
		catch (e) {}
	});
});
function activateLink(newLinks) {
	if(lastLinks) {
		lastLinks.removeClass('active');
	}
	lastLinks = newLinks;
	lastLinks.addClass('active');
}
