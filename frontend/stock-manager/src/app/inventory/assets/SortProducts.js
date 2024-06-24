const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];
  
    switch (sortBy) {
      case 'priceLowest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighest':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'stockLowest':
        sortedProducts.sort((a, b) => a.quantity- b.quantity);
        break;
      case 'stockHighest':
        sortedProducts.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'nameAZ':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  
    return sortedProducts;
  };
  
  export default sortProducts;