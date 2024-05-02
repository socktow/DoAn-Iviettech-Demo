import React from 'react';
import { Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

const Setting = () => {
    const dispatch = useDispatch();
    const THEME = useSelector((state) => state.theme.theme);
    const onChange = (e) => {
        const theme = e.target.value;
        if (theme === 'dark') {
            dispatch({ type: 'theme/dark' });
            localStorage.setItem('theme', 'dark');
        } else {
            dispatch({ type: 'theme/light' });
            localStorage.setItem('theme', 'light');
        }
    };
    return (
        <div className={`${THEME === 'dark' ? 'setting-style-dark' : 'setting-style-light'}`}>
            <p>Theme: </p>
            <Radio.Group onChange={onChange} defaultValue={THEME}>
                <Radio value="dark" className={`${THEME === 'dark' ? 'dark-style' : 'light-style'}`}>
                    Dark
                </Radio>
                <Radio value="light" className={`${THEME === 'dark' ? 'dark-style' : 'light-style'}`}>
                    Light
                </Radio>
            </Radio.Group>
        </div>
    );
};

export default Setting;
