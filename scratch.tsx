import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

function Cards() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    let animating = false;
    const tl = gsap.timeline({ paused: true });
    
    // setup tl
    // tl.to(...)
    
    const obs = Observer.create({
      target: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      preventDefault: true,
      onDown: () => {
        if (!tl.previousLabel()) { obs.disable(); return; }
        if (!animating) {
          animating = true;
          tl.tweenTo(tl.previousLabel(), { onComplete: () => animating = false });
        }
      },
      onUp: () => {
        if (!tl.nextLabel()) { obs.disable(); return; }
        if (!animating) {
          animating = true;
          tl.tweenTo(tl.nextLabel(), { onComplete: () => animating = false });
        }
      }
    });

    // We can enable it on hover!
    containerRef.current.addEventListener('mouseenter', () => obs.enable());
    // No, if we disable it because we reached the end, hover will just re-enable it immediately?
    // If we reach the end and disable it, the next wheel event will scroll the page natively.
    // BUT the mouse is still hovering. So 'mouseenter' won't fire again until they leave and re-enter.
    // This is perfect!
    
  }, { scope: containerRef });
}
