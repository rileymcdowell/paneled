import { stateTreeLoaded, doEditGroup, doEditPanel
       , doUpdateProposedGroup, doUpdateProposedPanel, doApplyProposedPanel } from "./actions";
import { getStateTree, applyProposedPanelConfig } from '../api.js';

export async function loadStateTree(dispatch, getState) {
  const response = await getStateTree();
  // Load the state tree.
  dispatch({ type: stateTreeLoaded, payload: response });
}

export function editGroup(newGroup) {
  return { type: doEditGroup, payload: newGroup };
}

export function editPanel(newPanel) {
  return { type: doEditPanel, payload: newPanel };
}

export function updateProposedGroup(newProposal) {
  return { type: doUpdateProposedGroup, payload: newProposal };
}

export function updateProposedPanel(newProposal) {
  return { type: doUpdateProposedPanel, payload: newProposal};
}

export async function applyProposedPanel(dispatch, getState) {
  const state = getState();
  applyProposedPanelConfig(state['editedPanel'], state['proposedPanel']);
  dispatch({ type: doApplyProposedPanel });
}

const defaultState = { "statetree": {}
                     , "shadowtree": {}
                     , "editedGroup": undefined
                     , "proposedGroup": undefined
                     , "editedPanel": undefined
                     , "proposedPanel": undefined
                     };

export default function appReducer(state=defaultState, action) {
  switch (action.type) {
    case stateTreeLoaded: {
      return { ...state, statetree: action.payload };
    }
    case doEditGroup: { 
      return { ...state, editedGroup: action.payload, proposedGroup: {...action.payload} };
    }
    case doEditPanel: { 
      return { ...state, editedPanel: action.payload, proposedPanel: {...action.payload} };
    }
    case doUpdateProposedGroup: {
      return { ...state, proposedGroup: action.payload };
    }
    case doUpdateProposedPanel: {
      return { ...state, proposedPanel: action.payload };
    }
    default: {
      return state;
    }
  }
}

