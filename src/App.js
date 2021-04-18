import styled from 'styled-components';
import './App.css';
import Login from './components/Login';

const AppContainer = styled.div`
    box-sizing: border-box;
    min-height: 100vh;
    padding: 1rem;
`;

const App = () => <AppContainer>
    <Login />
</AppContainer>;

export default App;
