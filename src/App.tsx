
import { Images } from './components/Images';
import { Videos } from './components/Videos';
import { Button } from './components/elements/Button';
import { GeneralStore } from './store/GeneralStore';

function App() {
  const { tab, setTab } = GeneralStore();

  return (
    <section>
    <div className="flex justify-between">
      <Button onClick={() => setTab("image")} text="image" />
      <Button onClick={() => setTab("video")} text="video" />
    </div>
    {tab === "image" && <Images />}
    {tab === "video" && <Videos />}
  </section>
  )
}

export default App
