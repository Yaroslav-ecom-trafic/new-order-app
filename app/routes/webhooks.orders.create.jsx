import { createRandomOrder } from "../models/Orders.server";
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
    const data = await authenticate.webhook(request);

    const products = {
        title: data.payload.name.toString(),
        price: data.payload.current_subtotal_price.toString(),
        status: data.payload.confirmed ? "confirmed" : "pending",
    }

    console.log(data, "<<<<<<================ data webhooks");

    const order = await createRandomOrder(data.shop, products);
    
//   try {
//     const { topic, shop, body } = await authenticate.webhook(request);
//     console.log('Webhook received:', { topic, shop });
//     console.log('Order data:', JSON.parse(body));

//     console.log(topic, shop, body, "<<<<<<================ Data");

//     if (topic === 'orders/create') {
//       // Обработка нового заказа
//       const orderData = JSON.parse(body);
//       console.log('New order created:', orderData);
//     }

//     return new Response(null, { status: 200 });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return new Response(null, { status: 500 });
//   }
    return new Response(null, { status: 200 });
};