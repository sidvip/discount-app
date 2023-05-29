import './App.css';
import Layout from './components/layout/layout';
// import Toggle from './components/toggle/toggle';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }} className='p-10 min-w-[1000px] bg-gray-100 h-screen overflow-auto min-h-screen'>
      <Layout />
    </Box>
  );
}

export default App;
