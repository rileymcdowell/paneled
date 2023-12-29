import { shadowTreeLoaded, doEditGroup, doEditPanel
       , doUpdateProposedGroup, doUpdateProposedPanel
       , doApplyProposedGroup, doApplyProposedPanel } from "./actions";
import { getShadowTree, applyProposedPanelConfig, applyProposedGroupConfig } from '../api.js';

export async function loadShadowTree(dispatch, getState) {
  const response = await getShadowTree();
  // Load the shadow tree.
  dispatch({ type: shadowTreeLoaded, payload: response });
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
  // Update the panel, then grab the updated state to refresh the UI.
  applyProposedPanelConfig(state['editedPanel'], state['proposedPanel'])
      .then(() => loadShadowTree(dispatch, getState))
      .then(() => dispatch({ type: doApplyProposedPanel }));
}

export async function applyProposedGroup(dispatch, getState) {
  const state = getState();
  // Apply the new group configuration, then grab the updated state
  // to refresh subsequent UI windows.
  applyProposedGroupConfig(state['editedGroup'], state['proposedGroup'])
      .then(() => loadShadowTree(dispatch, getState))
      .then(() => dispatch({ type: doApplyProposedGroup }));
}

const defaultState = { "shadowtree": {}
                     , "editedGroup": undefined
                     , "proposedGroup": undefined
                     , "editedPanel": undefined
                     , "proposedPanel": undefined
                     };

export default function appReducer(state=defaultState, action) {
  switch (action.type) {
    case shadowTreeLoaded: {
      return { ...state, shadowtree: action.payload };
    }
    case doEditGroup: {
      // At the moment when the user opens the edit modal on a group,
      // the edited group and the proposed group should be identical.
      return { ...state, editedGroup: {...action.payload}, proposedGroup: {...action.payload} };
    }
    case doEditPanel: {
      // At the moment when the user opens the edit modal on a panel,
      // the edited panel and the proposed panel should be identical.
      return { ...state, editedPanel: {...action.payload}, proposedPanel: {...action.payload} };
    }
    case doUpdateProposedGroup: {
      return { ...state, proposedGroup: action.payload };
    }
    case doUpdateProposedPanel: {
      return { ...state, proposedPanel: action.payload };
    }
    case doApplyProposedPanel: {
      // When you apply proposed settings, the panel's state
      // becomes what was proposed.
      return { ...state, editedPanel: {...state.proposedPanel}}
    }
    case doApplyProposedGroup: {
      // When you apply proposed settings, the group's state
      // becomes what was proposed.
      return { ...state, editedGroup: {...state.proposedGroup} }
    }
    default: {
      return state;
    }
  }
}

