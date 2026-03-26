import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider } from './store/AppContext';
import '../styles/fonts.css';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
