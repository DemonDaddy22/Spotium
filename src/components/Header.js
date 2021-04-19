import React from 'react';
import styled from 'styled-components';

const BrandLogo = styled.a`
    align-items: center;
    display: flex;
    justify-content: center;
    outline: none;
    text-decoration: none;
`;

const Header = () => <BrandLogo>Spotium</BrandLogo>;

export default Header;
