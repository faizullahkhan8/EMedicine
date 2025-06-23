"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Player from "../Player/Player";

interface ImageSliderProps {
    videos: string[];
}

const ImageCarosuol = ({ videos }: ImageSliderProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            className="my-custom-swiper w-full h-full rounded-lg my-4"
        >
            {videos.map((video, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full full">
                        <Player
                            autoplay={true}
                            loop={true}
                            videoUrl={video}
                            controls={false}
                            width="100%"
                            height="100%"
                            muted={true}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageCarosuol;
