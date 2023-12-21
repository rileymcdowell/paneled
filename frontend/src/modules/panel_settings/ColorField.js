
import _ from 'lodash';
import { updateProposedPanel, updateProposedGroup } from '../../state/reducer';

function _callUpdatePanelProposal(dispatch, proposedPanel, colorName, value) {
  return dispatch(updateProposedPanel({...proposedPanel, [colorName]: value}));
}
function _callUpdateGroupProposal(dispatch, proposedGroup, colorName, value) {
  return dispatch(updateProposedGroup({...proposedGroup, [colorName]: value}));
}

// Leave an option to debounce this, otherwise the range input can feel a bit
// laggy because of the overhead of processing all the change events
// and synchronizing them to the redux state. This is more noticable on
// low powered devices like cellular phones.
let DEBOUNCE_MS = 0;
let callUpdatePanelProposal = _.debounce(_callUpdatePanelProposal, DEBOUNCE_MS);
let callUpdateGroupProposal = _.debounce(_callUpdateGroupProposal, DEBOUNCE_MS);


function ColorField({colorName, proposed, dispatch, isGroup=false}) {
  const colorValue = _.toInteger(proposed[colorName]*100);
  const idString = `${colorName}Pct`;
  const label = `${_.capitalize(colorName)} (${colorValue})`;
  const updateFunc = isGroup ? callUpdateGroupProposal : callUpdatePanelProposal;
  return (
    <div>
      <label htmlFor={idString} className="form-label">{label}</label>
      <input type="range" 
             min={0}
             max={100}
             id={idString}
             className="form-control" 
             onInput={(e) => {
              updateFunc(dispatch, proposed, colorName, e.target.value/100);
             }}
             onChange={(e) => {
              updateFunc(dispatch, proposed, colorName, e.target.value/100);
             }}
             value={colorValue}
             />
      <input type="number" 
            min={0} 
            max={100} 
            id={idString} 
            className="form-control" 
            onInput={(e) => {
              updateFunc(dispatch, proposed, colorName, e.target.value/100);
            }}
            onChange={(e) => {
              updateFunc(dispatch, proposed, colorName, e.target.value/100);
            }}
            value={colorValue}
            />
    </div>
  );
}

export default ColorField;