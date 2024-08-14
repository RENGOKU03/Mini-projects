import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ImageSlider = ({ limit = 5, URl, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (URl !== "") fetchImages(URL);
  }, [URl]);

  function handelPreviousClick() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handelNextClick() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }
  if (loading) {
    return (
      <div>
        <h1>Image is Loading</h1>
      </div>
    );
  }
  if (errorMsg !== null) {
    return (
      <div>
        <h1>Error Occured {errorMsg}</h1>
      </div>
    );
  }
  return (
    <div className="h-screen bg-yellow-200 flex snap-start">
      <div className="relative m-auto w-[600px] h-[600px]">
        <h1 className="text-5xl font-semibolds text-center p-10">
          Image Slider
        </h1>
        {images && images.length
          ? images.map((imageItem, index) => (
              <div className="">
                <img
                  key={imageItem.id}
                  className={`object-cover w-full h-full rounded-xl  ${
                    currentSlide === index ? "" : "hidden"
                  }`}
                  src={imageItem.download_url}
                  alt={imageItem.download_url}
                />
              </div>
            ))
          : null}
        <div className="flex gap-3 justify-center items-center absolute left-[20%] bottom-[12%] p-5 bg-transparent/50 rounded-xl ">
          {images && images.length
            ? images.map((imageItem, index) => (
                <button className="hover:animate-ping">
                  <FaCircle
                    style={{
                      backgroundColor: "white",
                      borderRadius: "100px",
                    }}
                    color={`${currentSlide === index ? "Red" : "Yellow"}`}
                    size={"25px"}
                    onClick={() => setCurrentSlide(index)}
                  />
                </button>
              ))
            : null}
        </div>
        <button
          className="absolute top-[50%] left-5"
          onClick={handelPreviousClick}
        >
          <FaArrowAltCircleLeft
            size={"35px"}
            color="white"
            style={{
              backgroundColor: "black",
              borderRadius: "100px",
            }}
          />
        </button>

        <button
          className="absolute top-[50%] right-5"
          onClick={handelNextClick}
        >
          <FaArrowAltCircleRight
            size={"35px"}
            color="white"
            style={{
              backgroundColor: "black",
              borderRadius: "100px",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
