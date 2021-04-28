import './App.css'
import Content from './components/Content'
import BottomNavigationBar from './components/BottomNavigationBar'
import TopNavigationBar from './components/TopNavigationBar'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <TopNavigationBar />
<<<<<<< HEAD
                        <Content />
=======
>>>>>>> df9ad94 (Create top and bottom navbars)
                        <BottomNavigationBar />
                    </div>
                </AppContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
