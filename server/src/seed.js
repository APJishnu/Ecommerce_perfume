// seeders/perfume-seeder.js

import Product from "./modules/admin/models/product-models.js";


// Define the seeder function
const seedProducts = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();

    // Define the perfume data
    const perfumes = [
      {
        name: 'Cool water',
        price: 40,
        description:"Cool Water Eau De Toilette for Men",
        image: '/uploads/pf-1.svg',
      },
      {
        name: 'Lataffa',
        price: 80,
        description:"Eau de Parfum",
        image: '/uploads/sp-1.svg',
      },
      {
        name: 'CK',
        price: 50,
        description:"Cool Water Eau De Toilette for Men",
        image: '/uploads/sp-2.svg',
      },
      {
        name: 'Armani Code',
        price: 120,
        description:"Cool Water Eau De Toilette for Men",
        image: '/uploads/sp-3.svg',
      },
      {
        name: 'Gucci Bloom',
        price: 100,
        description:"Cool Water Eau De Toilette for Men",
        image: '/uploads/sp-4.svg',
      },
      {
        name: 'Chanel No. 5',
        price: 150,
        description:"Cool Water Eau De Toilette for Men",
        image: '/uploads/sp-5.svg',
      },
    ];

    // Insert the new perfumes
    await Product.insertMany(perfumes);
    console.log('Perfume data seeded successfully!');
   
  } catch (error) {
    console.error('Error seeding perfume data:', error);

  }
};

// Call the seeder function
export default seedProducts;