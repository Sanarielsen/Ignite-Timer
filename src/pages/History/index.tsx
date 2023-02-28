import { ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

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

const headerHistoryList = [

  { id: "task", value: "Tarefa" },
  { id: "time", value: "Duração" },
  { id: "timePassed", value: "Início" },
  { id: "status", value: "Status" },
]

export function History() {
  const { cycles, deleteListOfCycles } = useContext(CyclesContext)  

  const ref = useRef<HTMLButtonElement>(null);    
  const refPanel = useRef<HTMLDivElement>(document.createElement("div"));
  const refTable = useRef<HTMLTableElement>(document.createElement("table"));
  const refTableHeader = useRef<HTMLTableSectionElement>(document.createElement("thead"));

  let elementsPerLoad = 1;
  let scrollName = ""

  const [scrollInfinite, setScrollInfinite] = useState(true);
  const [quantCyclesLoaded, setQuantCyclesLoaded] = useState(elementsPerLoad);
  const [cyclesLoaded, setCyclesLoaded] = useState<Cycle[]>(cycles.slice(0, quantCyclesLoaded))
  const [currentPage, setCurrentPage] = useState(1)
  const [cellTableHeight, setCellTableHeight] = useState(0)
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  const haveCycles = cycles.length;

  useLayoutEffect( () => {
    
    setCellTableHeight(refTableHeader.current.offsetHeight)
    if (refTable.current.offsetHeight > refPanel.current.offsetHeight) {

      scrollName = "scroll-ativated"
    }
  },[])

  useEffect(() => {

    if (cellTableHeight > 0) {
    
      elementsPerLoad = Math.round(refPanel.current.offsetHeight / cellTableHeight)
      setQuantCyclesLoaded(Math.round(refPanel.current.offsetHeight / cellTableHeight))      
    }
  }, [cellTableHeight])

  useEffect(() => {
    const intersection = new IntersectionObserver((entries) => {      
      if (entries.some((entry) => entry.isIntersecting) && scrollInfinite) {        
        setCurrentPage(currentPage + 1);
        intersection.disconnect();
      }
    })
    intersection.observe(document.querySelector('#panelReference') as HTMLElement)

    if (cyclesLoaded && scrollInfinite) {        
      setQuantCyclesLoaded(quantCyclesLoaded + elementsPerLoad)
      setCyclesLoaded(cycles.slice(0, quantCyclesLoaded))      
    }   
  }, [currentPage]) 

  useEffect(() => {    
    if (cyclesLoaded.length === cycles.length) {
      setScrollInfinite(false)      
    }
  }, [cyclesLoaded])

  function handleCyclesRemove() {

    setOpenModalConfirm(false)
    deleteListOfCycles()    
  }

  return (
        
    <HistoryContainer>        
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
            
      <HistoryList className={scrollName} ref={refPanel}>        
        <HistoryTable ref={refTable}>
          <thead ref={refTableHeader}>
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
        <div id="panelReference" style={{width: "100%", height: "5px"}}></div>   
      </HistoryList>
    </HistoryContainer>
  )
}