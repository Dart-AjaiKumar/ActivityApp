import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => { 
    return (
        <article className='post'>
          <Link to = {`post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
          </Link>
          <p>{
            (post.body).length <= 18 ? post.body : `${(post.body).slice(0,18)}...`
          }</p>
        

        </article>
  )
}

export default Post
