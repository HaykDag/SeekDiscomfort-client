import { RouterProvider } from 'react-router-dom'
import MyRouter from "./hooks/useRouter";
import { useDispatch } from 'react-redux'
import { fetchItems} from './features/items/itemsSlice'
import { fetchCategories } from './features/Categories/CategorySlice';
import { useEffect } from 'react';
import { pageSize } from './components/AppData';
function App() {

  const myRouter = MyRouter()
  
  const dispatch = useDispatch();

  //fetching items as soon as app loads
  useEffect(()=>{
    dispatch(fetchItems({ value:"", page:1, pageSize, searchTag:"" }))
    dispatch(fetchCategories());
  },[dispatch])
 
  return (
    <div className="App">
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
