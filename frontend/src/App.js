import './App.css';
import Navbar from './modules/navbar/Navbar';

import { useDispatch } from 'react-redux';
import { loadShadowTree, loadStateTree } from './state/reducer';
import PanelGroupList from './modules/group_list/GroupList';
import PanelSettingsModal from './modules/panel_settings/PanelSettingsModal';
import GroupSettingsModal from './modules/panel_settings/GroupSettingsModal';

function App() {
  const dispatch = useDispatch();
  loadShadowTree(dispatch);
  loadStateTree(dispatch);


  return (
    <div className="App">
      <PanelSettingsModal/>
      <GroupSettingsModal/>
      <div className="container-fluid">
        <Navbar/>
        <PanelGroupList/>
      </div>
    </div>
  );
}

export default App;
