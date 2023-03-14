import config from "../../config.json";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Post.css";
import { useNavigate, useParams } from "react-router-dom";
const Post = () => {
  const navigate = useNavigate();
  const{id} = useParams();

  const [post, setPost] = useState({
    title:"",
    content:"",
  });

  useEffect(()=>{
    if(id==="new") return;
    const fetchPost = async()=>{
      const{data} = await axios.get(`${config.apiUrl}/${id}`);
      setPost(data);
    };
    fetchPost();
  });

  const handleChange = (e)=>{
    const postClone = {...post};
    postClone[e.target.name] = e.target.value;
    setPost(postClone)
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

   try {
    if(id==='new') {
      axios.post(config.apiUrl, post);
      return navigate("/");
    }else{
      axios.put(config.apiUrl + '/' +id, post);
      return navigate("/");
    }
   } catch (error) {
    console.log(error);
   }
  };

return(
    <div className="post__wrapper">
      <div className="container">
        <form className="post">
          <input type="text" placeholder="Title..." value={post.title} name="title" onChange={handleChange} />
          <input type="text" placeholder="Description" value={post.description} name="description" onChange={handleChange} />
          <button onClick={handleSubmit} className="btn btn-primary">
            {id==='new'?'Post':"update"}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Post;