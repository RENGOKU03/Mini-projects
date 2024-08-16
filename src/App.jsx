import Accordian from "./components/Accordian/Accordian";
import DarkMode from "./components/DarkMode/DarkMode";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import LoadMoreData from "./components/LoadMoreData/LoadMoreData";
import QrCodeMaker from "./components/QrCodeMaker/QrCodeMaker";
import Star from "./components/StarRating/Star";
import menus from "./components/TreeView/Data";
import TreeView from "./components/TreeView/TreeView";
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
        <div className="snap-start">
          <LoadMoreData />
        </div>
        <TreeView menus={menus} />
        <QrCodeMaker />
        <DarkMode />
      </div>
    </>
  );
}

export default App;
