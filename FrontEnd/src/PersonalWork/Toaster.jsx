import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const Toaster = ({setToaster}) =>{
    useEffect(()=>{
        setTimeout(()=>{
            setToaster(false);
        },5000)
    },[])
    return <div className='toaster'>
        <div>
            <div>
                <p><strong>SUCCESS</strong></p>
                <p>The email was sent successfully</p>
            </div>
            <p style={{position:'absolute',top:'0px',right:'0px'}}><CloseIcon onClick={()=>setToaster(false)} /></p>
        </div>
    </div>
}

export default Toaster;