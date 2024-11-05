
import Product from "./modules/admin/models/product-models.js";

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    const perfumes = [
      {
        uId: "P1",
        name: "Cool water",
        price: 40,
        description: "Cool Water Eau De Toilette for Men",
        image: "/uploads/pf-1.svg",
        offers: [
          { type: 'buy_one_get_one', description: 'Buy one Cool Water and get another one free!' },
          
          {
            type: 'limited_time_discount',
            description: 'Get $10 off when you buy Cool Water between January 1, 2024, and January 31, 2025!',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2025-01-31'),
          },
        ],
      },
      {
        uId: "P2",
        name: "Lataffa",
        price: 80,
        description: "Eau de Parfum",
        image: "/uploads/sp-1.svg",
        offers: [
          { type: 'bulk_purchase_discount', description: 'Buy 3 and get 5$ off!' }
        ],
      },
      {
        uId: "P3",
        name: "CK",
        price: 50,
        description: "Cool Water Eau De Toilette for Men",
        image: "/uploads/sp-2.svg",
        offers: [
          { type: 'combo_discount', description: 'add cool water get $10 discount !)' }
          
        ],
      },
      {
        uId: "P4",
        name: "Armani Code",
        price: 120,
        description: "Cool Water Eau De Toilette for Men",
        image: "/uploads/sp-3.svg",
        offers: [
          { type: 'membership_discount', description: 'Members get 15% off!' },
        ],
      },
      {
        uId: "P5",
        name: "Gucci Bloom",
        price: 100,
        description: "Cool Water Eau De Toilette for Men",
        image: "/uploads/sp-4.svg",
        offers: [
          { type: 'tiered_discount', description: 'Tiered discount for gucci bloon' },
        ],
      },
      {
        uId: "P6",
        name: "Chanel No. 5",
        price: 150,
        description: "Cool Water Eau De Toilette for Men",
        image: "/uploads/sp-5.svg",
        offers: [
          { type: 'seasonal_discount', description: 'cart contain ARMANI CODE get 25% off' },
        ],
      },
    ];


    await Product.insertMany(perfumes);
    console.log("Perfume data seeded successfully!");
  } catch (error) {
    console.error("Error seeding perfume data:", error);
  }
};

export default seedProducts;

