import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useIntersect = () => {

  const [intersection, setIntersection] = useState<IntersectionObserver>()
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState();

  //const observer = useRef(element);

  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver((entries) => {
  //     if (entries.some((entry) => entry.isIntersecting))      
  //       setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
  //   });
  //   intersectionObserver.observe(document.querySelector('#panelReference') as HTMLElement)
  //   return () => intersectionObserver.disconnect();
  // }, [])

  // useEffect( () => {

  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver(([entry]) => updateEntry(entry));

  //   const { current: currentObserver } = observer;

  //   if (node) currentObserver.observer(node); 

  //   return () => currentObserver.disconnect();

  // },[ node ])

  useEffect( () => {

    setIntersection(new IntersectionObserver(([entry]) => updateEntry(entry)));

    if (node && intersection) intersection.observe(node);

    return () => intersection?.disconnect();
    
  },[ node ])
  
  return [setNode, entry]
}