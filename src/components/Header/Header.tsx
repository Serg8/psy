import React from 'react';
import s from './Header.module.scss'

function Header() {
    return (
        <header className={s.header}>
            <div>logo</div>
            <nav>
                <ul>
                    <li>Home</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;