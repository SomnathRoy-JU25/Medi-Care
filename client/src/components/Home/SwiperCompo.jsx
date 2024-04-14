import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper';
import image1 from '../../assets/images/Home/img1.jpg';
import image2 from '../../assets/images/Home/Docs2.jpg';
import image3 from '../../assets/images/Home/Docs3.jpg';
import image5 from '../../assets/images/Home/Docs6.jpg';
import image6 from '../../assets/images/Home/Docs1.jpg';
import image4 from "../../assets/images/heroimg.jpg";
import '../../styles/App.css';

const images = [image1, image2, image3, image5, image6,image4];

const SwiperCompo = () => {
  return (
    <> 
      <div>
        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div>
                <img className="img" src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperCompo;
