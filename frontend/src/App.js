<<<<<<< HEAD
import './App.css'
import Content from './components/Content'
import BottomNavigationBar from './components/BottomNavigationBar'
import TopNavigationBar from './components/TopNavigationBar'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'
=======
import logo from './logo.svg'
import './App.css'
>>>>>>> 249fd00 (Set up linting with basic configuration)

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
                        <Content />
                        <BottomNavigationBar />
                    </div>
                </AppContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
