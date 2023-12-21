import _ from 'lodash';

function getMeanColor(proposedGroup, colorName) {
  let colors = [];
  for (let panel of _.values(proposedGroup)) {
    colors.push(panel[colorName]);
  }
  return _.mean(colors);
}

export function getGroupSummary(proposedGroup) {
  let firstPanel = _.head(_.values(proposedGroup));
  let groupName = firstPanel["group"];
  let nPanels = _.size(proposedGroup);
  let redVal = getMeanColor(proposedGroup, "red");
  let greenVal = getMeanColor(proposedGroup, "green");
  let blueVal = getMeanColor(proposedGroup, "blue");
  let whiteVal = getMeanColor(proposedGroup, "white");
  let fanVal = getMeanColor(proposedGroup, "fan");
  let representativePanel = {
    "group": groupName,
    "n_panels": nPanels,
    "red": redVal,
    "green": greenVal,
    "blue": blueVal,
    "white": whiteVal,
    "fan": fanVal,
  };
  return representativePanel;
}