import './css/App.css'
import Content from './components/pages/Content'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppContextProvider } from './contexts/AppContext'
import { theme } from './helpers/Themes.js'
import { TempContextProvider } from './contexts/TempContext'
import { AuthContextProvider } from './contexts/AuthContext'
import { TasksContextProvider } from './contexts/TasksContext'
import { LocationContextProvider } from './contexts/LocationContext'
import { PageContextProvider } from './contexts/PageContext'
import { provider, ProviderComposer } from './helpers/ProviderComposer'

function App() {
    return (
        <ProviderComposer
            providers={[
                provider(ThemeProvider, { theme: theme }),
                provider(AppContextProvider),
                provider(PageContextProvider),
                provider(AuthContextProvider),
                provider(TempContextProvider),
                provider(LocationContextProvider),
                provider(TasksContextProvider),
            ]}
        >
            <div className="App">
                <Content />
            </div>
        </ProviderComposer>
    )
}

export default App
