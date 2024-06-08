import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/input.scss"
import store from './redux/store.js';
import { Provider } from 'react-redux';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <App />
      </Provider>
)
