import styled from 'styled-components';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';

const code = new URLSearchParams(window.location.search).get('code');

const AppContainer = styled.div`
    align-items: center;
    background-color: #222326;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem;
`;

const App = () => <AppContainer>
    <Header />
    {code ? <Dashboard code={code} /> : <Login />}
</AppContainer>;

export default App;
