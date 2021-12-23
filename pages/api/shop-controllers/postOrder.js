import Order from '../../../utils/db-utils/modeles/order';

export const handler = async (req, res) => {
  const { orderDate, items, total } = req.body;
  const orderItems = items.map(item => {
    return {
      product: {
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.price,
        amount: item.amount
      }
    }
  });
  try {
    const order = new Order({
      orderDate, total, orderItems
    })
    await order.save();

  } catch (err) {
    console.log('PRMOISE ERROR (postOrder): ', err);
  }
  res.status(201).json({ message: 'Order added successfuly!' });
};

export default handler;
