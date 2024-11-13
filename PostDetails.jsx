
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://api.example.com/user/posts/${postId}`);
        setPost(response.data);
        setBody(response.data.body);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSave = async () => {
    try {
      
      await axios.put(`https://api.example.com/user/posts/${postId}`, { body });
      setMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      setMessage("Failed to save changes.");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={handleBodyChange}
          rows="5"
          cols="50"
        />
      </div>
      
      <button onClick={handleSave}>Save Changes</button>
      {message && <p>{message}</p>}
      
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default PostDetails;
