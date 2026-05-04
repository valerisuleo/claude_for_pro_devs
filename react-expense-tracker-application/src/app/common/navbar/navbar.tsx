import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [isOpen, setOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setOpen((prevState) => {
            const newState = !prevState;
            return newState;
        });
    };

    return (
        <nav className={`navbar navbar-expand-lg bg-light`}>
            <div className="container-fluid">
                <Link className={`navbar-brand`} to="/">
                    Play with React Form
                </Link>
                <button
                    onClick={toggleBurgerMenu}
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        isOpen ? 'show' : ''
                    }`}
                    id="navbarNav"
                >
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
