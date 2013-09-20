app = Ember.Application.create();

app.Router.map(function() {

	this.resource('login', { path: '/' });
	this.resource('stocks');

	this.resource('news');
	this.resource('article', { path: ':article_id' });

	this.resource('settings');
});

app.NewsRoute = Ember.Route.extend({
	model: function () {
		return articles;
	}
});

var articles = [{
	id: '1',
	title: 'Example News Title',
	author: { name: "Matt Flinn" },
	date: new Date('12-25-2012'),
	excerpt: '',
	body: 'awdawdawdawdawdawdawd'
}, {
	id: '2',
	title: 'Another News Article',
	author: { name: "Someone Else" },
	date: new Date('7-15-2012'),
	excerpt: '',
	body: 'awdawdawdawdawdawdawdawd'
}];