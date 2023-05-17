
import { Images } from './components/Images';
import { Videos } from './components/Videos';
import { Tabs } from './components/elements/Tabs';
import { GeneralStore } from './store/GeneralStore';

function App() {
  const { tab } = GeneralStore();

  return (
    <section>
    <div className="flex justify-between">
      <Tabs />
    </div>
    {tab === "image" && <Images />}
    {tab === "video" && <Videos />}
  </section>
  )
}

export default App
