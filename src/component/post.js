import React, { useContext, useRef, useEffect, useState } from 'react'
import '../css/App.css'
import { storage } from '../Firebase';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { AuthContext } from './auth';


const Post = () => {
    const [imgList, setImgList] = useState([]);
    const imgListRef = useRef([]);
    const { currentUser } = useContext(AuthContext)
    const imgListRefFav = useRef([]);
    const [imgListFav, setImgListFav] = useState([]);

    useEffect(() => {
      const imagesRef = ref(storage, `${currentUser.uid}/`);
      listAll(imagesRef)
        .then((res) => Promise.all(res.items.map((item) => getDownloadURL(item))))
        .then((urls) => {
          const sortedUrls = urls.sort((url1, url2) => {
            const index1 = url1.indexOf('?time=');
            const index2 = url2.indexOf('?time=');
            const time1 = parseInt(url1.substring(index1 + 6), 10);
            const time2 = parseInt(url2.substring(index2 + 6), 10);
            return time2 - time1;
          });
          imgListRef.current = sortedUrls; 
          setImgList(sortedUrls.reverse());           
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
      const imagesRefFav = ref(storage, `favourite-${currentUser.uid}/`);
      listAll(imagesRefFav)
        .then((res) => Promise.all(res.items.map((item) => getDownloadURL(item))))
        .then((urls) => {
          const sortedUrls = urls.sort((url3, url4) => {
            const index3 = url3.indexOf('?time=');
            const index4 = url4.indexOf('?time=');
            const time3 = parseInt(url3.substring(index3 + 6), 10);
            const time4 = parseInt(url4.substring(index4 + 6), 10);
            return time4 - time3;
          });
          imgListRefFav.current = sortedUrls; 
          setImgListFav(sortedUrls.reverse()); 
          
        })
        .catch((error) => console.log(error));
    }, []);
    
    const deleteFav = (url) => {
      const imgRef = ref(storage, url);
      deleteObject(imgRef).then(() => {
        const updatedImgList = imgListFav.filter((imgUrl) => imgUrl !== url);
        imgListRefFav.current = updatedImgList;
        setImgListFav(updatedImgList);
      });
    };
    
      const deleteImage = (url) => {
        const imgRef = ref(storage, url);
        deleteObject(imgRef).then(() => {
          const updatedImgList = imgList.filter((imgUrl) => imgUrl !== url);
          imgListRef.current = updatedImgList;
          setImgList(updatedImgList);
          
        });
      };
    return (
        <div className='Post'>
          <div className='fav'>
            {imgListFav.map((url) => {
              return (
                <div key={url}>
                  <img src={url} style={{ maxWidth: '400px', height: 'auto' }} />
                  <div className='btn'>
                    <button class="btn btn-outline-dark" onClick={() => deleteFav(url)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='normal'>
            {imgList.map((url) => {
                return (
                  <div key={url}>
                    <img src={url} style={{ maxWidth: '400px', height: 'auto' }} />
                    <div className='btn'>
                      <button class="btn btn-outline-dark" onClick={() => deleteImage(url)}>Delete</button>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
    )
}

export default Post;

