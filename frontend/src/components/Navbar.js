import {Link} from 'react-router-dom';

const Navbar= ()=>{
    return(
        <div className='container'>
            <header>
                <Link to="/">
                    <h2>Home</h2>
                </Link>
            </header>
        </div>
    )
}

export default Navbar