import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
    width: 100%;

    input[type = 'text'] {
        background-color: transparent;
        border: 1px solid #1db95447;
        border-radius: 6px;
        color: #1db954;
        font-size: 1.5rem;
        outline: none;
        padding: 0.75rem 1rem;
        transition: border 0.2s ease;

        &:focus {
            border-color: #1db954;
            outline: none;
        }

        &::placeholder {
            color: #1db95497;
        }
    }
`;

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');

    return (
        <DashboardContainer>
            <input type='text' value={search} placeholder='Search for a song...' onChange={e => setSearch(e.target.value)}></input>
        </DashboardContainer>
    );
};

export default Dashboard;
