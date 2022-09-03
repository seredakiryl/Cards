import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App'
import { store } from './Store/store'
import 'antd/dist/antd.css'
import './index.module.css'
// eslint-disable-next-line react/no-render-return-value
const root = ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)
