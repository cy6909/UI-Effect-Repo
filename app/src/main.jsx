import ReactDOM from 'react-dom/client';
import App from './personal/PersonalApp.jsx';
import './styles.css';

import { Provider } from './components/setup/provider';
import { initInputModeTracking } from './utils/inputMode';

initInputModeTracking();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
);
