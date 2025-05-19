import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import Layout from "./layouts/Layout.jsx"



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </Provider>

)
