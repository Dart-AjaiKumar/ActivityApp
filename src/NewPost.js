import React from 'react'

const NewPost = ({posttitle,postbody,setPosttitle,setPostbody,handleSubmit}) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title :</label>
          <input
            type = "text"
            placeholder='Title'
            required
            value={posttitle}
            onChange={(e) => setPosttitle(e.target.value)}
          /><br/>
          <label htmlFor='title'>Post:</label>
          <textarea
            placeholder='Body'
            required
            value={postbody}
            onChange={(e) => setPostbody(e.target.value)} 
          /><br/>
          <button type="submit">Twweet</button>

        </form>
    </main>
  )
}

export default NewPost
