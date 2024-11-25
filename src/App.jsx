
import { useState,useEffect } from 'react'
import './App.css'
import { TextField,Stack ,Button,Select,MenuItem,InputLabel,FormControl} from '@mui/material';
function App() {
  
  const [selectedtype,setSelectedType]=useState("simpleInterest")
  const [principalAmount,setprincipalAmount]=useState("")
  const [interestrate,setinterestRate]=useState("")
  const [noofyears,setnoofyears]=useState("")
  const [compoundingPeriod,setCompoundingPeriod]=useState("Yearly")

  const [isAmountInvalid,setisAmountInvalid]=useState(false)
  const [isInterestValid,setisInterestValid]=useState(false)
  const [isYearInvalid,setisYearInvalid]=useState(false)

  const [interest,setinterest]=useState("")
  const [totalAmount,setoatalAmount]=useState("")

console.log(principalAmount);

const handleRadioChange=(e)=>{

  let type=e.target.value
  setSelectedType(type)



}

const validateInput=({value,name})=>{

if(value==""){
  if(name=="pAmount"){

    setprincipalAmount("")
    
  
    
  }
  else if(name=="interestRate"){
    setinterestRate("")
  
  
  }
  else{
    setnoofyears("")
  
  
  }
}
else{
  if(!!value.match(/^\d*\.?\d*$/)){

    if(name=="pAmount"){
 
   setprincipalAmount(value)
   
   setisAmountInvalid(false)
 
   
 }
 else if(name=="interestRate"){
   setinterestRate(value)
   setisInterestValid(false)
 
 
 }
 else{
   setnoofyears(value)
   setisYearInvalid(false)
 
 
 }
 }
 else{
   if(name=="pAmount"){
     setisAmountInvalid(true)
     
   }
   else if(name=="interestRate"){
     setisInterestValid(true)
   
   }
   else{
     setisYearInvalid(true)
   
   }
 }
 
 
   }

}
const calculateInterest=(e)=>{
  e.preventDefault()
if(principalAmount && interestrate && noofyears){
  if(selectedtype=='simpleInterest'){
    var simpleInterest=principalAmount*interestrate*noofyears/100
    setinterest(simpleInterest)
    setinterest(simpleInterest.toFixed(2))
    let totalAmount=(Number(simpleInterest)+Number(principalAmount))
    setoatalAmount(totalAmount.toFixed(2))
  }
  else if(selectedtype=='compoundInterest'){
    let n;
    switch (compoundingPeriod) {
      case 'Yearly':
      n=1
      break;
      case 'Halfyearly':
      n=2;
      break;
      case 'Quaterly':
      n=4
      break;
      case 'Monthly':
      n=12
      break;
     
    }
    let r=interestrate/100
    var compoundInterest=principalAmount*(1+r/n)**(n*noofyears)-principalAmount
    setinterest(compoundInterest.toFixed(2))
    let totalAmount=(Number(compoundInterest)+Number(principalAmount))
    setoatalAmount(totalAmount.toFixed(2))
  }
}
else{
  alert("please enter all the fields")
}

 
}

const reset = () => {
  setprincipalAmount("");
  setinterestRate("");
  setnoofyears("");
  setinterest(""); 
  setoatalAmount("");
  setisAmountInvalid(false);
  setisInterestValid(false);
  setisYearInvalid(false);
};

  return (
    <>
    <div className="container  p-5 bg-light w-50 " 
    style={{minHeight:'100vh'}}>
    <h2 className='text-center mt-2 mb-3'>Simple Interest Calculator</h2>
{/* here */}
<label className='me-3'><input type="radio" value='simpleInterest' checked={selectedtype=='simpleInterest'} onChange={e=>handleRadioChange(e)} /> Simple Interest </label>
<label ><input type="radio" value='compoundInterest' checked={selectedtype=='compoundInterest'} onChange={e=>handleRadioChange(e)}  /> Compund Interest </label>


    <div className='mt-3 p-2 rounded text-light m-auto text-center bg-dark w-100 '>
  <h4>Interest ₹ {interest}</h4>
  <h4>Total Amount ₹ {totalAmount}</h4>
</div>

<form  className='mt-2'>
  <TextField 
        name='pAmount' 
        onChange={(e)=>validateInput(e.target)} 
        className='w-100 mt-3'
        id="Amount" 
        label="Principal Amount" 
        variant="outlined"
        value={principalAmount}

    
         />
  {isAmountInvalid &&<div className='text-danger mt-2 '>Invalid number</div> }
    
  <TextField 
        name='interestRate' 
        onChange={(e)=>validateInput(e.target)}  
        className='w-100 mt-3' 
        id="InterestRate" 
        label="Interest Rate %" 
        variant="outlined"
        value={interestrate}
        />
  {isInterestValid &&<div className='text-danger mt-2 '>Invalid number</div> }

  <TextField  
        name='year' 
        onChange={(e)=>validateInput(e.target)}  
        className='w-100 mt-3 mb-3' 
        id="years" 
        label="Years" 
        variant="outlined"
        value={noofyears}

        />
  {isYearInvalid &&<div className='text-danger mt-2 '>Invalid number</div> }
{selectedtype=='compoundInterest' &&
    <div>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Period</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={compoundingPeriod}
    label="Age"
    onChange={(e) => setCompoundingPeriod(e.target.value)}
  >
    <MenuItem value={'Yearly'}>Yearly</MenuItem>
    <MenuItem value={'Halfyearly '}>Half Yearly</MenuItem>
    <MenuItem value={'Quaterly'}>Quaterly</MenuItem>
    <MenuItem value={'Monthly'}>Monthly</MenuItem>
  </Select>
</FormControl>
    </div>
}

  <Stack className='mt-3' direction="row" spacing={2}>
        <Button  
            disabled={isInterestValid || isAmountInvalid || isYearInvalid}
            type='submit' 
            className='bg-dark w-50 p-2' 
            variant="contained" 
            onClick={(e)=>calculateInterest(e)}>Calculate</Button>
        <Button  
            className='w-50 p-2'  
            variant="outlined" 
            onClick={reset}
            >Reset</Button>
</Stack>

</form >

 
</div>

 
    </>
  )
}

export default App
