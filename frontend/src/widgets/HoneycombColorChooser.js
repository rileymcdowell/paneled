import './HoneycombColorChooser.css';

function clickColor(hexColor) {
  console.log(hexColor);
}

function mouseOverColor(hexColor) {
  console.log(hexColor);
}

function HoneycombColorChooser() {
  return (
    <div className="honeycomb-color-chooser">
      <img className='honeycomb-color-image' 
           alt='colormap' 
           src="/honeycomb_colormap.png"
           useMap="#colormap"
           />
      <div className="honeycomb-color-chooser">
        <HoneycombImageMap/>
      </div>
    </div>
  );
}


function HexColorArea({coords, hexColor, xpos, ypos}) {
  return <area style={{cursor: 'pointer'}} 
               key={hexColor}
               shape='poly' 
               coords={coords} 
               onClick={() => clickColor(hexColor, xpos, ypos)} 
               onMouseOver={() => mouseOverColor(hexColor)} 
               alt={hexColor} />
}

function HoneycombImageMap() {
  return (
  <map id="colormap" name="colormap">
    <HexColorArea coords="63,0,72,4,72,15,63,19,54,15,54,4"                xpos="-200" ypos="54"   hexColor="#003366"/>
    <HexColorArea coords="81,0,90,4,90,15,81,19,72,15,72,4"                xpos="-200" ypos="72"   hexColor="#336699"/>
    <HexColorArea coords="99,0,108,4,108,15,99,19,90,15,90,4"              xpos="-200" ypos="90"   hexColor="#3366CC"/>
    <HexColorArea coords="117,0,126,4,126,15,117,19,108,15,108,4"          xpos="-200" ypos="108"  hexColor="#003399"/>
    <HexColorArea coords="135,0,144,4,144,15,135,19,126,15,126,4"          xpos="-200" ypos="126"  hexColor="#000099"/>
    <HexColorArea coords="153,0,162,4,162,15,153,19,144,15,144,4"          xpos="-200" ypos="144"  hexColor="#0000CC"/>
    <HexColorArea coords="171,0,180,4,180,15,171,19,162,15,162,4"          xpos="-200" ypos="162"  hexColor="#000066"/>
    <HexColorArea coords="54,15,63,19,63,30,54,34,45,30,45,19"             xpos="-185" ypos="45"   hexColor="#006666"/>
    <HexColorArea coords="72,15,81,19,81,30,72,34,63,30,63,19"             xpos="-185" ypos="63"   hexColor="#006699"/>
    <HexColorArea coords="90,15,99,19,99,30,90,34,81,30,81,19"             xpos="-185" ypos="81"   hexColor="#0099CC"/>
    <HexColorArea coords="108,15,117,19,117,30,108,34,99,30,99,19"         xpos="-185" ypos="99"   hexColor="#0066CC"/>
    <HexColorArea coords="126,15,135,19,135,30,126,34,117,30,117,19"       xpos="-185" ypos="117"  hexColor="#0033CC"/>
    <HexColorArea coords="144,15,153,19,153,30,144,34,135,30,135,19"       xpos="-185" ypos="135"  hexColor="#0000FF"/>
    <HexColorArea coords="162,15,171,19,171,30,162,34,153,30,153,19"       xpos="-185" ypos="153"  hexColor="#3333FF"/>
    <HexColorArea coords="180,15,189,19,189,30,180,34,171,30,171,19"       xpos="-185" ypos="171"  hexColor="#333399"/>
    <HexColorArea coords="45,30,54,34,54,45,45,49,36,45,36,34"             xpos="-170" ypos="36"   hexColor="#669999"/>
    <HexColorArea coords="63,30,72,34,72,45,63,49,54,45,54,34"             xpos="-170" ypos="54"   hexColor="#009999"/>
    <HexColorArea coords="81,30,90,34,90,45,81,49,72,45,72,34"             xpos="-170" ypos="72"   hexColor="#33CCCC"/>
    <HexColorArea coords="99,30,108,34,108,45,99,49,90,45,90,34"           xpos="-170" ypos="90"   hexColor="#00CCFF"/>
    <HexColorArea coords="117,30,126,34,126,45,117,49,108,45,108,34"       xpos="-170" ypos="108"  hexColor="#0099FF"/>
    <HexColorArea coords="135,30,144,34,144,45,135,49,126,45,126,34"       xpos="-170" ypos="126"  hexColor="#0066FF"/>
    <HexColorArea coords="153,30,162,34,162,45,153,49,144,45,144,34"       xpos="-170" ypos="144"  hexColor="#3366FF"/>
    <HexColorArea coords="171,30,180,34,180,45,171,49,162,45,162,34"       xpos="-170" ypos="162"  hexColor="#3333CC"/>
    <HexColorArea coords="189,30,198,34,198,45,189,49,180,45,180,34"       xpos="-170" ypos="180"  hexColor="#666699"/>
    <HexColorArea coords="36,45,45,49,45,60,36,64,27,60,27,49"             xpos="-155" ypos="27"   hexColor="#339966"/>
    <HexColorArea coords="54,45,63,49,63,60,54,64,45,60,45,49"             xpos="-155" ypos="45"   hexColor="#00CC99"/>
    <HexColorArea coords="72,45,81,49,81,60,72,64,63,60,63,49"             xpos="-155" ypos="63"   hexColor="#00FFCC"/>
    <HexColorArea coords="90,45,99,49,99,60,90,64,81,60,81,49"             xpos="-155" ypos="81"   hexColor="#00FFFF"/>
    <HexColorArea coords="108,45,117,49,117,60,108,64,99,60,99,49"         xpos="-155" ypos="99"   hexColor="#33CCFF"/>
    <HexColorArea coords="126,45,135,49,135,60,126,64,117,60,117,49"       xpos="-155" ypos="117"  hexColor="#3399FF"/>
    <HexColorArea coords="144,45,153,49,153,60,144,64,135,60,135,49"       xpos="-155" ypos="135"  hexColor="#6699FF"/>
    <HexColorArea coords="162,45,171,49,171,60,162,64,153,60,153,49"       xpos="-155" ypos="153"  hexColor="#6666FF"/>
    <HexColorArea coords="180,45,189,49,189,60,180,64,171,60,171,49"       xpos="-155" ypos="171"  hexColor="#6600FF"/>
    <HexColorArea coords="198,45,207,49,207,60,198,64,189,60,189,49"       xpos="-155" ypos="189"  hexColor="#6600CC"/>
    <HexColorArea coords="27,60,36,64,36,75,27,79,18,75,18,64"             xpos="-140" ypos="18"   hexColor="#339933"/>
    <HexColorArea coords="45,60,54,64,54,75,45,79,36,75,36,64"             xpos="-140" ypos="36"   hexColor="#00CC66"/>
    <HexColorArea coords="63,60,72,64,72,75,63,79,54,75,54,64"             xpos="-140" ypos="54"   hexColor="#00FF99"/>
    <HexColorArea coords="81,60,90,64,90,75,81,79,72,75,72,64"             xpos="-140" ypos="72"   hexColor="#66FFCC"/>
    <HexColorArea coords="99,60,108,64,108,75,99,79,90,75,90,64"           xpos="-140" ypos="90"   hexColor="#66FFFF"/>
    <HexColorArea coords="117,60,126,64,126,75,117,79,108,75,108,64"       xpos="-140" ypos="108"  hexColor="#66CCFF"/>
    <HexColorArea coords="135,60,144,64,144,75,135,79,126,75,126,64"       xpos="-140" ypos="126"  hexColor="#99CCFF"/>
    <HexColorArea coords="153,60,162,64,162,75,153,79,144,75,144,64"       xpos="-140" ypos="144"  hexColor="#9999FF"/>
    <HexColorArea coords="171,60,180,64,180,75,171,79,162,75,162,64"       xpos="-140" ypos="162"  hexColor="#9966FF"/>
    <HexColorArea coords="189,60,198,64,198,75,189,79,180,75,180,64"       xpos="-140" ypos="180"  hexColor="#9933FF"/>
    <HexColorArea coords="207,60,216,64,216,75,207,79,198,75,198,64"       xpos="-140" ypos="198"  hexColor="#9900FF"/>
    <HexColorArea coords="18,75,27,79,27,90,18,94,9,90,9,79"               xpos="-125" ypos="9"    hexColor="#006600"/>
    <HexColorArea coords="36,75,45,79,45,90,36,94,27,90,27,79"             xpos="-125" ypos="27"   hexColor="#00CC00"/>
    <HexColorArea coords="54,75,63,79,63,90,54,94,45,90,45,79"             xpos="-125" ypos="45"   hexColor="#00FF00"/>
    <HexColorArea coords="72,75,81,79,81,90,72,94,63,90,63,79"             xpos="-125" ypos="63"   hexColor="#66FF99"/>
    <HexColorArea coords="90,75,99,79,99,90,90,94,81,90,81,79"             xpos="-125" ypos="81"   hexColor="#99FFCC"/>
    <HexColorArea coords="108,75,117,79,117,90,108,94,99,90,99,79"         xpos="-125" ypos="99"   hexColor="#CCFFFF"/>
    <HexColorArea coords="126,75,135,79,135,90,126,94,117,90,117,79"       xpos="-125" ypos="117"  hexColor="#CCCCFF"/>
    <HexColorArea coords="144,75,153,79,153,90,144,94,135,90,135,79"       xpos="-125" ypos="135"  hexColor="#CC99FF"/>
    <HexColorArea coords="162,75,171,79,171,90,162,94,153,90,153,79"       xpos="-125" ypos="153"  hexColor="#CC66FF"/>
    <HexColorArea coords="180,75,189,79,189,90,180,94,171,90,171,79"       xpos="-125" ypos="171"  hexColor="#CC33FF"/>
    <HexColorArea coords="198,75,207,79,207,90,198,94,189,90,189,79"       xpos="-125" ypos="189"  hexColor="#CC00FF"/>
    <HexColorArea coords="216,75,225,79,225,90,216,94,207,90,207,79"       xpos="-125" ypos="207"  hexColor="#9900CC"/>
    <HexColorArea coords="9,90,18,94,18,105,9,109,0,105,0,94"              xpos="-110" ypos="0"    hexColor="#003300"/>
    <HexColorArea coords="27,90,36,94,36,105,27,109,18,105,18,94"          xpos="-110" ypos="18"   hexColor="#009933"/>
    <HexColorArea coords="45,90,54,94,54,105,45,109,36,105,36,94"          xpos="-110" ypos="36"   hexColor="#33CC33"/>
    <HexColorArea coords="63,90,72,94,72,105,63,109,54,105,54,94"          xpos="-110" ypos="54"   hexColor="#66FF66"/>
    <HexColorArea coords="81,90,90,94,90,105,81,109,72,105,72,94"          xpos="-110" ypos="72"   hexColor="#99FF99"/>
    <HexColorArea coords="99,90,108,94,108,105,99,109,90,105,90,94"        xpos="-110" ypos="90"   hexColor="#CCFFCC"/>
    <HexColorArea coords="117,90,126,94,126,105,117,109,108,105,108,94"    xpos="-110" ypos="108"  hexColor="#FFFFFF"/>
    <HexColorArea coords="135,90,144,94,144,105,135,109,126,105,126,94"    xpos="-110" ypos="126"  hexColor="#FFCCFF"/>
    <HexColorArea coords="153,90,162,94,162,105,153,109,144,105,144,94"    xpos="-110" ypos="144"  hexColor="#FF99FF"/>
    <HexColorArea coords="171,90,180,94,180,105,171,109,162,105,162,94"    xpos="-110" ypos="162"  hexColor="#FF66FF"/>
    <HexColorArea coords="189,90,198,94,198,105,189,109,180,105,180,94"    xpos="-110" ypos="180"  hexColor="#FF00FF"/>
    <HexColorArea coords="207,90,216,94,216,105,207,109,198,105,198,94"    xpos="-110" ypos="198"  hexColor="#CC00CC"/>
    <HexColorArea coords="225,90,234,94,234,105,225,109,216,105,216,94"    xpos="-110" ypos="216"  hexColor="#660066"/>
    <HexColorArea coords="18,105,27,109,27,120,18,124,9,120,9,109"         xpos="-95," ypos=""     hexColor="#336600"/>
    <HexColorArea coords="36,105,45,109,45,120,36,124,27,120,27,109"       xpos="-95," ypos="7"    hexColor="#009900"/>
    <HexColorArea coords="54,105,63,109,63,120,54,124,45,120,45,109"       xpos="-95," ypos="5"    hexColor="#66FF33"/>
    <HexColorArea coords="72,105,81,109,81,120,72,124,63,120,63,109"       xpos="-95," ypos="3"    hexColor="#99FF66"/>
    <HexColorArea coords="90,105,99,109,99,120,90,124,81,120,81,109"       xpos="-95," ypos="1"    hexColor="#CCFF99"/>
    <HexColorArea coords="108,105,117,109,117,120,108,124,99,120,99,109"   xpos="-95," ypos="9"    hexColor="#FFFFCC"/>
    <HexColorArea coords="126,105,135,109,135,120,126,124,117,120,117,109" xpos="-95," ypos="17"   hexColor="#FFCCCC"/>
    <HexColorArea coords="144,105,153,109,153,120,144,124,135,120,135,109" xpos="-95," ypos="35"   hexColor="#FF99CC"/>
    <HexColorArea coords="162,105,171,109,171,120,162,124,153,120,153,109" xpos="-95," ypos="53"   hexColor="#FF66CC"/>
    <HexColorArea coords="180,105,189,109,189,120,180,124,171,120,171,109" xpos="-95," ypos="71"   hexColor="#FF33CC"/>
    <HexColorArea coords="198,105,207,109,207,120,198,124,189,120,189,109" xpos="-95," ypos="89"   hexColor="#CC0099"/>
    <HexColorArea coords="216,105,225,109,225,120,216,124,207,120,207,109" xpos="-95," ypos="07"   hexColor="#993399"/>
    <HexColorArea coords="27,120,36,124,36,135,27,139,18,135,18,124"       xpos="-80," ypos="8"    hexColor="#333300"/>
    <HexColorArea coords="45,120,54,124,54,135,45,139,36,135,36,124"       xpos="-80," ypos="6"    hexColor="#669900"/>
    <HexColorArea coords="63,120,72,124,72,135,63,139,54,135,54,124"       xpos="-80," ypos="4"    hexColor="#99FF33"/>
    <HexColorArea coords="81,120,90,124,90,135,81,139,72,135,72,124"       xpos="-80," ypos="2"    hexColor="#CCFF66"/>
    <HexColorArea coords="99,120,108,124,108,135,99,139,90,135,90,124"     xpos="-80," ypos="0"    hexColor="#FFFF99"/>
    <HexColorArea coords="117,120,126,124,126,135,117,139,108,135,108,124" xpos="-80," ypos="08"   hexColor="#FFCC99"/>
    <HexColorArea coords="135,120,144,124,144,135,135,139,126,135,126,124" xpos="-80," ypos="26"   hexColor="#FF9999"/>
    <HexColorArea coords="153,120,162,124,162,135,153,139,144,135,144,124" xpos="-80," ypos="44"   hexColor="#FF6699"/>
    <HexColorArea coords="171,120,180,124,180,135,171,139,162,135,162,124" xpos="-80," ypos="62"   hexColor="#FF3399"/>
    <HexColorArea coords="189,120,198,124,198,135,189,139,180,135,180,124" xpos="-80," ypos="80"   hexColor="#CC3399"/>
    <HexColorArea coords="207,120,216,124,216,135,207,139,198,135,198,124" xpos="-80," ypos="98"   hexColor="#990099"/>
    <HexColorArea coords="36,135,45,139,45,150,36,154,27,150,27,139"       xpos="-65," ypos="7"    hexColor="#666633"/>
    <HexColorArea coords="54,135,63,139,63,150,54,154,45,150,45,139"       xpos="-65," ypos="5"    hexColor="#99CC00"/>
    <HexColorArea coords="72,135,81,139,81,150,72,154,63,150,63,139"       xpos="-65," ypos="3"    hexColor="#CCFF33"/>
    <HexColorArea coords="90,135,99,139,99,150,90,154,81,150,81,139"       xpos="-65," ypos="1"    hexColor="#FFFF66"/>
    <HexColorArea coords="108,135,117,139,117,150,108,154,99,150,99,139"   xpos="-65," ypos="9"    hexColor="#FFCC66"/>
    <HexColorArea coords="126,135,135,139,135,150,126,154,117,150,117,139" xpos="-65," ypos="17"   hexColor="#FF9966"/>
    <HexColorArea coords="144,135,153,139,153,150,144,154,135,150,135,139" xpos="-65," ypos="35"   hexColor="#FF6666"/>
    <HexColorArea coords="162,135,171,139,171,150,162,154,153,150,153,139" xpos="-65," ypos="53"   hexColor="#FF0066"/>
    <HexColorArea coords="180,135,189,139,189,150,180,154,171,150,171,139" xpos="-65," ypos="71"   hexColor="#CC6699"/>
    <HexColorArea coords="198,135,207,139,207,150,198,154,189,150,189,139" xpos="-65," ypos="89"   hexColor="#993366"/>
    <HexColorArea coords="45,150,54,154,54,165,45,169,36,165,36,154"       xpos="-50," ypos="6"    hexColor="#999966"/>
    <HexColorArea coords="63,150,72,154,72,165,63,169,54,165,54,154"       xpos="-50," ypos="4"    hexColor="#CCCC00"/>
    <HexColorArea coords="81,150,90,154,90,165,81,169,72,165,72,154"       xpos="-50," ypos="2"    hexColor="#FFFF00"/>
    <HexColorArea coords="99,150,108,154,108,165,99,169,90,165,90,154"     xpos="-50," ypos="0"    hexColor="#FFCC00"/>
    <HexColorArea coords="117,150,126,154,126,165,117,169,108,165,108,154" xpos="-50," ypos="08"   hexColor="#FF9933"/>
    <HexColorArea coords="135,150,144,154,144,165,135,169,126,165,126,154" xpos="-50," ypos="26"   hexColor="#FF6600"/>
    <HexColorArea coords="153,150,162,154,162,165,153,169,144,165,144,154" xpos="-50," ypos="44"   hexColor="#FF5050"/>
    <HexColorArea coords="171,150,180,154,180,165,171,169,162,165,162,154" xpos="-50," ypos="62"   hexColor="#CC0066"/>
    <HexColorArea coords="189,150,198,154,198,165,189,169,180,165,180,154" xpos="-50," ypos="80"   hexColor="#660033"/>
    <HexColorArea coords="54,165,63,169,63,180,54,184,45,180,45,169"       xpos="-35," ypos="5"    hexColor="#996633"/>
    <HexColorArea coords="72,165,81,169,81,180,72,184,63,180,63,169"       xpos="-35," ypos="3"    hexColor="#CC9900"/>
    <HexColorArea coords="90,165,99,169,99,180,90,184,81,180,81,169"       xpos="-35," ypos="1"    hexColor="#FF9900"/>
    <HexColorArea coords="108,165,117,169,117,180,108,184,99,180,99,169"   xpos="-35," ypos="9"    hexColor="#CC6600"/>
    <HexColorArea coords="126,165,135,169,135,180,126,184,117,180,117,169" xpos="-35," ypos="17"   hexColor="#FF3300"/>
    <HexColorArea coords="144,165,153,169,153,180,144,184,135,180,135,169" xpos="-35," ypos="35"   hexColor="#FF0000"/>
    <HexColorArea coords="162,165,171,169,171,180,162,184,153,180,153,169" xpos="-35," ypos="53"   hexColor="#CC0000"/>
    <HexColorArea coords="180,165,189,169,189,180,180,184,171,180,171,169" xpos="-35," ypos="71"   hexColor="#990033"/>
    <HexColorArea coords="63,180,72,184,72,195,63,199,54,195,54,184"       xpos="-20," ypos="4"    hexColor="#663300"/>
    <HexColorArea coords="81,180,90,184,90,195,81,199,72,195,72,184"       xpos="-20," ypos="2"    hexColor="#996600"/>
    <HexColorArea coords="99,180,108,184,108,195,99,199,90,195,90,184"     xpos="-20," ypos="0"    hexColor="#CC3300"/>
    <HexColorArea coords="117,180,126,184,126,195,117,199,108,195,108,184" xpos="-20," ypos="08"   hexColor="#993300"/>
    <HexColorArea coords="135,180,144,184,144,195,135,199,126,195,126,184" xpos="-20," ypos="26"   hexColor="#990000"/>
    <HexColorArea coords="153,180,162,184,162,195,153,199,144,195,144,184" xpos="-20," ypos="44"   hexColor="#800000"/>
    <HexColorArea coords="171,180,180,184,180,195,171,199,162,195,162,184" xpos="-20," ypos="62"   hexColor="#993333"/>
  </map>);
}

export default HoneycombColorChooser;