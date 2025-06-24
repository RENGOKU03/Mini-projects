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
import TicTacToe from "./components/TicTacToe/TicTacToe";
import OutsideClick from "./components/ClickOutsideClose/OutsideClick";
import UserSearchAutocomplete from "./components/SearchAutoComplete/Search";
import Profile from "./components/Github-profile-finder/Profile";

function App() {
  return (
    <>
      <div className="">
        <Accordian />
        <Star />
        <ImageSlider
          URl={"https://picsum.photos/v2/list"}
          page={1}
          limit={"10"}
        />
        <div>
          <LoadMoreData />
        </div>
        <TreeView menus={menus} />
        <QrCodeMaker />
        <DarkMode />
        <Tabs />
        <ModalToggle />
        <Profile />
        <UserSearchAutocomplete />
        <TicTacToe />
        <OutsideClick />
      </div>
    </>
  );
}

export default App;
