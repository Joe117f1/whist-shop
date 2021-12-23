import { getMongoConnection } from '../utils/db-utils/dbUtils';
import Product from '../utils/db-utils/modeles/product';
import ProductList from '../components/shop/productList';

const CONNECTION_STRING = process.env.MONGODB_KEY;

const Admin = props => {
  const data = {
    products: props.products,
    isAdminPage: true
  };
  return (
    <div>
      <h1>Admin Panel </h1>
      <ProductList data={data} />
    </div>
  );
};

export default Admin;

export const getStaticProps = async () => {
  try {
    const mongoose = await getMongoConnection(CONNECTION_STRING);
    if (!mongoose) {
      throw new Error('could not connect to database.');
    };
    console.log('CONNECTED TO MONGODB!')
    const products = await Product.find();

    return {
      props: {
        products: products.map(prod => ({
          title: prod.title,
          imageUrl: prod.imageUrl,
          description: prod.description,
          price: prod.price,
          id: prod._id.toString()
        }))
      },
      revalidate: 10
    }
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  };
};