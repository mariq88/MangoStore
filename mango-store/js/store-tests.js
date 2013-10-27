﻿test("Check if return real product",
  function () {
      var product = Object.create(Product);
      product.init("Book", "Book 111", "$32", "color-bg.png", "2111", 2);
      equal(product.productType, "Book", "Expected: " + product.productType);
      equal(product.title, "Book 111", "Expected: " + product.title);
      equal(product.price, "$32", "Expected: " + product.price);
      equal(product.code, "2111", "Expected: " + product.code);
      equal(product.imgSrc, "color-bg.png", "Expected: " + product.imgSrc);
      equal(product.quantity, 2, "Expected: " + product.quantity);
  });
test("Check product introduce",
  function () {
      var product = Object.create(Product);
      product.init("Book", "Book 111", "$32", "color-bg.png", "2111", 2);
      equal(product.introduce(), "Type: " + product.productType +
            ", Name: " + product.title + ", Price: " + product.price + ", ProductCode: " + product.code);
  });
test("Check add product and get product",
  function () {
      var product = Object.create(Product);
      product.init("Book", "Book 111", "$32", "color-bg.png", "2111", 2);
      equal(product.productType, "Book", "Expected: " + product.productType);
      equal(product.title, "Book 111", "Expected: " + product.title);
      equal(product.price, "$32", "Expected: " + product.price);
      equal(product.code, "2111", "Expected: " + product.code);
      equal(product.imgSrc, "color-bg.png", "Expected: " + product.imgSrc);
      equal(product.quantity, 2, "Expected: " + product.quantity);
      var repo = ProductRepository;
      repo.AddProduct(product);
      var actual = repo.GetProductsByCategory("Book");
      equal(actual[actual.length-1], product);
  });

//Categoeries
test("Check AddNewCategory()",
  function () {
      var product = Object.create(Product);
      product.init("Mp3", "Song 111", "$32", "color-bg.png", "2111", 2);
      var repo = ProductRepository;
      repo.AddNewCategory("Mp3");
      repo.AddProduct(product);
      var actualProduct = repo.GetProductsByCategory("Mp3");
      equal(actualProduct[0].title, product.title);
  });
test("Check GetProductByCategory()",
  function () {
      var repo = ProductRepository;
      repo.AddNewCategory("Songs");
      var array = repo.GetCategories();
      equal(array[array.length - 1], "Songs");
  });
test("Check GetAll()",
  function () {
      var repo = ProductRepository;
      var actual = repo.GetProductsByCategory("Movie");
      equal(actual.length, 15);
      var product = Object.create(Product);
      product.init("Movie", "Book 111", "$32", "color-bg.png", "2111", 2);
      repo.AddProduct(product);
      actual = repo.GetProductsByCategory("Movie");
      equal(actual.length, 16);
  });
//Cart tests
test("Check AddProduct()",
  function () {
      //I need code which is valid
      //that means a real code in the products
      //only if the code already exis, can be added to cart
      var realCodeFromProducts = 10070;
      CartRepository.AddProduct(realCodeFromProducts);
      var cart = CartRepository.GetCart();
      equal(cart.length, 1);

      realCodeFromProducts = 10060;
      CartRepository.AddProduct(realCodeFromProducts);
      cart = CartRepository.GetCart();
      equal(cart.length, 2);
  });
test("Check cart.Empty()",
  function () {
      var realCodeFromProducts = 10070;
      CartRepository.AddProduct(realCodeFromProducts);
      CartRepository.Empty();
      var cart = CartRepository.GetCart();
      equal(cart.length, 0);
  });

test("Check GetCount()",
  function () {
      CartRepository.Empty();
      var realCodeFromProducts = 10070;
      CartRepository.AddProduct(realCodeFromProducts);
      var cart = CartRepository.GetCart();
      equal(cart.length, 1);

      realCodeFromProducts = 10060;
      CartRepository.AddProduct(realCodeFromProducts);
      cart = CartRepository.GetCart();
      equal(cart.length, CartRepository.GetCount());
  });
test("Check GetTotalAmount()",
  function () {
      CartRepository.Empty();
      var realCodeFromProducts = 10010;
      CartRepository.AddProduct(realCodeFromProducts);
      realCodeFromProducts = 10060;
      CartRepository.AddProduct(realCodeFromProducts);

      equal(CartRepository.GetTotalAmount(), 78);
  });
test("Check DeleteProduct()",
  function () {
      CartRepository.Empty();
      var realCodeFromProducts = 10060;
      CartRepository.AddProduct(realCodeFromProducts);
      CartRepository.DeleteProduct(10060);

      equal(CartRepository.GetCount(), 0);
  });