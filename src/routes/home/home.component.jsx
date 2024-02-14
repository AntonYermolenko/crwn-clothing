import { Outlet } from 'react-router-dom';
import '../../categories.styles.scss'
import categories from '../../components/category-menu/category-menu.component';
import Directory from '../../components/directory/directory.component';

function Home() {
    return (
        <div>
            <Directory categories={categories} />
            <Outlet />
        </div>
    );
}

export default Home;
