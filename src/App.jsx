import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const My = lazy(() => import('./pages/My'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='home' element={<Home />}></Route>
                    <Route path='my' element={<My />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </Suspense>

            <footer className='footer'>
                <NavLink to='/'>首页</NavLink>
                <NavLink to='/my'>我的</NavLink>
            </footer>
        </>
    );
};

export default App;
