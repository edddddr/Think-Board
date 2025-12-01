import { Routes, Route } from "react-router"

import CreatePage from "./pages/createPage"
import HomePage from "./pages/homepage"
import NoteDetailPage from "./pages/NoteDetailPage"
import toast from "react-hot-toast"
const App =()=> {
  return (
    <div>
      <Routes>
      <Route path="/" element={< HomePage/>}/>
      <Route path="/create" element={< CreatePage/>}/>
      <Route path="/note/:id" element={< NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App