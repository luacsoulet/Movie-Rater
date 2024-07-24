import Link from "next/link"

function Header(){
    return(
        <ul className="flex items-center gap-8 text-white max-w-custom text-lg">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/movies">Movies</Link></li>
            <li><Link href="/addMovies">Add Movies</Link></li>
            <li><Link href="/account">Account</Link></li>
        </ul>
    )
}

export default Header