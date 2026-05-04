import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-blue-600 bg-[#1E90FF]">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    <Link
                        to="/"
                        className="text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
                    >
                        expense<span className="font-bold opacity-80">tracker</span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-6 sm:flex">
                        <Link
                            to="/"
                            className="text-sm text-blue-100 transition-colors hover:text-white"
                        >
                            Home
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setOpen((p) => !p)}
                        className="flex size-8 flex-col items-center justify-center gap-1.5 sm:hidden"
                        aria-label="Toggle navigation"
                    >
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                                isOpen ? 'translate-y-2 rotate-45' : ''
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                                isOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                                isOpen ? '-translate-y-2 -rotate-45' : ''
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t border-blue-400 transition-all duration-300 sm:hidden ${
                    isOpen ? 'max-h-40' : 'max-h-0 border-transparent'
                }`}
            >
                <div className="flex flex-col gap-1 px-4 py-3">
                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm text-blue-100 transition-colors hover:bg-blue-600 hover:text-white"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
