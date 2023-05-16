const inputBtn=document.getElementById("input-btn")
const deleteBtn=document.getElementById("delete-btn")
const ulEl=document.getElementById("ul-el")
const inputEl=document.getElementById("input-el")
const tabBtn=document.getElementById("tab-btn")
let myLeads=[]
let oldLeads=[]

let localSTleads=JSON.parse(localStorage.getItem("myLeads"))
console.log(localSTleads)

if(localSTleads){
    myLeads=localSTleads
    render(myLeads)
}

function render(leads){
   let listItems=""
     for(let i=0;i<leads.length;i++){ 
         listItems+=`
         <li>
                 <a target='_blank' href='${leads[i]}'>
                       ${leads[i]}
                 </a>
         </li>
    `
    }
            ulEl.innerHTML=listItems
         
}
inputBtn.addEventListener("click" , function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick",function(){
     localStorage.clear()
     myLeads=[]
     render(myLeads)

})

tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
     let activeTab = tabs[0]
     let activeTabId = activeTab.id // or do whatever you need
     myLeads.push(tabs[0].url)
     localStorage.setItem("myLeads",JSON.stringify(myLeads))
     render(myLeads)
     console.log(localStorage.getItem("myLeads"))
    })
   
})




