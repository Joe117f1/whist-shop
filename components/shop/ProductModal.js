import Modal from '../../ui/Modal';
import ProductForm from './ProductForm';
import { sendDataToServer } from '../../utils/helper-functions/httpFunction';
import classes from './ProductModal.module.css';

const ProductModal = props => {
  const { id, title, img, description, price, isEdit } = props;

  const addProduct = product => {
    sendDataToServer(product, '/api/admin-controllers/postAddProduct');
  };

  const editProduct = product => {
    sendDataToServer(product, '/api/admin-controllers/postEditProduct');
  };

  const submitHandler = isEdit ? editProduct : addProduct;

  return (
    <Modal onCloseModal={props.onCloseModal}>
      <section className={classes.container}>
        <ProductForm
          id={id}
          title={title}
          imageUrl={img}
          description={description}
          price={price}
          edit={isEdit}
          onSubmitProduct={submitHandler}
        />
      </section>
    </Modal>
  );
};

export default ProductModal;
