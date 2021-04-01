import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const images = [
  'https://cdn-blfpb.nitrocdn.com/KXssXvFtwdXSbxzghIjAxqLViXMHOnkX/assets/static/optimized/rev-0cf1de5/wp-content/uploads/2021/03/Banner-Trusted-Feb-2021.png',
  'https://cdn-blfpb.nitrocdn.com/KXssXvFtwdXSbxzghIjAxqLViXMHOnkX/assets/static/optimized/rev-0cf1de5/wp-content/uploads/2020/08/vegan-protein-2508.png',
  'https://cdn-blfpb.nitrocdn.com/KXssXvFtwdXSbxzghIjAxqLViXMHOnkX/assets/static/optimized/rev-0cf1de5/wp-content/uploads/2019/10/2-2.jpg'
];

const Slideshow = () => {
  return (
    <div className="slide-container">
        <Zoom scale={0.4} autoplay>
          {
            images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
          }
        </Zoom>
      </div>
  )
}

export default Slideshow;
