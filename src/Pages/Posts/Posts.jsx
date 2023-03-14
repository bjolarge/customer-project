import config from '../../config.json';
import axios from "axios";
import { useEffect, useState } from "react";
import "./Posts.css";
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async() =>{
      const {data} = await axios.get(config.apiUrl);   
      setPosts(data);
    };
    fetchPosts();
  },[]);

  const handleDelete = async(post)=>{
    try {
      setPosts(posts.filter(p=>p.id !== post.id));
      await axios.delete(`${config.apiUrl}/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <div className="posts">
      <div className="container">
        <button onClick={()=>navigate("/post/new")} className="btn btn-primary mb-4">New Post</button>
      <table className="table">
       <thead>
        <tr>
          <th>Title</th> 
          <th>Category</th>
          <th>Update</th>
          <th>Delete</th>
          </tr>
          </thead> 
          <tbody>
            {posts.map((post)=>(
             <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td><button onClick={()=> navigate(`/post/${post.id}`)}className="btn btn-primary">Update</button></td>
              <td><button onClick={()=>handleDelete(post)} className="btn btn-danger">Delete</button></td>
             </tr>
              ))}
          </tbody>
      </table>
      </div>
    </div>
  );
};

export default Posts