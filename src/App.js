import { useEffect, useState } from 'react';
import About from './About';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import { format } from 'date-fns';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from "./api/posts"
import EditPost from './EditPost';

function App() {

  const[posts,setPosts] =useState([])
  const[search, setSearch]= useState('')
  const[searchresults, setSearchresults] =useState([])
  const[posttitle, setPosttitle]=useState('')
  const[postbody, setPostbody]=useState('')
  const[edittitle, setEdittitle]=useState('')
  const[editbody, setEditbody]=useState('')
  const navigate = useNavigate()

  useEffect(() =>{
    const fetchPosts = async () =>{
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        console.log(err.message);
      }
    }
    fetchPosts();
  },[])

  useEffect(() =>{
    const filterResults = posts.filter((posts) => ((posts.body).toLowerCase()).includes(search.toLowerCase()) || ((posts.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchresults(filterResults.reverse());
  },[posts, search])

  const handleSubmit =async(e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd yyyy pp');
    const newPost = {id,title:posttitle,datetime,body : postbody};
    try{
      const response = await api.post("/posts",newPost)
      const allPosts =[...posts,response.data]; 
      setPosts(allPosts);
      setPostbody('');
      setPosttitle('');
      navigate('/');

    }catch(err)
    {
      console.log(err.message);
    }
  }
  const handleEdit = async(id) =>{
    const datetime = format(new Date(),'MMMM dd yyyy pp');
    const updatedPost = {id,title:edittitle,datetime,body : editbody};
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setPostbody('');
      setPosttitle('');
      navigate('/');
    }catch(err)
    {
      console.log(err.message);
    }
  }

  const handleDelete =async(id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList)
      navigate('/');
    }catch(err)
    {
      console.log(err.message);
    }
   
  }
  return(
    <div className='App'>
      
      <Header title = "Twweet App" />
      <Nav
          search ={search}
          setSearch={setSearch}
      />
      <Routes>
        <Route path ="/" element = {<Home posts={searchresults}/> }/>
        <Route path ="post">
          <Route index element ={<NewPost 
          handleSubmit ={handleSubmit}
          posttitle={posttitle}
          setPosttitle={setPosttitle}
          postbody={postbody}
          setPostbody={setPostbody}
          />} />
          <Route path=":id" element={<PostPage posts ={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="/edit/:id" element ={<EditPost
        posts={posts}
         handleEdit={handleEdit}
         editbody={editbody}
         setEditbody={setEditbody}
         edittitle={edittitle}
         setEdittitle={setEdittitle}
        />}/>
        <Route path ="about" element ={<About/>}/>
        <Route path="*" element ={<Missing/>}/>
      </Routes>
      <Footer/> 
    </div>
  ) 
   
  
}

export default App;
