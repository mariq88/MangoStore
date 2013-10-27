var pageManager = (function() {
	this.updateCartCount = function() {
		var count = sessionStorage.getObject('itemsCount');
		if (count) {
			$(".cart").html("Items: " + count);
		}
	}

	this.updateMenu = function(index) {
		var menuItems = $("#menu ul li");
		for (var i = 0, l = menuItems.length - 1; i < l; i += 1) {
			menuItems.eq(i).removeClass("current");
		}

		menuItems.eq(index).addClass('current');
	}

	this.homeView = (function() {
		this.createSlider = function() {
			var allProducts = ProductRepository.GetAll();
			var sliderFrame = $("<div></div>");
			sliderFrame.attr("id", "sliderFrame");
			sliderFrame.addClass("clearfix");
			$('.front-div').hide();

			var slider = $("<div></div>");
			slider.attr("id", "slider");
			var thumbs = $("<div></div>");
			thumbs.attr("id", "thumbs");
			thumbs.addClass("clearfix");
			for (var i = 0; i < 5; i+=1) {
				var img = $("<img/>");
				var randIndex = Math.floor(Math.random() * allProducts.length);
				img.attr("src", allProducts[randIndex].imgSrc);
				slider.append(img);

				var thumb = $("<div></div>");
				thumb.addClass("thumb");
				var frame = $("<div></div>");
				frame.addClass("frame");
				var thumbContent = $("<div></div>");
				thumbContent.addClass("thumb-content");
				thumbContent.addClass("clearfix");
				var a = $("<a href='#'>" + allProducts[randIndex].title + "</a>");
				thumbContent.append(a);
				frame.append(img.clone());
				thumb.append(frame);
				thumb.append(thumbContent);
				thumbs.append(thumb);
			}
			sliderFrame.append(slider);
			sliderFrame.append(thumbs);
			var container = $("#container");
			container.append(sliderFrame);
			var loremDiv = $("<div></div>");
			loremDiv.addClass("lorem-div");
			loremDiv.html("<br/><h2>Lorem ipsum</h2><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" + 
							"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," + 
							"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo" + 
							"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse" + 
							"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non" +
							"proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>");
			container.append(loremDiv);
		}

		this.render = function() {
			updateCartCount();
			updateMenu(0);
			var container = $("#container");
			container.fadeOut(200);
			container.promise().done(function() { 
				container.empty();
				container.append($("<h3>Random 5 entries:</h3>"));
				createSlider();
				container.show();
				imageSlider.reload();
			});
		}

		return {
			render : render
		}
	})();

	this.productsView = (function() {
		this.render = function() {
			updateCartCount();
			var container = $("#container");
			container.fadeOut(200, function() {
				updateMenu(1);
				$("#container").empty();
				var allProducts = ProductRepository.GetAll();
				productPageControler.render(allProducts);
				container.show();
			});
		}

		return {
			render : render
		}
	})();

	this.productView = (function () {
		this.render = function(id) {
			updateCartCount();
			var  container = $("#container");
			container.fadeOut(200, function() { 
				container.empty();
				var allProducts = ProductRepository.GetAll();
				var product;
				for (var i = 0, l = allProducts.length; i < l; i+=1) {
					if (allProducts[i].code == id) {
						product = allProducts[i];
					}
				}
				container.append("<h3>" + product.title + "</h3>");
				var img = $("<img>");
				img.attr("src", product.imgSrc);
				container.append(img);
				container.append("<h4>Category: " + product.productType + "</h4>");
				container.append("<h4>Price: " + product.price + " $</h4>");
				var cartButton = $("<a></a>");
				cartButton.addClass("btn");
				cartButton.text("Add to cart");
				cartButton.attr("id", product.code);
				container.append(cartButton);
				$(".btn").click(function () {
	                CartRepository.AddProduct(this['id']);
					//get the name of the book
					var item = $(this).parent().find(">:first-child").html();
					//check the key of session storage if it's already used
					$(".cart").html("Items: " + CartRepository.GetCount());	
				});		
				container.show();
			});
		}

		return {
			render : render
		}
	})();

	this.categoriesView = (function () {
	    this.render = function () {
			updateCartCount();
			updateMenu(2);
	        var container = $("#container");
	        container.fadeOut(200, function () {
	            $("#container").empty();
	            var allCategories = ProductRepository.GetCategories();
	            productPageControler.render(allCategories, true);
	            container.show();
	        });
	    }

	    return {
	        render: render
	    }
	   
	})();

	
	this.searchView = (function() {
		this.render = function(query) {
			updateCartCount();
			var container = $("#container");
			container.fadeOut(200, function() {
				container.empty();
				var searchResult = searchEngine.getMatching(query);
				if (searchResult.length > 0) {
					productPageControler.render(searchResult);
				}
				else {
					container.append("<h3>No results found.</h3>");
				}
				container.show();
			});
		}
		
		return {
			render: render
		}
	})();

	this.byCategoryView = (function() {
		this.render = function(category) {
			updateCartCount();
			var container = $("#container");
			container.fadeOut(200, function() {
				container.empty();
				var categoryItems = ProductRepository.GetProductsByCategory(category);
				productPageControler.render(categoryItems);
				container.show();
			});
		}

		return {
			render : render
		}
	})();

	this.checkoutView = (function() {
		this.render = function() {
			updateCartCount();
			var container = $("#container");
			container.fadeOut(200, function() {
				container.empty();
				var cartItems = CartRepository.GetCart();
				if (cartItems.length > 0) {
					var table = $("<table></table>");
					var sum = 0;
					table.append("<thead><tr><th>Name</th><th>Price</th><th>Quantity</th></tr></thead>");
					for (var i = 0, l = cartItems.length; i < l; i+=1) {
						var row = $("<tr></tr>");
						row.append("<td>" + cartItems[i].title + "</td>");
						row.append("<td>" + cartItems[i].price + " $</td>");
						row.append("<td>" + cartItems[i].boughtQuantity + "</td>");
						sum += cartItems[i].boughtQuantity * cartItems[i].price;
						table.append(row);
					}
					table.append("<tr><td colspan='3'>Total price: " + sum + " $</td></tr>"); 
					container.append(table);
				} else {
					container.append("<h3>No products in cart.</h3>")
				}
				container.show();
			});
		}

		return {
			render : render
		}
	})();

	return {
		home : homeView.render,
		products: productsView.render,
		categories: categoriesView.render,
		byCategory : byCategoryView.render,
		search: searchView.render,
		checkOut : checkoutView.render,
		product : productView.render
	}
})();

