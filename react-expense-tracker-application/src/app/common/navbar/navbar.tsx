import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-[#d2d2d7]/50 bg-white/80 backdrop-blur-xl backdrop-saturate-200">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-11 items-center justify-between">
                    <Link
                        to="/"
                        className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] transition-opacity hover:opacity-60"
                    >
                        <span className="text-primary">expense</span>tracker
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-8 sm:flex">
                        <Link
                            to="/"
                            className="text-[13px] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]"
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
                            className={`block h-0.5 w-5 bg-[#1d1d1f] transition-all duration-300 ${
                                isOpen ? 'translate-y-2 rotate-45' : ''
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-[#1d1d1f] transition-all duration-300 ${
                                isOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`block h-0.5 w-5 bg-[#1d1d1f] transition-all duration-300 ${
                                isOpen ? '-translate-y-2 -rotate-45' : ''
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`overflow-hidden border-t border-[#d2d2d7]/50 transition-all duration-300 sm:hidden ${
                    isOpen ? 'max-h-40' : 'max-h-0 border-transparent'
                }`}
            >
                <div className="flex flex-col gap-1 px-4 py-3">
                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-[13px] text-[#6e6e73] transition-colors hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
