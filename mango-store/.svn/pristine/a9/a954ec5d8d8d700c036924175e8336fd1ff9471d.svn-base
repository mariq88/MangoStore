var urlManager = $.sammy(function() {
	this.element_selector = "#container-wrap";

	this.get("#/home", function() {
		pageManager.home();
	});

	this.get("#/products", function() {
		pageManager.products();
	});

	this.get("#/categories", function() {
		pageManager.categories();
	});

	this.get("#/categories/:category", function() {
		pageManager.byCategory(this.params['category']);
	});

	this.get("#/checkout", function() {
		pageManager.checkOut();
	});

	this.get("#/products/:id", function() {
		pageManager.product(this.params['id']);
	})
});

var searchRequestManager = $.sammy(function() {
	this.element_selector = "#sidebar";

	this.get("#/search", function() {
		pageManager.search(this.params['query']);
		return false;
	});
})