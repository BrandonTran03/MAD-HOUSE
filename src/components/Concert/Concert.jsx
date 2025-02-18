import React, { useEffect } from 'react';
import {useState} from 'react';
import {storage} from "../../firebase";
import {ref, uploadBytes, listAll, getDownloadURL, refFromURL} from "firebase/storage";
import {v4} from "uuid";
import grip from "../../images/DGEP.png";
import file from "../../images/filePic.png";
import folder from "../../images/folder_direct.png";
import Guillotine from "../../database/01 Guillotine.mp4";
import Fever from "../../database/02 The Fever.mp4";
import Footage from "../../database/03 I've Seen Footage.mp4";
import Takyon from "../../database/03 Takyon.mp4";
//lostClashMusicInterview.jpg
import './Concert.css';

const Concert = () => {
     const [imageUpload, setImageUpload] = useState(null);
     const [imageList, setImageList] = useState([]);
     const imageListRef = ref(storage, 'concert/');
     const uploadImage = () => {
          if (imageUpload == null) return;
          const imageRef = ref(storage, ('concert/' + imageUpload.name))
          uploadBytes(imageRef, imageUpload).then((snapshot) => {
               alert("File Uploaded");
               getDownloadURL(snapshot.ref).then((url) => {
                    setImageList((prev) => [...prev, url])
               })
          });
     };

     useEffect(() => {
          listAll(imageListRef).then((response) => {
               response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                         setImageList((prev) => [...prev, url]);
                    })
               })
          })
     }, []);

     const scrollToTop = () => {
          window.scrollTo(0, 0)
      }
     return (
          <div className="Interview">
                           <div class="navbar"></div>
               <div class="name_title">
                    <div class = "name_title_text">Death Grips</div>
               </div>

               <img class="grip" src={grip}></img>

               <img class="folder_int" src={folder}></img>
               <div class = "int_text">Concert Footage</div>
               <div class="bio1">Stefan Burnett, Andy Morin, and Zach Hill
are not very well known for doing interviews
and its contributed to the mystique of Death 
Grips and not much is known about their personal
lives. With the exception of Zach Hill’s 
involvement in the band Hella, Andy Morin’s 
running the label A2B2, Ride (Stefan Burnett) 
does not have social media and not much is 
known about him.

</div>

               <div class = "name_display_title">
                    <div class = "name_display5">Download</div>
                    <div class = "name_display1">Name (view)</div>
                    <div class = "name_display2">Size</div>
                    <div class = "name_display">Type</div>
               </div>
               <div class = "file_row">
                    
                         <a href={Guillotine} download>
                         <img class="filePicture" src={file}></img>
                         </a>
                    <div class = "filePicture_text1">
                         <a href= {Guillotine} target="_blank">2011/06/05 - Sacremento, California [Guillotine]</a> 
                    </div>
                    <div class = "filePicture_text4">114 MB</div>
                    <div class = "filePicture_text3">MP4</div>
               </div>

               <div class = "marginal"></div>


               <div class = "file_row">

                    <a href={Fever} download>
                         <img class="filePicture" src={file}></img>
                    </a>
                    <div class = "filePicture_text1">
                         <a href = {Fever} target="_blank">2013/07/13 - Ottawa, Ontario [The Fever (Aye, Aye)]</a>
                    </div>
                    <div class = "filePicture_text4">66.9MB</div>
                    <div class = "filePicture_text3">MP4</div>
               </div>

               <div class = "marginal"></div>

               <div class = "file_row">

                    <a href={Takyon} download>
                         <img class="filePicture" src={file}></img>
                    </a>
                    <div class = "filePicture_text1">
                         <a href = {Takyon} target="_blank">2011/06/05 - Sacremento, California [Takyon]</a>
                    </div>
                    <div class = "filePicture_text4">93.7MB</div>
                    <div class = "filePicture_text3">MP4</div>
               </div>

               <div class = "marginal"></div>

               <div class = "file_row">

                    <a href={Footage} download>
                         <img class="filePicture" src={file}></img>
                    </a>
                    <div class = "filePicture_text1">
                         <a href = {Footage} target="_blank">2013/07/13 - Ottawa, Ontario [I've Seen Footage]</a>
                    </div>
                    <div class = "filePicture_text4">105 MB</div>
                    <div class = "filePicture_text3">MP4</div>
               </div>

               <input class="upload_box" type="file" onChange={(event) => {setImageUpload(event.target.files[0]);}}/>
               <button class = "submission" onClick={uploadImage}>Upload</button>
               <div class = "evenal"></div>
               {imageList.map((url) => {
                    let link = new String(url + "\n");
                    const filename = link.split('/').pop().split('?')[0];
                    const decodedString = decodeURIComponent(filename);
                    const filename1 = decodedString.split('/').pop();
                    return <a class = "linked" href = {url} target= "blank">{(filename1)}</a>
                    //<img src={url}/>;
               })}
               <div class = "marginal"></div>
               <div class="navbar"></div>
          </div>
     );
};

export default Concert;