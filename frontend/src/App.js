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
import { LocationContextProvider } from './contexts/LocationContext'
import { PageContextProvider } from './contexts/PageContext'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <PageContextProvider>
                        <AuthContextProvider>
                            <TempContextProvider>
                                <div className="main-container">
                                    <TopNavigationBar />
                                    <LocationContextProvider>
                                        <TasksContextProvider>
                                            <Content />
                                        </TasksContextProvider>
                                    </LocationContextProvider>
                                    <BottomNavigationBar />
                                </div>
                            </TempContextProvider>
                        </AuthContextProvider>
                    </PageContextProvider>
                </AppContextProvider>
            </ThemeProvider>
        </div>
    )
}

export default App
