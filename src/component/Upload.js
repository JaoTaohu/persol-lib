import { useRef, useEffect, useState, useContext } from 'react';
import { storage } from '../config';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './auth';


function Upload() {
  const [img, setImg] = useState(null);
  const [imgList, setImgList] = useState([]);
  const imgListRef = useRef([]);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext)

  const uploadImage = () => {
    if (img == null) return;
    const imgRef = ref(storage,`${currentUser.uid}/${img.name + uuid()}`);
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imgListRef.current.unshift(url); // Add the new image to the beginning of the list
        setImgList([...imgListRef.current]); // Update the state with a new copy of the list
        history.push("/lib")
      });
    });
    setImg(null);
    
  };

  useEffect(() => {
    const imagesRef = ref(storage, `${currentUser.uid}/`);
    listAll(imagesRef)
      .then((res) => Promise.all(res.items.map((item) => getDownloadURL(item))))
      .then((urls) => {
        const sortedUrls = urls.sort((url1, url2) => {
          // Sort in descending order of upload time
          const index1 = url1.indexOf('?time=');
          const index2 = url2.indexOf('?time=');
          const time1 = parseInt(url1.substring(index1 + 6), 10);
          const time2 = parseInt(url2.substring(index2 + 6), 10);
          return time2 - time1;
        });
        imgListRef.current = sortedUrls; // Set the initial state of the list to the sorted URLs
        setImgList(sortedUrls);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteImage = (url) => {
    const imgRef = ref(storage, url);
    deleteObject(imgRef).then(() => {
      const updatedImgList = imgList.filter((imgUrl) => imgUrl !== url);
      imgListRef.current = updatedImgList;
      setImgList(updatedImgList);
    });
  };

  return (
    <div className="App">
      <input type='file' onChange={(event) => {setImg(event.target.files[0])}}/>
      <button onClick={uploadImage} >Upload image</button>
      {imgList.map((url) => {
        return (
          <div key={url}>
            <img src={url} style={{ maxWidth: '40%', height: 'auto' }} />
            <button onClick={() => deleteImage(url)}>Delete</button>
          </div>
        );
      })}      
    </div>
  );
}

export default Upload;
