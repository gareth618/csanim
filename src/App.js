import React from 'react';
import p5 from 'p5';

import sketch1 from './sketch1';
import sketch2 from './sketch2';

function Sketch({ sketch }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const myP5 = new p5(sketch, ref.current);
    const fun = () => {
      if (ref.current.children?.[0] == null) {
        setTimeout(fun, 618);
        return;
      }
      ref.current.children[0].style.borderRadius = '.5rem';
      if (myP5.mousePressed != null) {
        const mousePressed = myP5.mousePressed;
        myP5.mousePressed = undefined;
        ref.current.addEventListener('click', mousePressed);
      }
      if (myP5.keyPressed != null) {
        const keyPressed = myP5.keyPressed;
        myP5.keyPressed = () => {
          if (!(0 <= myP5.mouseX && myP5.mouseX <= myP5.width)) return;
          if (!(0 <= myP5.mouseY && myP5.mouseY <= myP5.height)) return;
          keyPressed();
        };
      }
    };
    fun();
  }, [sketch, ref]);
  return <div style={{ width: 'fit-content', margin: '1rem auto' }} ref={ref} />;
}

export default function App() {
  return (
    <>
      <Sketch sketch={sketch1} />
      <Sketch sketch={sketch2} />
    </>
  );
};
