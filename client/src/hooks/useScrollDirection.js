import { useState, useEffect } from 'react';

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState({});
  
    useEffect(() => {
      let lastScrollY = window.pageYOffset;
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        let direction = scrollY > lastScrollY ? "down" : "up";

        if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
          setScrollDirection({"direction": direction});
        }
        if (scrollY <= 20) {
          setScrollDirection({direction: "top"})
        }

        lastScrollY = scrollY > 0 ? scrollY : 0;
      };
      window.addEventListener("scroll", updateScrollDirection); // add event listener
      return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
      }
    }, []);
  
    return scrollDirection;
  };

export default useScrollDirection;