import {AppProviders} from './providers/app';
import {ErrorBoundary} from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AppProviders/>
        </ErrorBoundary>
    );
}

export default App;