export const formatter =(number)=>{
    return number.toLocaleString('en-IN',{
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
})
}