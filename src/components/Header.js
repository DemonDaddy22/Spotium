import React from 'react';
import styled from 'styled-components';

const BrandLogo = styled.a`
    align-items: center;
    color: #FFF;
    display: flex;
    font-size: 3rem;
    font-weight: bold;
    justify-content: center;
    letter-spacing: -0.5px;
    outline: none;
    padding: 1rem;
    text-decoration: none;

    span {
        color: #1db954;
    }
`;

const Header = () => <BrandLogo href='/'><span>Spot</span>ium</BrandLogo>;

export default Header;
