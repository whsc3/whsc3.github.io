var router = new Navigo(null, true, '#!');
var lastLinks = null;
$(document).ready(function () {
	$('.button-collapse').sideNav();
	router.updatePageLinks();
	router.on({
		'/members/:member': function (params) {
			var url = params.member.toLowerCase().replace(' ','-');
			$('#content').prop('src', 'members/'+url);
			activateLink($('.membersLink'));
		},
		'/members': function () {
			$('#content').prop('src', 'members.html');
			activateLink($('.membersLink'));
		},
		'/home': function () {
			$('#content').prop('src', 'home.html');
			activateLink($('.homeLink'));
		},
		'/about': function () {
			$('#content').prop('src', 'about.html');
			activateLink($('.aboutLink'));
		}
	}).resolve();
	router.notFound(function () {
		alert('The page '+window.location.href+' was not found.\nTaking you back to '+router.lastRouteResolved().url);
		router.navigate(router.lastRouteResolved().url);
	});
	$(window).on('message', function(evt) {
		router.navigate('/members/'+evt.originalEvent.data);
	});
});
function activateLink(newLinks) {
	if(lastLinks) {
		lastLinks.removeClass('active');
	}
	lastLinks = newLinks;
	lastLinks.addClass('active');
}
