
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (<>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/info">Information</Link>
                </li>
            </ul>
        </nav>

        <Outlet></Outlet>
    </>)
}

export default Layout