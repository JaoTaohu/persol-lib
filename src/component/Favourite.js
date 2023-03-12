import { useRef, useState, useContext } from 'react';
import { storage } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { Redirect } from 'react-router-dom';
import { AuthContext } from './auth';
import Navibar from './navibar';
import imgg from '../css/imgg.jpg'


function Fav() {
  const [img, setImg] = useState(null);
  const [imgList, setImgList] = useState([]);
  const imgListRef = useRef([]);
  const { currentUser } = useContext(AuthContext);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadimg, setLoad] = useState(false);
  const [nonshow, setnonshow] = useState(true)

  const uploadImage = () => {
    if (img == null) return;
    const imgRef = ref(storage,`favourite${currentUser.uid}/${img.name + uuid()}`);
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        imgListRef.current.unshift(url); 
        setImgList([...imgListRef.current]); 
        setLoad(true);
      });
    });
    setImg(null);
    setPreviewUrl(null);
  };
  if (loadimg) {
     return <Redirect to="/lib" />;
}
  const handleImgChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
    setPreviewUrl(URL.createObjectURL(file));
    setnonshow(false);
  };

  return (
    <>
        <Navibar /> 
        <div className='containerfav'>           
            <div className="Upload">
            <input style={{display: "none" }}type='file' id='file' onChange={handleImgChange}/>
            <label htmlFor='file'>
              {nonshow && <img src={imgg} style={{ maxWidth: '300px', maxheight: '300px', borderRadius: '10px'}}/>}
              {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '600px', maxheight: '600px', borderRadius: '10px' }}/>}
            </label>
            <div className='btn'>
              <button class="btn btn-outline-light" onClick={uploadImage} >Upload image</button>
            </div>
            </div>
        </div>
    </>
    
  );
}

export default Fav;
