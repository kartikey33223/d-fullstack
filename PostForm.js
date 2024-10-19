// PostForm.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

const PostForm = () => {
  const [postType, setPostType] = useState('Article');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Function to handle image upload to Firebase
  const handleImageUpload = async () => {
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      setUploading(true);
      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
        setUploading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    }
  };

  // Function to handle form submission
  const handlePostSubmit = async () => {
    const postData = {
      postType,
      title,
      abstract,
      articleText,
      tags: tags.split(',').map(tag => tag.trim()), // Split tags by commas
      imageUrl,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'posts'), postData);
      console.log('Post successfully saved!');
      // Reset form
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      setImageUrl('');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="post-form">
      <h2>New Post</h2>

      <div>
        <label>Select Post Type:</label>
        <input
          type="radio"
          value="Question"
          checked={postType === 'Question'}
          onChange={() => setPostType('Question')}
        /> Question
        <input
          type="radio"
          value="Article"
          checked={postType === 'Article'}
          onChange={() => setPostType('Article')}
        /> Article
      </div>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
        />
      </div>

      {postType === 'Article' && (
        <>
          <div>
            <label>Add an image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button onClick={handleImageUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {imageUrl && <p>Image uploaded: <a href={imageUrl} target="_blank" rel="noreferrer">View Image</a></p>}

          <div>
            <label>Abstract</label>
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Enter a 1-paragraph abstract"
            />
          </div>

          <div>
            <label>Article Text</label>
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="Enter article text"
            />
          </div>
        </>
      )}

      <div>
        <label>Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Please add up to 3 tags to describe what your article is about, e.g., Java"
        />
      </div>

      <button onClick={handlePostSubmit}>Post</button>
    </div>
  );
};

export default PostForm;
