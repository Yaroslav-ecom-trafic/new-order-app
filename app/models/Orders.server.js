import prisma from "../db.server";

export async function getOrders(shop) {

    console.log(shop, "<<<<<<================ shop getOrders");
    const orders = await prisma.order.findMany({
        where: {
            shop,
        },
    });

    return orders;
}

export async function createRandomOrder(shop, products) {

    console.log(shop, "<<<<<<================ shop createRandomOrder");

    try {
        const order = await prisma.order.create({
            data: {
                id: Date.now().toString(),
                shop,
                name: products.title,
                total_amount: products.price,
                status: products.status
            },
        });

        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}