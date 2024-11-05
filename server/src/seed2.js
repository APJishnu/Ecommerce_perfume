
import Order from "./modules/user/models/order-models.js";

const seedOrderDetails = async () => {
  try {
    await Order.deleteMany();

    const orderDetails = [
      {
        user: "672a193e2a909cd21e998371",
        products: [
          { item: '672a1263f8885e0a6173b893', status: true ,date:new Date()},
          { item: '672a1263f8885e0a6173b893', status: true ,date:new Date()},
          { item: '672a1263f8885e0a6173b893', status: true ,date:new Date() },
          { item: '672a1263f8885e0a6173b893', status: true ,date:new Date()},
          { item: '672a1263f8885e0a6173b893', status: true ,date:new Date()},
          
        ],
      },
      {
        user: "6728b3496c3ad3791b3009b2",
        products: [
          { item: '672a1263f8885e0a6173b893', status: true,date:new Date() },
          
        ],
      },
      
      
    ];


    await Order.insertMany(orderDetails);
    console.log("Order data seeded successfully!");
  } catch (error) {
    console.error("Error seeding Order data:", error);
  }
};

export default seedOrderDetails;

