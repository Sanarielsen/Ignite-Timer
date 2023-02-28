import styled from 'styled-components';

export const HistoryContainer = styled.main`

    flex: 1;
    padding: 3.5rem;

    height: 40%;
    scroll-behavior: auto;

    display: flex;
    flex-direction: column;

    h1 {

        font-size: 1.5rem;
        color: ${(props) => props.theme['gray-100']};
    }
`;

export const HistoryContainerHeader = styled.div`

    display: flex;
    justify-content: space-between; 
`;

export const HistoryTitleHeader = styled.h1`

    float: left;
    margin: auto 0;
`;

export const HistoryButtonReset = styled.button`

    width: 160px;    
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${props => props.theme['gray-100']};

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled {

        opacity: 0.7;
        cursor: not-allowed;        
    }

    background: ${props => props.theme['red-500']};

    &:not(:disabled):hover {

        background: ${(props) => props.theme['red-700']}
    }
`

export const HistoryList = styled.div`

    flex: 1;
    overflow: auto;
    margin-top: 2rem;
    
    ::-webkit-scrollbar {
        width: 10px;        
    }
    
    ::-webkit-scrollbar-track {
        background: ${(props) => props.theme['gray-900']}; 
    }
        
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme['zinc-400']};         
    }

    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme['zinc-200']}; 
    }

    .scroll-ativated {

        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    table {

        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
    }

    th {
        
        position: sticky;
        top: 0;
        padding: 1rem;
        background-color: ${(props) => props.theme['gray-600']};

        color: ${(props) => props.theme['gray-100']};
        text-align: left;        
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {

            border-top-left-radius: 8px;
            padding-left: 1.5rem;
        }

        &:last-child {

            border-top-right-radius: 8px;
            padding-right: 1rem;
        }
    };

    td {

        background-color: ${(props) => props.theme['gray-700']};
        border-top: 4px solid ${(props) => props.theme['gray-800']};
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;

        &:first-child {
            
            padding-left: 1.5rem;
            width: 50%;
        }

        &:last-child {
        
            padding-right: 1rem;
        }
    };
`;

export const HistoryTable = styled.table`

  position: relative;
  border-collapse: collapse; 
`

export const HistoryTableBody = styled.tbody`

    height: "80%";
    scroll-behavior: "auto";
`

const STATUS_COLORS = {

    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const

interface StatusProps {

    statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`

    display: flex;
    align-items: center;
    gap: 0.5;

    &::before {

        content: '';
        margin-right: 1rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 999999px;
        background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]}
    }
`;