const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const route = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

route.post("/", async (req, res) => {
    const { cargoFee, customer_email, products, couponCode } = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
            },
            unit_amount: Math.round(product.price * 100),
        },
        quantity: product.quantity,
    }));
    if (cargoFee > 0) {
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Kargo Ücreti" },
                unit_amount: Math.round(cargoFee * 100),
            },
            quantity: 1,
        })
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            customer_email: customer_email,
            success_url: `http://localhost:5173/success`,
            ...(couponCode && {
                discounts: [{ coupon: couponCode }],
            }),
        });

        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe session hatası:", error);
        res.status(500).json({ error: "Sunucu hatası: Stripe session oluşturulamadı." });
    }
});


module.exports = route;
