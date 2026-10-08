import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POST /api/checkout — tworzy sesję Stripe Checkout (hosted) i przekierowuje na stronę płatności.
export async function POST() {
  // TODO: "subscription" dla produktów cyklicznych (wtedy dodać payment_method_collection: "always").
  const mode = "payment";

  const session = await stripe.checkout.sessions.create({
    ui_mode: "hosted_page",
    billing_address_collection: "auto",
    phone_number_collection: { enabled: true },
    automatic_tax: { enabled: false },
    allow_promotion_codes: false,
    submit_type: "auto",
    integration_identifier: "hosted_web_0002",
    origin_context: "web",
    mode,
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}`,
    line_items: [{ price: "price_...", quantity: 1 }],
  });

  return Response.redirect(session.url!, 303);
}
