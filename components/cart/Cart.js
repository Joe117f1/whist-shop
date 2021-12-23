import { useContext, Fragment } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../../ui/Modal';
import { sendDataToServer } from '../../utils/helper-functions/httpFunction';
import classes from './Cart.module.css';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addCartItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeCartItemHamdler = id => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    const order = {
      orderDate: Date.now(),
      items: cartCtx.items,
      total: cartCtx.totalAmount,
    };
    sendDataToServer(order, '/api/shop-controllers/postOrder');
    console.log('ORDER!', order);
  };

  const cartrItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item =>
        <CartItem
          key={item.id}
          title={item.title}
          amount={item.amount}
          price={item.price}
          onAddItem={addCartItemHandler.bind(null, item)}
          onRemoveItem={removeCartItemHamdler.bind(null, item.id)}
        />
      )}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onToggleCart}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler} >
        Order
      </button>}
    </div>
  );

  const modalContent = (
    <Fragment>
      {cartrItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalActions}
    </Fragment>
  );

  // adding a loading spinner

  return (
    <Modal
      isDropdown={true}
      onToggleCart={props.onToggleCart}
      onCloseModal={props.onCloseModal}
    >
      {modalContent}
    </Modal>
  );
};

export default Cart;
