import './App.css';
import Navbar from './modules/navbar/Navbar';

import { useDispatch } from 'react-redux';
import { loadStateTree } from './state/reducer';
import PanelGroupList from './modules/group_list/GroupList';
import HoneycombColorChooser from './widgets/HoneycombColorChooser';
import PanelSettingsModal from './modules/panel_settings/PanelSettingsModal';
import GroupSettingsModal from './modules/panel_settings/GroupSettingsModal';

function App() {
  const dispatch = useDispatch();
  loadStateTree(dispatch);


  return (
    <div className="App">
      <PanelSettingsModal/>
      <GroupSettingsModal/>
      <div className="container-fluid">
        <Navbar/>
        <PanelGroupList/>
        {/*<HoneycombColorChooser/>*/}
      </div>
    </div>
  );
}

export default App;
