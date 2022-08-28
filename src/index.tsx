import ReactDOM from 'react-dom'
import './index.module.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Store_/store'
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
