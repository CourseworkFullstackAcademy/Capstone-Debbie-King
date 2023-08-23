const BASE_URL = 'https://fakestoreapi.com'

//PRODUCT FETCHES::
//Get ALL Products
export const getProducts = async () => {
	const response = await fetch(`${BASE_URL}/products`);
	const data = await response.json();
	return data;
  };

//Get SINGLE Product by ID
  export const getProductById = async (productId) => {
	const response = await fetch(`${BASE_URL}/products/${productId}`);
	const data = await response.json();
	return data;
  };

  //Limit results to variable
  export const limitResults = async (number) => {
	try {
		const response = await fetch(`${BASE_URL}/products?limit=${number}`);
		const data = await response.json();
		console.log(data);
		return data;
  } catch (error) {
    console.error('Error fetching limited results:', error);
  }
};

//Sort results by price
export const sortPriceResults = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products`);
		const data = await response.json();
		const sortedProductsByPrice = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		console.log(sortedProductsByPrice);
		return sortedProductsByPrice;
		} catch (error) {
		console.log('Error fetching data: ', error);
	}
}

//Get ALL CATEGORIES
export const getCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products/categories`);
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log('Error fetching categories: '. error);
	}
}

//Get products in a Specific category.  Need to add use limit(Number) and sort(asc|desc) as a query string to get your ideal results
export const getItemsInCategories = async (category) => {
	try {
		const response = await fetch(`${BASE_URL}/products/category/${category}`);
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error fetching items in ${category}: `. error);
	}
}

//Add NEW PRODUCT. nothing in real will insert into the database. so if you want to access the new id you will get a 404 error.
export const addNewProduct = async () => {
	try {
		const response = await fetch(`${BASE_URL}/products`,{
			method:"POST",
			body:JSON.stringify(
				{
					title:"title",
					price: "price",
					description: 'description',
					image: 'imgUrl',
					category: "category",
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error adding product: `. error);
	}
}

//UPDATE a product
export const updateProduct = async (productId) => {
	try {
		const response = await fetch(`${BASE_URL}/products/${productId}`,{
			method:"PUT",
			body:JSON.stringify(
				{
					title:"title",
					price: "price",
					description: 'description',
					image: 'imgUrl',
					category: "category",
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error updating product: `. error);
	}
}

//DELETE product
export const deleteProduct = async (productId) => {
	try {
		const response = await fetch(`${BASE_URL}/products/${productId}`,{
			method:"DELETE",
			body:JSON.stringify(
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error deleting product: `. error);
	}
}

//CART FETCHES::
//GET ALL carts
export const getCarts = async () => {
	const response = await fetch(`${BASE_URL}/carts`);
	const data = await response.json();
	return data;
  };

  //GET single cart by cart ID
  export const getSingleCart = async (cartId) => {
	const response = await fetch(`${BASE_URL}/carts/${cartId}`);
	const data = await response.json();
	return data;
  };

  //GET all carts for a single user
  export const getUserCarts = async (userId) => {
	const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
	const data = await response.json();
	return data;
  };

  //ADD a new product to a cart
  export const addToCart = async () => {
	try {
		const response = await fetch(`${BASE_URL}/carts`,{
			method:"POST",
			body:JSON.stringify(
				{
					userdD:"userId",
					date: "date",
					products:"products"
				}
			)
		});
		const data = await response.json();
		console.log(data);
		return data;
	}catch (error) {
		console.log(`Error products to cart: `. error);
	}
}