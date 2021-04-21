let Customers=[]
let customer1_id=""
let customer2_id=""
let customer1_name=""
let customer2_name=""
fetch( 'https://localhost:44385/api/Customer' )
    .then( response => response.json() )
    .then( response => {
        let tbody=document.getElementById("Add_Customer")
        Customers=response
        //console.log(Customers)
        for(let i=0;i<response.length;i++)
        {
            let tr= `<tr id=${response[i].id}>
            <td>${response[i].name}</td>
            <td>${response[i].email}</td>
            <td>${response[i].amount}</td>
            <td><button onclick="Move_to_Send_Money(${response[i].id})" class="btn btn-primary">Send Money</button></td>
        </tr>`
            tbody.innerHTML+=tr;
        }
        //console.log(response[0].name)
    } );
function Move_to_Send_Money(id)
{
    window.location.href="/pages/sendmoney.html"+"#"+id;
    //alert(id);
}
function SEND_MONEY()
{
    customer1_id = window.location.hash.substring(1);
    fetch( 'https://localhost:44385/api/Customer' )
    .then( response => response.json() )
    .then( response => {
        let tbody=document.getElementById("Add_Customer_filter")
        for(let i=0;i<response.length;i++)
        {
            if(response[i].id!=customer1_id)
            {
                let tr= `<tr id=${response[i].id}>
                <td>${response[i].name}</td>
                <td>${response[i].email}</td>
                <td>${response[i].amount}</td>
                <td><button onclick="Transection(${response[i].id})" class="btn btn-primary">Send</button></td>
            </tr>`
                tbody.innerHTML+=tr;
            }      
        }
        //console.log(response[0].name)
    } );   
}
function Transection(id)
{
    customer2_id=id;

    let flag1=false;
    let flag2=false;
    console.log("pay from", customer1_id)
    console.log("Pay to",customer2_id)
    var span = document.getElementsByClassName("close")[1];
    modal4.style.display = "block";
    span.onclick = function() {
        modal4.style.display = "none";
    }
    
    let SEND=document.getElementById("SEND");
    SEND.addEventListener("click",()=>{
        let Amount_input=document.getElementById("Amount_input").value
        for(let i=0;i<Customers.length;i++)
        {
            if(Customers[i].id==customer1_id)
            {       
                if(Amount_input>Customers[i].amount)
                {
                    console.log(Customers[i])
                    alert("You have insufficient balance")
                    break;
                }
                else
                {
                    customer1_name=Customers[i].name;
                    const params = {
                        id:customer1_id,
                        Name: Customers[i].name,
                        Email:Customers[i].email,
                        Amount:Customers[i].amount-Amount_input
                    };
                    console.log(params)
                    // const options = {
                    //     method: 'PUT',
                    //     body: JSON.stringify( params )  
                    // };
                    fetch( 'https://localhost:44385/api/Customer/'+customer1_id, 
                    {
                        method:"PUT",
                        headers:{
                            'Content-type':'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(params)   
                    })
                    .then(()=>{
                        flag1=true;
                    })
                }
            }
            else if (Customers[i].id==customer2_id)
            {
                customer2_name=Customers[i].name;
                    const params = {
                        id:customer2_id,
                        Name: Customers[i].name,
                        Email:Customers[i].email,
                        Amount:parseInt(Customers[i].amount)+parseInt(Amount_input)
                    };
                    console.log(params)
                    // const options = {
                    //     method: 'PUT',
                    //     body: JSON.stringify( params )  
                    // };
                    fetch( 'https://localhost:44385/api/Customer/'+customer2_id, 
                    {
                        method:"PUT",
                        headers:{
                            'Content-type':'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(params)      
                    }).then(()=>{
                        flag2=true;
                        alert("Money Transfered Successfully")
                        var modal4 = document.getElementById("myModal4");
                        modal4.style.display = "none";
                    })
                    fetch( 'https://localhost:44385/api/transections' )
                    .then( response => response.json() )
                    .then( response => {
                        fetch( 'https://localhost:44385/api/transections/', 
                        {
                            method:"POST",
                            headers:{
                                'Content-type':'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },
                            body: JSON.stringify({
                                id:response.length,
                                customer1: customer1_name,
                                customer2: customer2_name,
                                Amount:parseInt(Amount_input)
                            })      
                        })
                    })
                }
            }
    })
}

function Load_Tran()
{
    fetch( 'https://localhost:44385/api/transections' )
    .then( response => response.json() )
    .then( response => {
        let tbody=document.getElementById("Add_Transections")
        Customers=response
        //console.log(Customers)
        for(let i=0;i<response.length;i++)
        {
            let tr= `<tr id=${response[i].id}>
            <td>${response[i].customer1}</td>
            <td>${response[i].customer2}</td>
            <td>${response[i].amount}</td>
        </tr>`
            tbody.innerHTML+=tr;
        }
        //console.log(response[0].name)
    } );
}
function Send_Money(id)
{
    let tbody=document.getElementById("Add_Customer")
    tbody.innerHTML="";
    fetch( 'https://localhost:44385/api/Customer' )
    .then( response => response.json() )
    .then( response => {
        let tbody=document.getElementById("Add_Customer")
        for(let i=0;i<response.length;i++)
        {
            if(response[i].id != id)
            {
                let tr= `<tr id=${response[i].id}>
                <td>${response[i].name}</td>
                <td>${response[i].email}</td>
                <td>${response[i].amount}</td>
                <td><a href="#" id="myBtn2" class="btn btn-primary">Send To</button></a>
                </tr>`
                tbody.innerHTML+=tr;
            }
            
        }
        //console.log(response[0].name)
    } );

}

