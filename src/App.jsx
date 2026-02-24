import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SchemePage from './pages/SchemePage'
import SchemeDetailsPage from './pages/SchemeDetailsPage'
import FtoListPage from './pages/FtoListPage'
import { DecryptedFtoList } from './pages/DecryptedFtoList'
import { XcelSheet } from './xcel/xcelSheet'
import { SendData2Department } from './pages/SendData2Department'
import { MisPage } from './pages/MisPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/scheme-list" element={<SchemePage />} />
        <Route path="/scheme-details-page" element={<SchemeDetailsPage />} />
        <Route path="/send-data-to-department/:param" element={<SendData2Department/>} />
        <Route path="/fto-list" element={<FtoListPage />} />
        <Route path="/decrypted-fto-list" element={<DecryptedFtoList />} />
        <Route path="/mis" element={<MisPage />} />
        {/* <Route path="/xcel" element={<XcelSheet />} /> */}
      </Routes>
    </>
  )
}

export default App
