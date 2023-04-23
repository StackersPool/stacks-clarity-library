import React from 'react'
import { Link } from 'react-router-dom'

const resetActive = () => {
    const links = document.querySelectorAll(`.page-navigation a`)
    console.log(links);
    links.forEach((link) => link.classList.remove(`active`))
}

const handleClick = (e) => {
    resetActive()
    e.target.classList.add(`active`)
}

const PageNavigation = () => {
    return (
        <div className='page-navigation'>
            <Link to="/" onClick={handleClick} className="active">Introduction</Link>
            <Link to='/contract' onClick={handleClick}>Contract</Link>
            <Link to="/how-it-works" onClick={handleClick}>How It Works</Link>
        </div>
    )
}

export default PageNavigation
