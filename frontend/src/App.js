import './css/App.css'
import Content from './components/pages/Content'
import BottomNavigationBar from './components/navs/BottomNavigationBar'
import TopNavigationBar from './components/navs/TopNavigationBar'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'
import { TempContextProvider } from './contexts/TempContext'
import { AuthContextProvider } from './contexts/AuthContext'
import { TasksContextProvider } from './contexts/TasksContext'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <TasksContextProvider>
                        <AuthContextProvider>
                            <TempContextProvider>
                                <div className="main-container">
                                    <TopNavigationBar />
                                    <Content />
                                    <BottomNavigationBar />
                                </div>
                            </TempContextProvider>
                        </AuthContextProvider>
                    </TasksContextProvider>
                </AppContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
