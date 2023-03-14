import Posts from "../src/Pages/Posts/Posts";
import Post from "../src/Pages/Post/Post";
import { Routes, Route} from "react-router-dom";
// import Post from "./Pages/Post/Post";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Posts/>}/>
      <Route path="/post/:id" element={<Post/>}/>
    </Routes>
     
    </>
  );
};

export default App;