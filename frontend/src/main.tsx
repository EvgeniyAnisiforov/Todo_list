import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename='/Todo_list'>
      <App />
    </BrowserRouter>
  </Provider>,
)
