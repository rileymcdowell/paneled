import { useDispatch, useSelector } from "react-redux";
import { updateProposedGroup, applyProposedGroup } from "../../state/reducer";
import ColorField from "./ColorField";
import _ from 'lodash';


function GroupSettingsBody({proposedGroup, dispatch}) {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title">
          <b>{proposedGroup["group"]} Group</b>
        </h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
      </div>
      <div className="modal-body">
        <form>
          <div>
            <label htmlFor="groupName" className="form-label">Group Name</label>
            <input type="text"
                   id="groupName"
                   className="form-control"
                   value={proposedGroup["group"]}
                   onChange={(e) => dispatch(updateProposedGroup({...proposedGroup, name:e.target.value}))}/>
          </div>
          <div>
            <label htmlFor="numPanels" className="form-label"># of Panels</label>
            <input type="text"
                    id="numPanels"
                    className="form-control smaller-font"
                    value={proposedGroup["n_panels"]}
                    disabled={true} />
          </div>
          <div className='row'>
            <ColorField colorName='red' proposed={proposedGroup} dispatch={dispatch} isGroup={true}/>
            <ColorField colorName='green'proposed={proposedGroup} dispatch={dispatch} isGroup={true}/>
            <ColorField colorName='blue' proposed={proposedGroup} dispatch={dispatch} isGroup={true}/>
            <ColorField colorName='white' proposed={proposedGroup} dispatch={dispatch} isGroup={true}/>
            <ColorField colorName='fan' proposed={proposedGroup} dispatch={dispatch} isGroup={true}/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                >
          Close
        </button>
        <button type="button"
                className="btn btn-primary"
                onClick={() => dispatch(applyProposedGroup)}>
          Save
        </button>
      </div>
    </div>
  );
}

function GroupSettingsModal() {
  const dispatch = useDispatch();
  let proposedGroup = useSelector((state) => state.proposedGroup);

  return (
    <div className='modal fade settings-modal' id="group-settings-modal">
      <div className="modal-dialog">
        {_.isUndefined(proposedGroup) ? <div/> : <GroupSettingsBody proposedGroup={proposedGroup} dispatch={dispatch}/>}
      </div>
    </div>
  );
}

export default GroupSettingsModal;