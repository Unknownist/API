const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns= document.querySelector('.dropdown  ')
const selects=document.querySelectorAll('select')
const btn=document.querySelector('button')
const fromCurr= document.querySelector('.from select')
const toCurr=document.querySelector('.to select')


window.addEventListener('load',()=>{
    UpdateExchangeRate()
})



let i=0;




for(let select of selects){
    for(currCode in countryList){
        let newOption= document.createElement("option")
        newOption.innerText=currCode;
        newOption.value=currCode;
    
        if(select.name === 'From' && currCode === 'USD'){
            newOption.selected='selected'
            }else if(select.name === 'To' && currCode === 'INR'){
            newOption.selected='selected'
            }
        select.append(newOption)
    }
    select.addEventListener('change',(evt) =>{
    updateFlag(evt.target)
})

}


const updateFlag = (element) => {
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img= element.parentElement.querySelector('img')
    img.src= newSrc;

}

btn.addEventListener('click', (evt) => {
    evt.preventDefault()
    UpdateExchangeRate()
})


const UpdateExchangeRate = async () => {
    let amount=document.querySelector('.amount input')
    let amountVal= amount.value;
    console.log(amountVal)
    if(amountVal === "" || amountVal < 1){
        amountVal=1;
        amount.value=1;
        
    }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data= await response.json()
    let CurrValues= await data[fromCurr.value.toLowerCase()]
    let rate= await CurrValues[toCurr.value.toLowerCase()]
    let finalAmount= amountVal * rate;
    msg.innerText=`Exchange Rate: ${amountVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`

}

