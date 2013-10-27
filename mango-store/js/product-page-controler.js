var productPageControler = (function() {
	var itemsOnPage = 12;
	var self = this;
	
	function render(items, isCategory) {
		self.items = items;
		self.isCategory = isCategory | false;
		self.lastSelected = 1;
		self.numberOfPages = Math.ceil(items.length / 12);
		renderPage(1);
	}
	
	function addButtons() {
		var nextButton = document.createElement("button");
		var prevButton = document.createElement("button");
		
		nextButton.innerHTML = "Next page";
		nextButton.id = "next-page-button";
		
		prevButton.innerHTML = "Previous page";
		prevButton.id = "previous-page-button";
		
		$("#container").append(prevButton);
		$("#container").append(nextButton);
		
		$("#next-page-button").on("click", nextPage);
		$("#previous-page-button").on("click", previousPage);
	}
	
	function nextPage() {
		if (self.lastSelected + 1 <= self.numberOfPages) {
			self.lastSelected += 1;
			renderPage(self.lastSelected);
		}
	}
	
	function previousPage() {
		if (self.lastSelected - 1 > 0) {
			self.lastSelected -= 1;
			renderPage(self.lastSelected);
		}
	}
	
	function showDropdown() {
		var pageDropdown = document.createElement("select");
		pageDropdown.id = "page-selector";
		
		for (var i = 0; i < self.numberOfPages; ++i) {
			var pageOption = document.createElement("option");
			pageOption.innerHTML = i + 1;
			pageOption.value = i + 1;
			pageDropdown.appendChild(pageOption);
		}
		
		pageDropdown[self.lastSelected - 1].id = 'selected';
		pageDropdown[self.lastSelected - 1].disabled = true;
		pageDropdown[self.lastSelected - 1].selected = true;
		
		var pageBar = document.createElement('p');
		pageBar.innerText = "Choose a page:";
		pageBar.style.display = "inline-block";
		pageBar.style.padding = '2px';
		pageBar.appendChild(pageDropdown);
		
		$("#container").append(pageBar);
		$("#page-selector").on("change", changePage);
	}
	
	function renderPage(pageNumber) {
		var startIndex = (pageNumber - 1) * 12;
		if (self.isCategory) {
			elementRenderer.RenderCategories(self.items, itemsOnPage, startIndex);
		}
		else {
			elementRenderer.Render(self.items, itemsOnPage, startIndex);
		}
		
		if (self.numberOfPages > 1) {
			showDropdown();
			addButtons();
		}
	}
	
	function changePage() {
		var selected = this[this.selectedIndex].value;
		self.lastSelected = parseInt(selected);
		renderPage(parseInt(selected));
	}
	
	return {
		render: render,
	}
})();