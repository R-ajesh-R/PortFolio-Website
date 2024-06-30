export const formatter =(number)=>{
    return number.toLocaleString('en-IN',{
    currency: 'INR',
    maximumFractionDigits: 2,
    style: 'currency',
})
}