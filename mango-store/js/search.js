var searchEngine = new function () {
	function getProductsMatching(query) {
		query = query.toLowerCase();
		var result = [];
		var allProducts = ProductRepository.GetAll();
	
		for (var i = 0; i < allProducts.length; ++i) {
			if (allProducts[i].title.toLowerCase().indexOf(query) != -1) {
				result.push(allProducts[i]);
			}
		}
		return result;
	}
	
	return {
		getMatching: getProductsMatching
	}
}



