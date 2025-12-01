import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { ArrowLeftIcon, LoaderIcon } from 'lucide-react'

export default function NoteDetailPage() {
      const [note, setNote] = useState(null)
      const [loading, setLoading] = useState(true)
      const [saving, setSaving] = useState(false)

      const navigaton = useNavigate()

      const {id} = useParams()

      useEffect(() => {
        const fetchNotes = async  () => {
        try{
          const res =   await api.get(`notes/${id}`)
          setNote(res.data)
          console.log("-- -- -- ")
         
      }catch(error){
        console.log("Error in fetching note")
        toast.error("Faild to fatch the note")
      }finally{
        setLoading(false)
      }
    }

        fetchNotes()
      }, [id]);


  const handleDelete = async () => {

    

    if(!window.confirm("Are you sure to delete!")) return;

    try{
      await api.delete(`/notes/${id}`)
      navigaton("/")
      toast.success("Note was successfully deleted!")
    }catch(error){
      console.log("Faild in handleDelete", error)
      toast.error("Faild to Delete Node")

    }
  }


  const handleSave = async ()=>{

    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add the title or the content!")
      return;
    }

    setSaving(true)
    try{
      await api.put(`/notes/${id}`, note)
      toast.success("Note Updated successfully!")
      navigaton("/")

    }catch(error){
      console.log("Som error is happend during saving")
      toast.error("Error to udated")
    }finally{
      setSaving(false)
    }
  }

   if(loading){
      return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
   } 
   
   

    return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
              <Link to={"/"} className='btn btn-ghost' >
                <ArrowLeftIcon />
                Back To Notes
              </Link>
              <button onClick={() => handleDelete()}  className='btn btn-error btn-outline'>Delte Note</button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              
              
              <div className="form-control mb-4">
                <div className="label">
                  <div className="label-text">Title</div>
                </div>
                <input 
                      type="text"
                      className="input input-boarderd"
                      placeholder='No title'
                      value={note.title}
                      onChange={(e) => setNote({...note, title: e.target.value})}
                      />
              </div>

              
              <div className="form-control mb-4">
                <div className="label">
                  <div className="label-text">Content</div>
                </div>
                <input 
                      type="text"
                      className="input input-boarderd h-32"
                      placeholder='No Content here'
                      value={note.content}
                      onChange={(e) => setNote({...note, content: e.target.value})}
                      />
              </div>

              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>{saving? "Saving..." : "Save Changes"}</button>
              </div>


            </div>
          </div>
        </div>
      </div>
      
    </div>)
    
}
