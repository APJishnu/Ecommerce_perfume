
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['buy_one_get_one', 'discount', 'free_shipping', 'limited_time_offer', 'seasonal_sale', 'membership_discount', 'bulk_purchase_discount', 'loyalty_points', 'gift_with_purchase', 'clearance_sale'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  uId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  offers: [offerSchema], // Adding offers field
});

const Product = mongoose.model('Product', productSchema);

export default Product;




if (userCart) {
    let proExist = userCart.products.find((products) =>
      products.item.equals(productId)
    );
  
    if (proExist) {
      await Cart.updateOne(
        { user: userId, "products.item": productId },
        { $inc: { "products.$.quantity": 1 } }
      );
    } else {
      await Cart.updateOne(
        { user: userId },
        { $push: { products: { item: productId, quantity: 1 } } }
      );
    }
  
    userCart = await Cart.findOne({ user: userId });
    return userCart;
  } else {
    await Cart.insertMany({
      user: userId,
      products: [{ item: productId, quantity: 1 }],
    });
    userCart = await Cart.findOne({ user: userId });
    return userCart;
  }
  } catch (error) {
  console.error("Error adding to cart:", error);
  throw error;
  }
  
  
  if (!userCart) {
    return { message: "Cart not found" };
  }
  
  console.log(userCart);
  return userCart;
  } catch (error) {
  console.error("Error fetching cart:", error);
  throw error;
  }
  
  
  
  import Cart from './models/cart-model.js'; 
  import Product from './modules/admin/models/product-models.js'; 
  
  class CartRepository {
    async addToCart(cartDetails) {
      const { userId, productId } = cartDetails;
      try {
        let userCart = await Cart.findOne({ user: userId });
  
        if (userCart) {
          let proExist = userCart.products.find((products) =>
            products.item.equals(productId)
          );
  
          if (proExist) {
            await Cart.updateOne(
              { user: userId, "products.item": productId },
              { $inc: { "products.$.quantity": 1 } }
            );
          } else {
            await Cart.updateOne(
              { user: userId },
              { $push: { products: { item: productId, quantity: 1 } } }
            );
          }
  
          userCart = await Cart.findOne({ user: userId });
          return userCart;
        } else {
          await Cart.insertMany({
            user: userId,
            products: [{ item: productId, quantity: 1 }],
          });
          userCart = await Cart.findOne({ user: userId });
          return userCart;
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
      }
    }
  
    async getCart(userId) {
      try {
        const userCart = await Cart.findOne({ user: userId }).populate({
          path: 'products.item',
          model: 'Product',
        });
  
        if (!userCart) {
          return { message: "Cart not found" };
        }
  
        const totalDetails = await this.calculateTotalWithOffers(userCart);
        return { cart: userCart, ...totalDetails };
      } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
      }
    }
  
    async calculateTotalWithOffers(userCart) {
      let totalPrice = 0;
      let offersApplied = [];
  
      for (const product of userCart.products) {
        const productData = product.item;
        const quantity = product.quantity;
  
        totalPrice += productData.price * quantity;
  
        if (productData.offers && productData.offers.length > 0) {
          for (const offer of productData.offers) {
            if (offer.type === 'buy_one_get_one' && quantity >= 2) {
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: Math.floor(quantity / 2) * productData.price 
              });
            } else if (offer.type === 'bulk_purchase_discount' && quantity >= 3) {
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: 5 
              });
            } else if (offer.type === 'membership_discount') {
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: (15 / 100) * (productData.price * quantity) 
              });
            }
          }
        }
      }
  
      const totalDiscount = offersApplied.reduce((acc, offer) => acc + offer.discount, 0);
      const finalPrice = totalPrice - totalDiscount;
  
      return {
        totalPrice,
        totalDiscount,
        finalPrice,
        offersApplied
      };
    }
  }
  
  export default new CartRepository();

  const productId = '6729c02b9e1a0b68a487c2b0'; 
  const productExists = await Product.findById(productId);
  console.log(productExists);


  async getCart(userId) {
    try {
        const userCart = await Cart.findOne({ user: userId }).populate({
            path: 'products.item',
            model: 'Product',
        });

        if (!userCart) {
            return { message: "Cart not found" };
        }

        userCart.products.forEach(product => {
            if (!product.item) {
                console.log(`Product with ID ${product.item} not found in cart ${userCart._id}`);
            }
        });

        console.log(userCart);
        const totalDetails = await this.calculateTotalWithOffers(userCart);
        console.log(totalDetails, "total Details");
        return { cart: userCart, ...totalDetails };
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
}


  const carts = await Cart.find();
for (const cart of carts) {
    for (const product of cart.products) {
        const productExists = await Product.findById(product.item);
        if (!productExists) {
            console.log(`Product with ID ${product.item} does not exist in cart ${cart._id}`);
        }
    }
}

async calculateTotalWithOffers(userCart) {
    let totalPrice = 0;
    let offersApplied = [];

    for (const product of userCart.products) {
        const productData = product.item;
        const quantity = product.quantity;

        totalPrice += productData.price * quantity;

        if (productData.offers && productData.offers.length > 0) {
            for (const offer of productData.offers) {
                let discount = 0;
                if (offer.type === 'buy_one_get_one' && quantity >= 2) {
                    discount = Math.floor(quantity / 2) * productData.price;
                    offersApplied.push({
                        type: offer.type,
                        description: offer.description,
                        discount: discount
                    });
                } else if (offer.type === 'bulk_purchase_discount' && quantity >= 3) {
                    discount = 5; 
                    offersApplied.push({
                        type: offer.type,
                        description: offer.description,
                        discount: discount
                    });
                } else if (offer.type === 'membership_discount') {
                    discount = (15 / 100) * (productData.price * quantity);
                    offersApplied.push({
                        type: offer.type,
                        description: offer.description,
                        discount: discount
                    });
                }
            }
        }
    }

    const totalDiscount = offersApplied.reduce((acc, offer) => acc + offer.discount, 0);
    const finalPrice = totalPrice - totalDiscount;

    return {
        totalPrice,
        totalDiscount,
        finalPrice,
        offersApplied
    };
}


async calculateTotalWithOffers(userCart) {
    let totalPrice = 0;
    let offersApplied = [];
    const uniquePerfumeIds = new Set(); 
  
    for (const product of userCart.products) {
      const productData = product.item;
      const quantity = product.quantity;
      const currentDate = new Date();
      totalPrice += productData.price * quantity;
  
      if (productData.category === 'perfume') {
        uniquePerfumeIds.add(productData.uId);
      }
  
      if (productData.offers && productData.offers.length > 0) {
        for (const offer of productData.offers) {
          let discount = 0;
          if (offer.type === "buy_one_get_one" && quantity >= 2) {
            discount = Math.floor(quantity / 2) * productData.price;
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "bulk_purchase_discount" && quantity >= 3) {
            discount = 5 * quantity;
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "membership_discount") {
            discount = (15 / 100) * (productData.price * quantity);
            offersApplied.push({
              type: offer.type,
              description: offer.description,
              discount: discount,
            });
          } else if (offer.type === "limited_time_discount") {
            if (currentDate >= offer.startDate && currentDate <= offer.endDate) {
              discount = 10 * quantity;
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            }
          }
        }
      }
    }
  
    const totalDiscount = offersApplied.reduce(
      (acc, offer) => acc + offer.discount,
      0
    );
  
    if (uniquePerfumeIds.size >= 5) {
      const additionalDiscount = totalPrice * 0.10; 
      offersApplied.push({
        type: 'bulk_perfume_discount',
        description: '10% discount for buying 5 different perfumes',
        discount: additionalDiscount,
      });
      totalDiscount += additionalDiscount;
    }
  
    const finalPrice = totalPrice - totalDiscount;
  
    return {
      totalPrice,
      totalDiscount,
      finalPrice,
      offersApplied,
    };
  }


  const gucciPerfume = new Product({
    uId: "gucci001",
    name: "Gucci Perfume",
    price: 100,
    description: "A luxurious Gucci perfume.",
    image: "path/to/image.jpg",
    offers: [
      {
        type: "tiered_discount",
        description: "Get discounts based on quantity.",
        discounts: [
          { quantity: 2, percentage: 10 },
          { quantity: 4, percentage: 20 },
        ],
      },
    ],
  });

  async calculateTotalWithOffers(userCart) {
    let totalPrice = 0;
    let offersApplied = [];
    const uniquePerfumeIds = new Set();
  
    for (const product of userCart.products) {
      const productData = product.item;
      const quantity = product.quantity;
      const currentDate = new Date();
      totalPrice += productData.price * quantity;
  
      if (productData) {
        uniquePerfumeIds.add(productData.uId);
      }
  
      if (productData.offers && productData.offers.length > 0) {
        for (const offer of productData.offers) {
          let discount = 0;
  
          // Existing offer checks...
          
          if (offer.type === "tiered_discount") {
            const applicableDiscount = offer.discounts
              .filter(discount => quantity >= discount.quantity)
              .reduce((max, discount) => Math.max(max, discount.percentage), 0);
  
            if (applicableDiscount > 0) {
              discount = (applicableDiscount / 100) * (productData.price * quantity);
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            }
          }
        }
      }
    }
  
    // Existing logic for unique perfume discount...
  
    const totalDiscount = offersApplied.reduce(
      (acc, offer) => acc + offer.discount,
      0
    );
  
    const finalPrice = totalPrice - totalDiscount;
  
    return {
      totalPrice,
      totalDiscount,
      finalPrice,
      offersApplied,
    };
  }



  async calculateTotalWithOffers(userCart) {
    let totalPrice = 0;
    let offersApplied = [];
    const uniquePerfumeIds = new Set();
    const productIdsInCart = new Set(); 
  
    for (const product of userCart.products) {
      const productData = product.item;
      const quantity = product.quantity;
      const currentDate = new Date();
      totalPrice += productData.price * quantity;
  
      if (productData) {
        uniquePerfumeIds.add(productData.uId);
        productIdsInCart.add(productData.uId); 
      }
  
      if (productData.offers && productData.offers.length > 0) {
        for (const offer of productData.offers) {
          let discount = 0;
  
         
  
          if (offer.type === "combo_discount") {
    
            const coolWaterId = "cool_water_id"; 
            const ckId = "ck_id"; 
     
            if (productIdsInCart.has(coolWaterId) && productIdsInCart.has(ckId)) {
              discount = 10; 
              offersApplied.push({
                type: offer.type,
                description: offer.description,
                discount: discount,
              });
            }
          }
        }
      }
    }
  
    // Existing unique perfume discount logic...
  
    const totalDiscount = offersApplied.reduce(
      (acc, offer) => acc + offer.discount,
      0
    );
  
    const finalPrice = totalPrice - totalDiscount;
  
    return {
      totalPrice,
      totalDiscount,
      finalPrice,
      offersApplied,
    };
  }
