
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [postSummary, setPostSummary] = useState({ posts: 0, comments: 0, todos: 0 });
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    
    const fetchSummary = async () => {
      try {
        const [postRes, commentRes, todoRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/posts/user/posts'),
          axios.get('https://jsonplaceholder.typicode.com/posts/user/comments'),
          axios.get('https://jsonplaceholder.typicode.com/posts/user/todos'),
        ]);
        
        setPostSummary({
          posts: postRes.data.length,
          comments: commentRes.data.length,
          todos: todoRes.data.length,
        });
        
        setPosts(postRes.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchSummary();
  }, []);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      setPostSummary((prevSummary) => ({ ...prevSummary, posts: prevSummary.posts - 1 }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      
      <div className="summary">
        <h3>Summary</h3>
        <ul>
          <li>Posts: {postSummary.posts}</li>
          <li>Comments: {postSummary.comments}</li>
          <li>To-dos: {postSummary.todos}</li>
        </ul>
      </div>
      
      <div className="post-list">
        <h3>Posts</h3>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
