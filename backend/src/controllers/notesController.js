import Notes from "../../models/note.js";

export async function  getNotes(_, res) {
      try{
        const notes = await Notes.find().sort({createdAt: -1});
        res.status(200).json(notes)
      }catch(error){
            console.error("Error in get all Notes controllers");
            res.status(500).json({message: "Internal server error"})

      }
};

export async function getNotesById(req, res) {
    try{
        const note = await Notes.findById(req.params.id);
        
        if(!note) return res.status(500).json({message: "Can't get the node!"})

        res.status(200).json(note)
    }catch(error){
        console.error("Error in getNotesById controllers");
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createNote(req, res ){
    try{
        const {title, content} = req.body;
        const newNote = new Notes({title, content});
        
        await newNote.save();
        res.status(201).json({message: "Notes created successfuly!"});
    }catch(error){
        console.error("Error in createNote controllers");
        res.status(500).json({message: "Internal server error"})

    }
}

export async function updateNote(req, res){
    try{    
        const {title, content} = req.body;  
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {title, content}, {new: true}, {runValidators: true} );
        
        if(!updatedNote) return res.status(404).json({message: "Can't find the node!"});
        res.status(200).json(updatedNote);

    }catch(error){
        
        console.error("Error in updateNote controllers");
        res.status(500).json({message: "Internal server error"})  
    }
}

export async function deleteNotes(req, res){
    try{    
        const {title, content} = req.body;  
        const deletedNote = await Notes.findByIdAndDelete(req.params.id, {title, content}, {new: true});
        
        if(!deletedNote) return res.status(404).json({message: "Can't find the node!"});

        res.status(200).json({message: "Note deleted successfully"});

    }catch(error){
        
        console.error("Error in deleteNotes controllers");
        res.status(500).json({message: "Internal server error"})  
    }
}

