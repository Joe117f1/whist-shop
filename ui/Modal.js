import { Fragment } from 'react';
import DomPortal from './DomPortal';
import classes from './Modal.module.css';

const BackDrop = props => {
  return (
    <DomPortal selector='#backdrop-root'>
      <div
        className={classes.backdrop}
        onClick={props.onCloseModal}
      >
      </div>
    </DomPortal>
  );
};

const ModalOverlay = props => {
  const modalClass = props.isDropdown ? classes.dropdown : classes.modal;
  return (
    <DomPortal selector='#overlay-root'>
      <div className={modalClass}>
        {props.children}
        <button
          className={classes.btn}
          type='button'
          onClick={props.onCloseModal}>
          Back
        </button>
      </div>
    </DomPortal>
  );
};

const Modal = props => {
  const isDropdown = props.isDropdown;
  return (
    <Fragment>
      <BackDrop onCloseModal={props.onCloseModal} />
      <ModalOverlay
        isDropdown={isDropdown}
        onCloseModal={props.onCloseModal} >
        {props.children}
      </ModalOverlay>
    </Fragment>
  );
};

export default Modal;
