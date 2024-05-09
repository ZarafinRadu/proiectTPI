import logo from './logo.svg';
import {createTheme} from '@mui/material/styles'
import './App.css';
import { themeSettings } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
<<<<<<< HEAD
import MapPage from './pages/MapPage';
=======
import MapComponent from './components/MapComponent';
>>>>>>> 235a2fa1f1d21d99d4d4e4eca017068f6a8e9a5d

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
<<<<<<< HEAD
   <Route path='/map' element={<MapPage/>}/>
=======
   <Route path='/map' element={<MapComponent/>}/>
>>>>>>> 235a2fa1f1d21d99d4d4e4eca017068f6a8e9a5d
  </Routes>
  </ThemeProvider>
  </BrowserRouter>)
}

export default App;
