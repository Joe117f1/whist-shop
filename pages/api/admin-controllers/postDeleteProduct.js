import Product from '../../../utils/db-utils/modeles/product';

const handler = async (req, res) => {
  const id = req.body;
  try {
    await Product.findByIdAndRemove(id);
  } catch (err) {
    console.log('PRMOISE ERROR (postDeleteProduct): ', err);
  }
  res.status(201).json({ message: 'Product deleted successfuly!' });
};

export default handler;
