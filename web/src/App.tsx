import { Images } from "./components/Images";
import { Videos } from "./components/Videos";
import { Tabs } from "./components/elements/Tabs";
import { ImageDownload } from "./components/images/ImageDownload";
import { GeneralStore } from "./store/GeneralStore";

function App() {
  const { tab } = GeneralStore();

  return (
    <section>
      <div className="flex justify-between">
        {/* <Button onClick={() => setTab("image")} text="image" />
      <Button onClick={() => setTab("video")} text="video" /> */}
        <ImageDownload />
        <Tabs />
      </div>
      {tab === "image" && <Images />}
      {tab === "video" && <Videos />}
    </section>
  );
}

export default App;
