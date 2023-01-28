import _ from 'lodash';

function pctToAngle(huePct) {
  let hue = huePct * 60
  if (hue < 0) {
    hue = hue + 360;
  }
  return Math.round(hue);
}

function rgbToHslHue(r, g, b) {
  const minRGB = _.min([r, g, b]);
  const maxRGB = _.max([r, g, b]);

  if (minRGB == maxRGB) {
    return 0;
  }

  if (maxRGB == r) {
    return pctToAngle( (g - b) / (maxRGB - minRGB) );
  } else if (maxRGB == g) {
    return pctToAngle( 2 + (b - r) / (maxRGB - minRGB) );
  } else {
    return pctToAngle( 4 + (r - g) / (maxRGB - minRGB) );
  }
}

function PanelColorSwatch(panelConfig) {
  const red = panelConfig['red'];
  const green = panelConfig['green'];
  const blue = panelConfig['blue'];
  const white = panelConfig['white'];

  let r = red;
  let g = green;
  let b = blue;

  console.log(panelConfig);

  console.log(r);
  console.log(g);
  console.log(b);

  const hslHue = rgbToHslHue(r, g, b);

  console.log(hslHue);

  return (
    <div className='swatch' 
         style={{
          backgroundColor: `hsl(${hslHue},75%,75%)`
        }}/>
  );
}

export default PanelColorSwatch;