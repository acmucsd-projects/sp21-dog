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
                    <div class="main-container">
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
