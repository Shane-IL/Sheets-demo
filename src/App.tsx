import { RecoilRoot } from 'recoil';

import Sheet from './components/sheet';


function App() {


  return (
    <RecoilRoot>
      <div className="h-screen bg-gray-600 overflow-hidden">
        <div className='grid place-items-center'>
          <Sheet />
        </div>
      

      </div>
    </RecoilRoot>
  )
}

export default App
