import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navList">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/tradition">Traditional Data Fetching</Link>
                </li>
                <li>
                    <Link href="/tanstack">TanStack Query Fetching</Link>
                </li>
                <li>
                    <Link href='/parallelquery'>Parallel query Fetching</Link>
                </li>
                <li>
                    <Link href='/mutation'>Mutation example</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
