
import { SceneNavigator } from './components/SceneNavigator';
import { FireworksOverlay } from './components/FireworksOverlay';
import { IntroScene } from './scenes/IntroScene';
import { TeaserScene } from './scenes/TeaserScene';
import { DetailsScene } from './scenes/DetailsScene';
import { PhotoScene } from './scenes/PhotoScene';
import { RsvpScene } from './scenes/RsvpScene';
import { FinalScene } from './scenes/FinalScene';
import './styles/global.css';

function App() {
  const scenes = [
    IntroScene,
    TeaserScene,
    DetailsScene,
    PhotoScene,
    RsvpScene,
    FinalScene
  ];

  return (
    <>
      <FireworksOverlay />
      <SceneNavigator scenes={scenes} />
    </>
  );
}

export default App;
