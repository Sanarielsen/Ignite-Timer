import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import { CyclesContextProvider } from './contexts/CyclesContext'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />        
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
