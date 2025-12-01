import axios from "axios";
import { ArrowLeftIcon, FastForward, Loader, TentIcon } from "lucide-react";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";



export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!title.trim() && !content.trim()){
        toast.error("All field are required!")
        return;
      }


        setLoading(true)
        try{
          await api.post("/notes", {
            title,
            content
          });
          toast.success("Note created successfully!")
          navigate("/")
        }catch(error){
          console.log("Error create note", error)
          if(error.resposne.status === 429){
            toast.error("You are creating note so fast, Please slow down", {
              duration : 4000,
              icon:'💀'
            })
          }else{
            toast.error("Error from creating notes")
          }
          toast.error("Faild to create note")
        }finally{
          setLoading(false)
        }

    }

  return (
    <>
    <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
            <div className="max-auto-2xl mx-auto">
                <Link to={"/"} className="btn btn-ghost mb-6">
                    <ArrowLeftIcon className="size-5"/>
                    Back To Notes
                </Link> 
                <div className="card bg-base-100">
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Crate New Notes</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-control mb-4">
                        <div className="label">
                          <span className="label-text">Title</span>
                        </div>
                        <input type="text" 
                               placeholder="No title"
                               className="input input-bordered"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)} 
                        />
                      </div>

                      <div className="form-control mb-4">
                        <div className="label">
                          <span className="lebel-text">
                            Content
                          </span>
                          </div>
                          <input 
                                type="text" 
                                className="input input-bordered h-32"
                                value={content}
                                onChange={(e)=> setContent(e.target.value)}
                                 />
                      </div>

                      
                        <div className="card-actions justify-end">

                            <button
                                 type="submit"
                                 className="btn btn-primary"
                                 disabled={loading}>
                                  {loading? "Creating..." : "Create Note"}
                                 </button>
                        </div>

                    </form>
                  </div>
                </div>
            </div>
        </div>
      
    </div>

    <div>Hello create</div>
    </>
  )
}
