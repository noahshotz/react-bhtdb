import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import Question1 from './routes/question1'
import Question2 from './routes/question2'
import Question3 from './routes/question3'
import Question4 from './routes/question4'
import Question5 from './routes/question5'
import Question6 from './routes/question6'
import Question7 from './routes/question7'
import Question8 from './routes/question8'
import Question9 from './routes/question9'
import Question10 from './routes/question10'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="question1" element={<Question1 />} />
      <Route path="question2" element={<Question2 />} />
      <Route path="question3" element={<Question3 />} />
      <Route path="question4" element={<Question4 />} />
      <Route path="question5" element={<Question5 />} />
      <Route path="question6" element={<Question6 />} />
      <Route path="question7" element={<Question7 />} />
      <Route path="question8" element={<Question8 />} />
      <Route path="question9" element={<Question9 />} />
      <Route path="question10" element={<Question10 />} />

    </Routes>
  </BrowserRouter>
)