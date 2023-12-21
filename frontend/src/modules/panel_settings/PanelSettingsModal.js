import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateProposedPanel, applyProposedPanel } from '../../state/reducer';
import ColorField from './ColorField';
import _ from 'lodash';


function formatMacAddress(macStr) {
  const octet_1 = `${macStr[0]}${macStr[1]}`
  const octet_2 = `${macStr[2]}${macStr[3]}`
  const octet_3 = `${macStr[4]}${macStr[5]}`
  const octet_4 = `${macStr[6]}${macStr[7]}`
  const octet_5 = `${macStr[8]}${macStr[9]}`
  const octet_6 = `${macStr[10]}${macStr[11]}`

  return _.toUpper(`${octet_1}:${octet_2}:${octet_3}:${octet_4}:${octet_5}:${octet_6}`);
}


function PanelSettingsBody({proposedPanel, dispatch}) {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title">
          <b>{proposedPanel["name"]}</b>
        </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
      </div>
      <div className="modal-body">
        <form>
          <div>
            <label htmlFor="panelName" className="form-label">Panel Name</label>
            <input type="text"
                   id="panelName"
                   className="form-control"
                   value={proposedPanel['name']}
                   onChange={(e) => dispatch(updateProposedPanel({...proposedPanel, name:e.target.value}))}/>
          </div>
          <div>
            <label htmlFor="panelGroup" className="form-label">Panel Group</label>
            <input type="text"
                   id="panelGroup"
                   className="form-control"
                   value={proposedPanel['group']}
                   onChange={(e) => dispatch(updateProposedPanel({...proposedPanel, group:e.target.value}))}/>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="macAddress" className="form-label">Mac Address</label>
              <input type="text"
                     id="macAddress"
                     className="form-control smaller-font"
                     value={formatMacAddress(proposedPanel['macAddr'])}
                     disabled={true} />
            </div>
            <div className="col">
              <label htmlFor="softwareVersion" className="form-label">Software Version</label>
              <input type="text"
                     id="softwareVersion"
                     className="form-control smaller-font"
                     value={proposedPanel['version']}
                     disabled={true} />
            </div>
            <div className="col">
              <label htmlFor="ipAddr" className="form-label">IP Address</label>
              <input type="text"
                     id="ipAddr"
                     className="form-control smaller-font"
                     value={proposedPanel['ipAddr']}
                     disabled={true} />
            </div>
          </div>
          <div className='row'>
            <ColorField colorName='red' proposed={proposedPanel} dispatch={dispatch} />
            <ColorField colorName='green'proposed={proposedPanel} dispatch={dispatch} />
            <ColorField colorName='blue' proposed={proposedPanel} dispatch={dispatch} />
            <ColorField colorName='white' proposed={proposedPanel} dispatch={dispatch} />
            <ColorField colorName='fan' proposed={proposedPanel} dispatch={dispatch} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
          Close
        </button>
        <button type="button"
                className="btn btn-primary"
                onClick={() => dispatch(applyProposedPanel)}>
          Save
        </button>
      </div>
    </div>
  );
}

function PanelSettingsModal() {
  const dispatch = useDispatch();
  let proposedPanel = useSelector((state) => state.proposedPanel);

  return (
    <div className='modal fade settings-modal' id="panel-settings-modal">
      <div className="modal-dialog">
        {_.isUndefined(proposedPanel) ? <div/> : <PanelSettingsBody proposedPanel={proposedPanel} dispatch={dispatch}/>}
      </div>
    </div>
  );
}

export default PanelSettingsModal;