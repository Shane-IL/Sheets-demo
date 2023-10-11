import { RecoilRoot } from 'recoil';

import Sheet from './components/sheet';


function App() {


  return (
    <RecoilRoot>
      <div className="h-screen bg-gray-600 flex flex-col justify-center items-center box-border">
        <div className='p-4 w-[80dvw] h-[80dvh] overflow-auto pb-6 box-border'>
          <Sheet />
        </div>
      

      </div>
    </RecoilRoot>
  )
}

export default App
