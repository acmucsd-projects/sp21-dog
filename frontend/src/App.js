import './css/App.css'
import Content from './components/pages/Content'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'
import { TempContextProvider } from './contexts/TempContext'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <TempContextProvider>
                        <div className="main-container">
                            <Content />
                        </div>
                    </TempContextProvider>
                </AppContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
