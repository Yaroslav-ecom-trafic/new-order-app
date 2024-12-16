import {
  Page,
  DataTable,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { getOrders } from "../models/Orders.server";
import { useState, useEffect } from "react";

const headings = [
  { title: 'name' },
  { title: 'created at' },
  { title: 'total amount' },
  { title: 'status' },
];

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  const orders = await getOrders(shop);
  return json({ orders });
}

export default function AdditionalPage() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  const [ordersList, setOrdersList] = useState(data.orders);

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 5000);

    return () => clearInterval(interval);
  }, [revalidator]);

  useEffect(() => {
    setOrdersList(data.orders);
  }, [data.orders]);

  const rows = ordersList.map(order => [
    order.name,
    order.created_at,
    order.total_amount,
    order.status
  ]);

  return (
    <Page>
      <DataTable
        columnContentTypes={[
          'text',
          'text',
          'text',
          'text',
        ]}
        headings={headings.map((heading) => heading.title)}
        rows={rows}
      />
    </Page>
  );
}