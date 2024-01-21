import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export const POST = async (request) => {
  let data = await request.json();
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Donation",
              // Images:[item.image]
              description: `I am making a donation to support the development of the next blog website.`,
              metadata: {
                orderedBy: "aman@gmail.com",
              },
            },
            unit_amount: 20000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
};
