import { BrowserRouter } from "react-router-dom"
import BaseRoutes from '@/routes/index.tsx'
import { store } from "@/redux/store"
import { Provider } from "react-redux"
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          {/* <StateInitializer> */}
            <Toaster
              position="bottom-center"
              toastOptions={{ duration: 4000 }} />
            <BaseRoutes />
          {/* </StateInitializer> */}
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App