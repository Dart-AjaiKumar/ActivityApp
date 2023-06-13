import React from 'react'
import { useParams ,Link } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {

  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className='postpage'>
        {console.log("hello")}
       <article>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            <Link to ={`/edit/${post.id}`}><button className='editbutton'>Edit Post</button></Link>
            <button className='deletebutton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <Link to = '/'>Visit Our Home Page</Link>
          </>
        }
       </article>
    </main>
  )
}

export default PostPage
