import Link from 'next/link';
import classes from './MobileMenu.module.css';

const MobileMenu = props => {
  return (
    <main className={classes.menu} onClick={props.onToggleMenu}>
      <ul>
        <li onClick={props.onToggleMenu}>
          <Link href='/' >Admin</Link>
        </li>
        <li onClick={props.onToggleMenu}>
          <Link href='/home' >Home</Link>
        </li>
        <li onClick={props.onToggleMenu}>
          <Link href='/stats' >Stats</Link>
        </li>
      </ul>
    </main>
  );
};

export default MobileMenu;