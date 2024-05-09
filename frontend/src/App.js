import logo from './logo.svg';
import {createTheme} from '@mui/material/styles'
import './App.css';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MapComponent from './components/MapComponent';

function App() {
  const mode = useSelector(state=>state.mode)
  const theme = createTheme(themeSettings(mode))
  return(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
  <CssBaseline/>
  <Routes>
   <Route path='/' element={<LoginPage/>}/>
   <Route path='/home' element={<HomePage/>}/>
   <Route path='/map' element={<MapComponent/>}/>
  </Routes>
  </ThemeProvider>
  </BrowserRouter>)
}

export default App;
