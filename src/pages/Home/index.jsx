import React from 'react';
import { Button } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../redux/home';
import './index.less';

const Home = () => {
    const count = useSelector(state => state.home.value);
    const dispatch = useDispatch();

    return (
        <div className='home'>
            <h2>Home</h2>
            <Button color='primary' onClick={() => dispatch(increment())}>
                Increment
            </Button>
            <span>{count}</span>
            <Button color='primary' onClick={() => dispatch(decrement())}>
                Decrement
            </Button>
        </div>
    );
};
export default Home;
