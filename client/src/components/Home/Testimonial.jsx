import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/free-mode';

import { Autoplay, FreeMode, Pagination } from 'swiper';

import image1 from '../../assets/images/Home/img1.jpg';
import image2 from '../../assets/images/Home/Docs2.jpg';
import image3 from '../../assets/images/Home/Docs3.jpg';
import image5 from '../../assets/images/Home/Docs6.jpg';
import image6 from '../../assets/images/Home/Docs1.jpg';
import image4 from "../../assets/images/heroimg.jpg";

const Testimonial = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReview = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const showLess = () => {
    setExpandedIndex(null);
  };

  return (
    <div className='w-11/12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl'>
      <div className="text-3xl font-bold text-center mt-10 content-center justify-center">Our Reviews</div>
      <div className="mt-20">
        <Swiper
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="swiper-container"
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
        >
          {data.map((d, index) => (
            <SwiperSlide key={index}>
              <div key={d.name} className={`bg-white text-black rounded-xl shadow-lg mb-7 mx-auto ${expandedIndex === index ? 'h-auto' : 'h-[530px]'}`}>
                <div className='h-56 bg-indigo-950 hover:bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                  <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                  <p className="text-2xl font-semibold text-center">{d.name}</p>
                  <p className={`text-lg text-center ${expandedIndex === index ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
                    {expandedIndex === index ? d.review : `${d.review.substring(0, 100)}...`}
                  </p>
                  {expandedIndex !== index ? (
                    <button onClick={() => toggleReview(index)} 
                    className='bg-purple-700 text-white text-lg px-6 py-2 rounded-xl hover:bg-purple-900
                    transition-colors duration-300 ease-in-out'>Read More</button>
                  ) : (
                    <button onClick={showLess} 
                    className='bg-purple-700 text-white text-lg px-6 py-2 rounded-xl hover:bg-purple-900
                    transition-colors duration-300 ease-in-out'>Show Less</button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const data = [
  {
    name: `John Morgan`,
    img: image1,
    review: `As a senior citizen, finding reliable medical care has been crucial for me. My experience with My Medicare has been exceptional. Their staff is compassionate and knowledgeable, and they provide comprehensive healthcare services. I highly recommend My Medicare to anyone seeking top-notch medical care.`,
  },
  {
    name: `Ellie Anderson`,
    img: image2,
    review: `I've been a patient at My Medicare for years, and I can't speak highly enough about the quality of care I've received. From routine check-ups to specialized treatments, their healthcare professionals are dedicated to ensuring their patients' well-being. Thank you, My Medicare, for always putting patients first!`,
  },
  {
    name: `Nia Adebayo`,
    img: image3,
    review: `Choosing My Medicare for my healthcare needs was one of the best decisions I've made. Their team goes above and beyond to address my concerns and provide personalized care. Whether it's preventative care or managing chronic conditions, I trust My Medicare to keep me healthy and happy.`,
  },
  {
    name: `Rigo Louie`,
    img: image4,
    review: `I've had the pleasure of being a patient at My Medicare for several years now, and I couldn't be more satisfied with the level of care I receive. The medical staff is professional, courteous, and always willing to listen. My Medicare truly sets the standard for excellence in healthcare.`,
  },
  {
    name: `Mia Williams`,
    img: image5,
    review: `My experience with My Medicare has been nothing short of fantastic. From the moment I walked in, I felt welcomed and valued as a patient. The doctors take the time to explain everything thoroughly, and I appreciate the emphasis on preventive care. I wholeheartedly recommend My Medicare to anyone looking for quality healthcare services.`,
  },
  {
    name: `Mia Williams`,
    img: image6,
    review: `Finding a healthcare provider you can trust is essential, and I'm grateful to have found that in My Medicare. Their team is dedicated to providing comprehensive, patient-centered care, and it shows in everything they do. Thank you, My Medicare, for keeping my health a top priority.`,
  },
];

export default Testimonial;
