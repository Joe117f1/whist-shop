import { Fragment } from 'react';
import { getMongoConnection } from '../../utils/db-utils/dbUtils';
import Order from '../../utils/db-utils/modeles/order';
import Card from '../../ui/Card';
import classes from '../../components/shop/ProductItem.module.css';

const CONNECTION_STRING = process.env.MONGODB_KEY;

const getRecentSales = (orderList, numberOfDays) => {
  const orders = [...orderList];

  const today = Date.now();
  const defaultIdx = orders.length;
  const firstOldIdx = orders.findIndex(order => {
    return ((today - order.orderDate) / 1000 / 60 / 60 / 24 > numberOfDays);
  });

  const idx = firstOldIdx >= 0 ? firstOldIdx : defaultIdx;
  const recentOrders = [];
  for (let i = 0; i < idx; i++) {
    const order = {
      id: orders[i].orderId,
      total: orders[i].total,
      date: new Date(orders[i].orderDate)
    };
    recentOrders.push(order);
  }
  return recentOrders;
};

const getTopsFromMap = (map, arr, num) => {
  let counter = 0;
  for (const element of map) {
    if (counter >= num) {
      break;
    }
    arr.push(element);
    counter++;
  }
};

const getTopsFromOrders = orderList => {
  const orders = [...orderList];
  const sales = [];
  const topProducts = [];
  const uniqueProducts = [];
  const ratedProducts = new Map();
  orders.forEach(order => sales.push(...order.orderItems));

  for (let i = 0; i < sales.length; i++) {
    const currProduct = sales[i];
    if (ratedProducts.has(currProduct.title)) {
      const { amount, occurrence } = ratedProducts.get(currProduct.title);
      ratedProducts.set(
        currProduct.title,
        {
          amount: amount + currProduct.amount,
          occurrence: occurrence + 1
        });
    } else {
      const uniqueOccurrence = currProduct.amount > 1 ? 1 : 0;
      ratedProducts.set(
        currProduct.title,
        {
          amount: currProduct.amount,
          occurrence: uniqueOccurrence
        });
    }
  }
  const sortedBestSeller = new Map(
    [...ratedProducts.entries()].sort((a, b) => b[1].amount - a[1].amount)
  );

  const sortedTopUniques = new Map(
    [...ratedProducts.entries()].sort((a, b) => b[1].occurrence - a[1].occurrence)
  );
  getTopsFromMap(sortedBestSeller, topProducts, 5);
  getTopsFromMap(sortedTopUniques, uniqueProducts, 5);

  return { topProducts, uniqueProducts };
};

const reformTopProducts = (arr, value) => {
  return arr.map(prod => {
    return {
      id: Math.random().toString(), //TODO: use mongo id
      title: prod[0],
      amount: prod[1][value],
    }
  });
};

const getOrderJSX = order => {
  const date = order.date.toString();
  return (
    <div key={order.id}>
      <h3>Order: {order.id}</h3>
      <h3>Total paid : {order.total}</h3>
      <h4>Date: {date}</h4>
      <hr />
    </div>
  );
};

const getProductJSX = prod => {
  return (
    <div key={prod.id}>
      <h3>Product: {prod.title}</h3>
      <h4>X {prod.amount}</h4>
      <hr />
    </div>
  );
};

const Stats = props => {
  const { topProducts, uniqueProducts } = getTopsFromOrders(props.orders);
  const bestSellers = reformTopProducts(topProducts, 'amount');
  const mostUiques = reformTopProducts(uniqueProducts, 'occurrence');
  const recentOrders = getRecentSales(props.orders, 5);

  const createStatsCard = (statsTitle, arr, cbJSX) => {
    return (
      <Card>
        <div className={classes.card}>
          <h2>{statsTitle}</h2>
          {arr.map(item => cbJSX(item))}
        </div>
      </Card>
    );
  };

  const topProductsCard = createStatsCard('Top 5 products', bestSellers, getProductJSX);
  const mostUniquesCard = createStatsCard('Top 5 Uniques', mostUiques, getProductJSX);
  const recentOrdersCard = createStatsCard('Recent Orders', recentOrders, getOrderJSX);

  return (
    <Fragment>
      <h1>Sales Info and Stats</h1>
      <div className={classes.grid}>
        {topProductsCard}
        {mostUniquesCard}
        {recentOrdersCard}
      </div>
    </Fragment>
  );
};

export default Stats;

export const getStaticProps = async () => {
  try {
    const mongoose = await getMongoConnection(CONNECTION_STRING);
    if (!mongoose) {
      throw new Error('could not connect to database.');
    };
    console.log('CONNECTED TO MONGODB!')
    const orders = await Order.find();

    return {
      props: {
        orders: orders.map(order => ({
          orderDate: order.orderDate,
          total: order.total,
          orderItems: order.orderItems.map(oi => {
            return {
              amount: oi.product.amount,
              id: oi.product.id.toString(),
              imageUrl: oi.product.imageUrl,
              price: oi.product.price,
              title: oi.product.title
            }
          }),
          orderId: order._id.toString()
        }))
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  };
};
