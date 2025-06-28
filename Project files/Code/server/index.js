import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Admin, Cart, Orders, Product, User } from './Schema.js';

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = 6001;

// ✅ MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB Atlas connected");

    // === START ALL YOUR ROUTES ===

    app.post('/register', async (req, res) => {
        const { username, email, usertype, password } = req.body;
        if (!username || !email || !usertype || !password) {
            console.error('Registration failed: missing fields', req.body);
            return res.status(400).json({ message: 'All fields (username, email, usertype, password) are required.' });
        }
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, usertype, password: hashedPassword });
            const userCreated = await newUser.save();
            res.status(201).json(userCreated);
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Request body:', req.body);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });

    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            console.error('Login failed: missing fields', req.body);
            return res.status(400).json({ message: 'Both email and password are required.' });
        }
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: 'Invalid email or password' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

            res.json(user);
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    });

    app.get('/fetch-banner', async (req, res) => {
        try {
            const admin = await Admin.findOne();
            res.json(admin.banner);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-product-details/:id', async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-products', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-orders', async (req, res) => {
        try {
            const orders = await Orders.find();
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-categories', async (req, res) => {
        try {
            const data = await Admin.find();
            if (data.length === 0) {
                // If no admin data exists, create it with the correct categories
                const newData = new Admin({ 
                    banner: "/images/home-banner1.png", 
                    categories: ["Fashion", "Electronics", "Mobiles", "Groceries", "Sports Equipments"],
                    bannerImages: ["/images/home-banner1.png", "/images/home-banner-2.png"]
                });
                await newData.save();
                return res.json(newData.categories);
            } else {
                // If admin data exists but categories are empty, update them
                if (!data[0].categories || data[0].categories.length === 0) {
                    data[0].categories = ["Fashion", "Electronics", "Mobiles", "Groceries", "Sports Equipments"];
                    await data[0].save();
                }
                return res.json(data[0].categories);
            }
        } catch (err) {
            console.error('Fetch categories error:', err);
            res.status(500).json({ message: 'Error occurred' });
        }
    });

    app.post('/add-new-product', async (req, res) => {
        const {
            productName, productDescription, productMainImg, productCarousel,
            productSizes, productGender, productCategory, productNewCategory,
            productPrice, productDiscount
        } = req.body;
        try {
            const category = productCategory === 'new category' ? productNewCategory : productCategory;
            if (productCategory === 'new category') {
                const admin = await Admin.findOne();
                admin.categories.push(productNewCategory);
                await admin.save();
            }
            const newProduct = new Product({
                title: productName, description: productDescription, mainImg: productMainImg,
                carousel: productCarousel, category, sizes: productSizes, gender: productGender,
                price: productPrice, discount: productDiscount
            });
            await newProduct.save();
            res.json({ message: "product added!!" });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/update-product/:id', async (req, res) => {
        const {
            productName, productDescription, productMainImg, productCarousel,
            productSizes, productGender, productCategory, productNewCategory,
            productPrice, productDiscount
        } = req.body;
        try {
            const category = productCategory === 'new category' ? productNewCategory : productCategory;
            if (productCategory === 'new category') {
                const admin = await Admin.findOne();
                admin.categories.push(productNewCategory);
                await admin.save();
            }

            const product = await Product.findById(req.params.id);
            Object.assign(product, {
                title: productName, description: productDescription, mainImg: productMainImg,
                carousel: productCarousel, category, sizes: productSizes,
                gender: productGender, price: productPrice, discount: productDiscount
            });
            await product.save();
            res.json({ message: "product updated!!" });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.post('/update-banner', async (req, res) => {
        const { banner } = req.body;
        try {
            const admin = await Admin.findOne() || new Admin({ categories: [] });
            admin.banner = banner;
            await admin.save();
            res.json({ message: "banner updated" });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.post('/buy-product', async (req, res) => {
        try {
            const newOrder = new Orders(req.body);
            await newOrder.save();
            res.json({ message: 'order placed' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/cancel-order', async (req, res) => {
        try {
            const order = await Orders.findById(req.body.id);
            order.orderStatus = 'cancelled';
            await order.save();
            res.json({ message: 'order cancelled' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/update-order-status', async (req, res) => {
        try {
            const order = await Orders.findById(req.body.id);
            order.orderStatus = req.body.updateStatus;
            await order.save();
            res.json({ message: 'order status updated' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.get('/fetch-cart', async (req, res) => {
        try {
            const items = await Cart.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.post('/add-to-cart', async (req, res) => {
        try {
            const item = new Cart(req.body);
            await item.save();
            res.json({ message: 'Added to cart' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/increase-cart-quantity', async (req, res) => {
        try {
            const item = await Cart.findById(req.body.id);
            item.quantity = parseInt(item.quantity) + 1;
            await item.save();
            res.json({ message: 'incremented' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/decrease-cart-quantity', async (req, res) => {
        try {
            const item = await Cart.findById(req.body.id);
            item.quantity = parseInt(item.quantity) - 1;
            await item.save();
            res.json({ message: 'decremented' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.put('/remove-item', async (req, res) => {
        try {
            await Cart.deleteOne({ _id: req.body.id });
            res.json({ message: 'item removed' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    app.post('/place-cart-order', async (req, res) => {
        const { userId, name, mobile, email, address, pincode, paymentMethod, orderDate } = req.body;
        try {
            const cartItems = await Cart.find({ userId });
            for (const item of cartItems) {
                const newOrder = new Orders({
                    userId, name, mobile, email, address, pincode,
                    title: item.title, description: item.description, mainImg: item.mainImg,
                    size: item.size, quantity: item.quantity, price: item.price, discount: item.discount,
                    paymentMethod, orderDate
                });
                await newOrder.save();
                await Cart.deleteOne({ _id: item._id });
            }
            res.json({ message: 'Order placed' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // === CART FUNCTIONALITY ===

    // Add to Cart
    app.post('/cart/add', async (req, res) => {
        try {
            const { userId, productId, title, mainImg, price, discount, size, quantity } = req.body;
            // Check if item already in cart for this user and size
            let cartItem = await Cart.findOne({ userId, title, size });
            if (cartItem) {
                cartItem.quantity += quantity || 1;
                await cartItem.save();
                return res.json({ message: 'Cart item quantity updated', cartItem });
            }
            cartItem = new Cart({ userId, title, mainImg, price, discount, size, quantity: quantity || 1 });
            await cartItem.save();
            res.json({ message: 'Added to cart', cartItem });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // Get Cart Items for a User
    app.get('/cart/:userId', async (req, res) => {
        console.log('GET /cart/:userId', req.params.userId);
        try {
            const cartItems = await Cart.find({ userId: req.params.userId });
            res.json(cartItems);
        } catch (err) {
            console.error('Cart fetch error:', err);
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // Update Cart Item Quantity
    app.put('/cart/update', async (req, res) => {
        try {
            const { userId, title, size, quantity } = req.body;
            const cartItem = await Cart.findOne({ userId, title, size });
            if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
            cartItem.quantity = quantity;
            await cartItem.save();
            res.json({ message: 'Cart item updated', cartItem });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // Remove Item from Cart
    app.delete('/cart/remove', async (req, res) => {
        try {
            const { userId, title, size } = req.body;
            await Cart.findOneAndDelete({ userId, title, size });
            res.json({ message: 'Cart item removed' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // Clear Cart
    app.delete('/cart/clear/:userId', async (req, res) => {
        try {
            await Cart.deleteMany({ userId: req.params.userId });
            res.json({ message: 'Cart cleared' });
        } catch (err) {
            res.status(500).json({ message: 'Error occured' });
        }
    });

    // === END OF ROUTES ===

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

}).catch((e) => console.error(`❌ Error in DB connection: ${e.message}`));
