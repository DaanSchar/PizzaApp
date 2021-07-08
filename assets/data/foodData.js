const foodData = [

  // Pizza's
  {
    id: '101',
    title: 'Primavera Pizza',
    rating: '5.0',
    price: '0',
    sizeOptions: { "Small" : '7.50', "Medium" : '8.50' , "Large" : '9.50' },
    pricePerSize: ['7.50', '8.20', '8.90'],
    category: 'Pizza'
  },

  {
    id: '102',
    title: 'Vegetarian Pizza',
    rating: '4.0',
    price: '0',
    sizeOptions: { "Small" : '7.50', "Medium" : '8.50' , "Large" : '9.50' },
    category: 'Pizza'
  },

  // Seafood
  {
    id: '201',
    title: 'Scallop',
    weight: '340 gr',
    rating: '4.1',
    price: '0',
    sizeOptions: { "Medium" : '8.50' },
    category: 'Seafood'
  },
  {
    id: '202',
    title: 'Shrimps',
    weight: '450 gr',
    rating: '3.7',
    price: '0',
    sizeOptions: { "Medium" : '8.50' },
    category: 'Seafood'
  },

  // Drinks
  {
    id: '301',
    title: 'Coca Cola',
    price: '0',
    sizeOptions: { "Small" : '7.50', "Medium" : '8.50' , "Large" : '9.50' },
    rating: '4.0',
    category: 'Drinks'
  },
  {
    id: '302',
    title: 'Coca Cola Light',
    sizeOptions: { "Small" : '7.50', "Medium" : '8.50' , "Large" : '9.50' },
    price: '0',
    rating: '4.0',
    category: 'Drinks'
  },

];

export default foodData;
