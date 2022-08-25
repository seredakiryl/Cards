import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import 'antd/dist/antd.css'

// eslint-disable-next-line react/no-render-return-value
const root = ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>{' '}
  </HashRouter>,
  document.getElementById('root')
)
