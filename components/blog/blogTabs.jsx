"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 

export default function BlogTabs() {
    const [activeTab, setActiveTab] = useState(0); 
    const tabs = [
        "For You",
        "Following",
        "Apple",
        "Android",
        "Deep Learning",
        "Machine Learning",
        "Data Science",
        "Self Improvement",
        "Python",
        "JavaScript",
        "Software Development",
        "Artificial Intelligence",
        "Coding",
        "Software Engineering",
        "React",
        "Web Development",
        "Programming"
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="mx-auto max-w-screen-xl lg:my-8 my-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                freeMode={true}
                className="flex flex-wrap"
            >
                {tabs.map((tab, index) => (
                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                        <a 
                            href="#"
                            role="tab"
                            aria-selected={activeTab === index} 
                            onClick={() => handleTabClick(index)}
                            className={`inline-block px-3 py-2 text-gray-700 border-b-2 rounded-t-lg ${
                                activeTab === index 
                                    ? 'border-gray-700 active text-gray-900' 
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-400'
                            }`}
                        >
                            {tab}
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
