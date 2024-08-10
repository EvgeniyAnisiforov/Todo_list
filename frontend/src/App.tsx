import { Route, Routes } from "react-router-dom"

import {Homepage} from './pages/Homepage'
import {Authorization} from './pages/Authorization'
import {Registration} from './pages/Registration'
import {NotFoundPage} from './pages/NotFoundPage'

import { RequireAuth } from "./hoc/RequireAuth"

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Authorization/>}/>
      <Route path="/registration" element={<Registration/>}/>
      <Route path="/homepage" element={
        <RequireAuth>
          <Homepage/>
        </RequireAuth>
      }/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App


