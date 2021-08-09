import React from 'react';
import p5 from 'p5';
import sketch from './sketch';

export default function App() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const myP5 = new p5(sketch, ref.current);
    ref.current.children[0].style.borderRadius = '.5rem';
    if (myP5.mousePressed != null) {
      const mousePressed = myP5.mousePressed;
      myP5.mousePressed = null;
      ref.current.addEventListener('click', () => {
        mousePressed();
      });
    }
    if (myP5.keyTyped != null) {
      const keyTyped = myP5.keyTyped;
      myP5.keyTyped = null;
      document.addEventListener('keydown', () => {
        if (!(0 <= myP5.mouseX && myP5.mouseX <= myP5.width)) return;
        if (!(0 <= myP5.mouseY && myP5.mouseY <= myP5.height)) return;
        keyTyped();
      });
    }
  }, [ref]);
  return <div style={{ width: 'fit-content', margin: '1rem auto' }} ref={ref} />;
};
