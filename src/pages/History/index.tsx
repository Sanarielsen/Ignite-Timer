import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import { CyclesContext } from "../../contexts/CyclesContext";
import { 
  HistoryButtonReset, 
  HistoryContainer, 
  HistoryContainerHeader, 
  HistoryList, 
  HistoryTable, 
  HistoryTableBody, 
  HistoryTitleHeader, 
} from "./styles";
import { ModalConfirmation } from "../../components/Modal/ModalConfirmation";
import { ModalStructure } from "../../components/Modal/ModalStructure";
import { HistoryData } from "./components/HistoryData";
import { Cycle } from "../../reducers/cycles/reducer";
import { useIntersect } from "../../utils/IntersectionObserver";

const headerHistoryList = [

  { id: "task", value: "Tarefa" },
  { id: "time", value: "Duração" },
  { id: "timePassed", value: "Início" },
  { id: "status", value: "Status" },
]

export function History() {
  const { cycles, deleteListOfCycles } = useContext(CyclesContext)  
  const ref = useRef<HTMLButtonElement>(null);
  const refObserver = useRef<HTMLDivElement>(null); 

  let elementsPerLoad = 10;
    
  const [scrollInfinite, setScrollInfinite] = useState(true);
  const [quantCyclesLoaded, setQuantCyclesLoaded] = useState(elementsPerLoad);
  const [cyclesLoaded, setCyclesLoaded] = useState<Cycle[]>(cycles.slice(0, quantCyclesLoaded))
  const [currentPage, setCurrentPage] = useState(1)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);  

  const haveCycles = cycles.length;  
  
  function handleCyclesRemove() {

    setOpenModalConfirm(false)
    deleteListOfCycles()      
  }

  const [intersection, setIntersection] = useState(new IntersectionObserver((entries) => {  
    
    if (entries.some((entry) => entry.isIntersecting) && scrollInfinite) {
      setCurrentPage((currentPageInsideState) => currentPageInsideState + 1);
    }
  }));
  
  useEffect(() => {
        
    intersection.observe(document.querySelector('#panelReference') as HTMLElement)    
  },[])

  useEffect(() => {
    if (cyclesLoaded && scrollInfinite) {        
      setQuantCyclesLoaded((current) => current = quantCyclesLoaded + elementsPerLoad)
      setCyclesLoaded((current) => current = cycles.slice(0, quantCyclesLoaded))      
    }      
  }, [currentPage])

  useEffect(() => {
    if (cyclesLoaded.length === cycles.length) {      
      setScrollInfinite((status) => status = !status);      
      intersection.disconnect()
      intersection.unobserve(document.querySelector('#panelReference') as HTMLElement);
      setIntersection(new IntersectionObserver(() => null))      
    }          
  }, [cyclesLoaded])

  return (
    
    <HistoryContainer>
      <h1>Info: {cyclesLoaded.length} </h1>
      <h1>Info 2: {cycles.length} </h1>      
      <HistoryContainerHeader>
        <HistoryTitleHeader> Meu histórico </HistoryTitleHeader>
        <ModalStructure open={openModalConfirm} handleOpenChange={setOpenModalConfirm} ref={ref}>
          <HistoryButtonReset                                             
              type="button"
              disabled={!(haveCycles > 0)}
              onClick={() => setOpenModalConfirm(true)}                     
          >
            Reset History
          </HistoryButtonReset>
          <ModalConfirmation            
            title="Excluir histórico" 
            message="Tem certeza que gostaria de apagar seu histórico? Essa operação é irreversivel" 
            handleClose={() => setOpenModalConfirm(false)}
            handleSubmit={() => handleCyclesRemove()}
          />
        </ModalStructure>
      </HistoryContainerHeader>      
      
      <h1> Pagina atual: {currentPage} </h1>
      <HistoryList>        
        <HistoryTable>
          <thead>
            <tr>
              {headerHistoryList.map((option) => {
                return (
                  <th key={option.id}> {option.value} </th>
                )
              })}
            </tr>
          </thead>
          <HistoryTableBody>            
            {cyclesLoaded.map((cycle) => {
              return (
                <HistoryData key={cycle.id} cycle={cycle} />
              )
            })}            
          </HistoryTableBody>            
        </HistoryTable>
        <div id="panelReference" ref={refObserver} style={{width: "100%", height: "5px"}}></div>   
      </HistoryList>
    </HistoryContainer>
  )
}