import "./index.css";
import Accordian from "./components/Accordian/Accordian";
import DarkMode from "./components/DarkMode/DarkMode";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import LoadMoreData from "./components/LoadMoreData/LoadMoreData";
import QrCodeMaker from "./components/QrCodeMaker/QrCodeMaker";
import Star from "./components/StarRating/Star";
import menus from "./components/TreeView/Data";
import TreeView from "./components/TreeView/TreeView";
import Tabs from "./components/Tabs/Tabs";
import ModalToggle from "./components/Modal/ModalToggle";
import Profile from "./components/Github-profile-finder/profile";
import Search from "./components/SearchAutoComplete/Search";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import CustomHook from "./components/UseFetch/CustomHook";
import OutsideClick from "./components/ClickOutsideClose/OutsideClick";
import Scroll from "./components/ScrollToTopAndBottom/Scroll";
import ScrollToSection from "./components/ScrollToTopAndBottom/ScrollToSection";

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
        <Tabs />
        <ModalToggle />
        <Profile />
        <Search />
        <TicTacToe />
        <CustomHook />
        <OutsideClick />
        <Scroll />
        <ScrollToSection />
      </div>
    </>
  );
}

export default App;
