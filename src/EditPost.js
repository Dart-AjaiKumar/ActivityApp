import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({posts,edittitle,editbody,setEditbody,setEdittitle,handleEdit}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  useEffect(() =>{
    if(post){
      setEditbody(post.body)
      setEdittitle(post.title)
    }
  },[post,setEditbody,setEdittitle])

  return (
    <main className="NewPost">
      {edittitle &&
      <>
        <h2>Edit Post</h2>
        <form onSubmit={(e) =>e.preventDefault()}>
        <label htmlFor='title'>Title :</label>
          <input
            type = "text"
            required
            value={edittitle}
            onChange={(e) => setEdittitle(e.target.value)}
          /><br/>
          <label htmlFor='title'>Post:</label>
          <textarea
            required
            value={editbody}
            onChange={(e) => setEditbody(e.target.value)} 
          /><br/>
          <button type="submit" onClick={()=>handleEdit(post.id)}>Twweet</button>

        </form>
      </>

      }
      
    </main>
  )
}

export default EditPost

