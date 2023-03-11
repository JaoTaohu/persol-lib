import { useRef, useState, useContext } from 'react';
import { storage } from '../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './auth';


function Upload() {
  const [img, setImg] = useState(null);
  const [imgList, setImgList] = useState([]);
  const imgListRef = useRef([]);
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [previewUrl, setPreviewUrl] = useState(null);

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
    setPreviewUrl(null);
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="App">
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '40%', height: 'auto' }}/>}
      <input type='file' onChange={handleImgChange}/>
      <button onClick={uploadImage} >Upload image</button>
    </div>
  );
}

export default Upload;
