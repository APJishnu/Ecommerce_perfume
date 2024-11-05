
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