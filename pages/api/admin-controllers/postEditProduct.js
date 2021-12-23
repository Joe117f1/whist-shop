import Product from '../../../utils/db-utils/modeles/product';

const handler = async (req, res) => {
  const { id, title, image: imageUrl, description, price } = req.body;
  try {
    const product = await Product.findById(id);
    product.title = title;
    product.price = price;
    product.description = description;
    product.imageUrl = imageUrl;
    await product.save();

  } catch (err) {
    console.log('PRMOISE ERROR (postEditProduct): ', err);
  }
  res.status(201).json({ message: 'Product edited successfuly!' });
};

export default handler;
