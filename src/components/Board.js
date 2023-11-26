import { Routes, Route } from 'react-router-dom';
import Instruction from './Instruction';
import Learn from './Learn';
import Collections from './Collections';
import Test from './Test';
import Login from './Login';
import PersistLogin from './PersistLogin';
import RequireAuth from './RequireAuth';
import Search from './Search';
import UserSettings from './UserSettings';
import AddData from './AddData';
import ChangeUserName from './ChangeUserName';
import ChangePassword from './ChangePassword';
import Register from './Register';
import AddDataSingle from './AddDataSingle';
import './Board.css';

const Board = () => {
    return (
        <div className='board'>
            <Routes>
                {/* public routes*/}
                <Route path='/' element={<Instruction />} />
                <Route path='learn' element={<Learn />} />
                <Route path='collections' element={<Collections />} />
                <Route path='test' element={<Test />} />
                <Route path='login' element={<Login />} />

                {/* protected routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[100, 200]} />}>
                        <Route path='search' element={<Search />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[100, 200]} />}>
                        <Route path='user-settings' element={<UserSettings />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[100]} />}>
                        <Route path='add-data' element={<AddData />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[100]} />}>
                        <Route path='add-data/single' element={<AddDataSingle />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[100]} />}>
                        <Route path='user-settings/username' element={<ChangeUserName />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[100]} />}>
                        <Route path='user-settings/changepass' element={<ChangePassword />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[200]} />}>
                        <Route path='user-settings/register' element={<Register />} />
                    </Route>
                </Route>
                <Route path='*' element={<Instruction />} />
            </Routes>
        </div>
    );
};

export default Board;