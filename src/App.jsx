import Accordian from "./components/Accordian/Accordian";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Star from "./components/StarRating/Star";
import "./index.css";

function App() {
  return (
    <>
      <div className="snap-mandatory snap-y overflow-y-scroll h-screen">
        <Accordian />
        <Star />
        <ImageSlider
          URl={"https://picsum.photos/v2/list"}
          page={1}
          limit={"10"}
        />
      </div>
    </>
  );
}

export default App;
