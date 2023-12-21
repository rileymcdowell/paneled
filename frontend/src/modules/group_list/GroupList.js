import { editGroup, editPanel} from '../../state/reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { getGroupSummary } from '../../utils/groupStats';

function Panel(panelConfig, panelIP, dispatch) {
  const panelName = panelConfig['name'];
  return (
    <div className="list-group-item container panel-item" key={panelIP}>
      <div className='card'>
        <div className="card-body">
          <div className='panel-ident-block'>
            <div> Panel Name: <b> {panelName} </b></div>
            <div> IP: <b> {panelIP} </b></div>
          </div>
          <button className='btn btn-secondary panel-settings-btn' 
                  type="button"
                  onClick={() => dispatch(editPanel(panelConfig))}
                  data-bs-toggle="modal"
                  data-bs-target="#panel-settings-modal"
                  >
            <i className="bi bi-gear"/>
          </button>
        </div>
      </div>
    </div> 
  );
}

function PanelGroup(groupConfig, groupName, dispatch) {
  return (
    <div key={groupName} className="accordion-item">
      <h2 className="accordion-header">
        <button type="button"
                className='accordion-button'>
          <div>
            {`Panel Group: ${groupName}`}
          </div>
          <div className="btn btn-secondary group-settings-btn" 
               data-bs-toggle="modal"
               data-bs-target="#group-settings-modal"
               onClick={() => dispatch(editGroup(getGroupSummary(groupConfig)))}
               >
            <i className="bi bi-gear"/>
          </div>
          <div className="accordion-collapse-btn" data-bs-toggle="collapse" data-bs-target={`#${groupName}`}>
            <h3> <i className="bi bi-caret-up"/> </h3>
          </div>
        </button>
      </h2>
      <div id={groupName} className='accordion-collapse collapse show'>
        <div className="accordion-body">
          {_.map(groupConfig, (panelConfig, panelIP) => Panel(panelConfig, panelIP, dispatch)) }
        </div>
      </div>
    </div>
  )
}

function PanelGroupList() {
  const shadowtree = useSelector((state) => state.shadowtree);
  const dispatch = useDispatch();

  return (
    <div className='accordion' id="group-list-accordion">
      {_.map(shadowtree, (config, name) => PanelGroup(config, name, dispatch))}
    </div>
  );
}

export default PanelGroupList