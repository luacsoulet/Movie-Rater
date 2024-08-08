'use client'
import { useState } from "react"
import Link from "next/link"

function Header(){

    const [isSlected, setIsSelected] = useState('/');
    
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Add Movies', path: '/addMovies' },
        { name: 'Account', path: '/account' },
    ];

    const handleLinkClick = (path) => {
        setIsSelected(path)
    }

    return(
        <ul className="flex items-center gap-8 text-white max-w-custom text-lg">
            {navItems.map((item) => (
                <li key={item.path}>
                    <Link 
                        href={item.path} 
                        onClick={() => handleLinkClick(item.path)}
                        className={`
                        ${ isSlected === item.path ? 'text-xl font-extrabold' : ''}
                        hover:text-xl hover:font-extrabold transition-all duration-300 ease-in-out`}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Header