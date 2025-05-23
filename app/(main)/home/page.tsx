"use client";

import {
  ChartPie,
  ChevronLeft,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import customSwiper from "./swiper.module.css";
import { useRef, useState } from "react";
import NewsCard from "./NewsCard";
import SubNewsCard from "./SubNewsCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["반도체", "전기", "코로나19", "자동차", "IT"],
  datasets: [
    {
      // label: "",
      data: [20, 13, 7, 6, 1],
      backgroundColor: [
        "rgba(255, 99, 132, .2)",
        "rgba(54, 162, 235, .2)",
        "rgba(255, 206, 86, .2)",
        "rgba(75, 192, 192, .2)",
        "rgba(153, 102, 255, .2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, .1)",
        "rgba(54, 162, 235, .1)",
        "rgba(255, 206, 86, .1)",
        "rgba(75, 192, 192, .1)",
        "rgba(153, 102, 255, .1)",
      ],
      borderWidth: 1,
    },
  ],
};

const newsList = [
  {
    title: "정부, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    desc: "정부가 오늘 새로운 경제 정책을 발표했습니다. 이번 정책은 일자리 창출과 경제 성장에 초점을 맞추고 있으며, 다양한 산업 분야에 대한 지원책을 포함하고 있습니다.",
    source: "어디어디 뉴스",
    time: "2시간 전",
  },
  {
    title: "정부123, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    desc: "정부가 오늘 새로운 경제 정책을 발표했습니다. 이번 정책은 일자리 창출과 경제 성장에 초점을 맞추고 있으며, 다양한 산업 분야에 대한 지원책을 포함하고 있습니다.",
    source: "어디어디 뉴스",
    time: "2시간 전",
  },
  {
    title: "정부456, 새로운 경제 정책 발표... 일자리 창출과 경제 성장에 초점",
    desc: "정부가 오늘 새로운 경제 정책을 발표했습니다. 이번 정책은 일자리 창출과 경제 성장에 초점을 맞추고 있으며, 다양한 산업 분야에 대한 지원책을 포함하고 있습니다.",
    source: "어디어디 뉴스",
    time: "2시간 전",
  },
];

const HomePage = () => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="grid grid-cols-4 gap-4">
        <div className="relative row-span-2 col-span-2 rounded-[10px] group shadow-color">
          <button
            className={customSwiper["swiper-button-prev"]}
            onClick={() => {
              swiper?.slidePrev();
            }}
          >
            <ChevronLeft size={20} className="text-main-dark-gray" />
          </button>
          <Swiper
            modules={[Navigation, Autoplay, EffectFade, Pagination]}
            effect="fade"
            navigation={{
              nextEl: customSwiper["swiper-button-next"],
              prevEl: customSwiper["swiper-button-prev"],
            }}
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}
            // onBeforeInit={(swiper) => {
            //   if (swiper) {
            //     swiper.params.navigation.nextEl =
            //       customSwiper["swiper-button-next"];
            //     swiper.params.navigation.prevEl =
            //       customSwiper["swiper-button-prev"];
            //   }
            // }}
            pagination
            fadeEffect={{ crossFade: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="rounded-[10px]  shadow-color size-full relative"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {newsList.map((news, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <div className="relative h-full bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-[20px]">
                  <h1 className="text-3xl font-bold text-white mb-2 truncate">
                    {news.title}
                  </h1>
                  <p className="text-white/80 text-base mb-4 line-clamp-2">
                    {news.desc}
                  </p>
                  <div className="flex items-center text-white/70 text-sm gap-2">
                    <p className="text-main-gray">{news.source}</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* <div
              className={`${customPagination["swiper-pagination"]}`}
              ref={paginationRef}
            ></div> */}
          </Swiper>

          <button
            className={customSwiper["swiper-button-next"]}
            onClick={() => {
              swiper?.slideNext();
            }}
          >
            <ChevronRight size={20} className="text-main-dark-gray" />
          </button>
        </div>

        <div className="grid grid-cols-2 col-span-2 gap-4 rounded-[10px] shadow-color p-[20px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <SubNewsCard
              key={index}
              news={{
                id: index.toString(),
                title: "주요 기업들, 2분기 실적adfaefaefa",
                desc: "",
                source: "어디어디 뉴스",
                time: "4시간 전",
              }}
            />
          ))}
        </div>

        <div className="flex flex-col col-span-2 gap-main">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 rounded-main shadow-color p-[20px] flex flex-col gap-1">
              <h3 className="text-lg font-bold flex items-center">
                <TrendingUp size={20} className="mr-2 text-main-red" />
                실시간 키워드
              </h3>

              {["반도체", "전기", "코로나19", "자동차", "IT"].map(
                (title, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 last:border-0"
                  >
                    <span className="font-bold text-lg">{index + 1}</span>
                    <Link
                      href="#"
                      className="text-sm font-medium hover:underline line-clamp-1"
                    >
                      {title}
                    </Link>
                  </div>
                )
              )}
            </div>
            <div className="col-span-3 rounded-main shadow-color p-[20px]">
              {/* <h3 className="text-lg font-bold flex items-center">
            <ChartPie size={20} className="mr-2 text-main-red" />
            키워드
          </h3> */}

              <div className="size-full">
                <Pie
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "rectRounded",
                        },
                      },
                    },
                    maintainAspectRatio: false,
                  }}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{"홍길동"}님을 위한 맞춤 뉴스</h2>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <NewsCard
              key={index}
              news={{
                id: index.toString(),
                title: "주요 기업들, 2분기 실적adfaefaefa",
                desc: "",
                source: "어디어디 뉴스",
                time: "4시간 전",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="grid col-span-3 gap-4 rounded-[10px] shadow-color p-[20px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                지금 사람들이 많이 보는 뉴스
              </h2>
              <span>드롭다운 등등..</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SubNewsCard
                  key={index}
                  news={{
                    id: index.toString(),
                    title: "주요 기업들, 2분기 실적adfaefaefa",
                    desc: "",
                    source: "어디어디 뉴스",
                    time: "4시간 전",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid col-span-2 gap-4 rounded-[10px] shadow-color p-[20px]"></div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">모든 주요 뉴스</h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <SubNewsCard
              key={index}
              hasDesc
              news={{
                id: index.toString(),
                title: "주요 기업들, 2분기 실적adfaefaefaaewfijaowiefjoa;iwefj",
                desc: "상세내용입니다",
                source: "어디어디 뉴스",
                time: "4시간 전",
              }}
            />
          ))}
        </div>
        <div className="w-full flex justify-center border-t border-main-dark-gray/20 pt-main mt-main">
          <button className="w-full px-6 py-2 rounded-main text-dark-gray font-semibold hover:bg-main-light-gray/50 transition-colors">
            더 많은 뉴스 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
