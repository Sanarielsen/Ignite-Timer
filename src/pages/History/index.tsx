import { RefObject, createRef, useContext, useEffect, useRef, useState } from "react";

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
  const refCycle = useRef([createRef()])
  const refObserver = useRef<HTMLDivElement>(null);
  const refPanel = useRef<HTMLDivElement>(null);
  const refTable = useRef<HTMLTableElement>();

  let elementsPerLoad = 10;
  
  const [tableHeight, setTableHeight] = useState<number | undefined>(0);
  const [panelHeight, setPanelHeight] = useState<number | undefined>(0);

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

  useEffect( () => {

    if (refTable) {
      handleRef(refTable);
    }

    console.log("Altura da table: ", refTable.current?.offsetHeight)
    console.log("Altura da panel: ", refPanel.current?.offsetHeight)

    setTableHeight(refTable.current?.offsetHeight)
    setPanelHeight(refPanel.current?.offsetHeight)

    console.log("Ativa a table: ", tableHeight)
    console.log("Ativa a panel: ", panelHeight)
    
    if ( (tableHeight && panelHeight) && tableHeight > panelHeight ) {

      console.log("Ativa a barra")
    }
  },[])

  const handleRef = (r: RefObject<HTMLDivElement>) => {
    
    console.log("Represents: ", r.current?.offsetHeight)    
    setTableHeight(r.current?.offsetHeight)
    console.log("Represents: ", tableHeight)
  }

  useEffect(() => {
    const intersection = new IntersectionObserver((entries) => {      
      if (entries.some((entry) => entry.isIntersecting) && scrollInfinite) {        
        setCurrentPage(currentPage + 1);
        intersection.disconnect();
      }
    })
    intersection.observe(document.querySelector('#panelReference') as HTMLElement)

    if (cyclesLoaded && scrollInfinite) {        
      setQuantCyclesLoaded((current) => current = quantCyclesLoaded + elementsPerLoad)
      setCyclesLoaded((current) => current = cycles.slice(0, quantCyclesLoaded))      
    }   
  }, [currentPage]) 

  useEffect(() => {
    if (cyclesLoaded.length === cycles.length) {
      setScrollInfinite(false)
    }
  }, [cyclesLoaded])

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
            
      <HistoryList ref={refPanel}>        
        <HistoryTable ref={refTable}>
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
            {cyclesLoaded.map((cycle, i) => {
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