import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Question1 from './routes/question1'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="question1" element={<Question1 />} />

    </Routes>
  </BrowserRouter>
)