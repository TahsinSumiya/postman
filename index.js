console.log('postman');

function getElementFromString(String) {

    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
};

let parameterbox = document.getElementById('parametersBox');
parameterbox.style.display = 'none';
let addedParamsCount = 0;
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block'
})


let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none'
    document.getElementById('requestJsonBox').style.display = 'block';
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    string = ` <div class="form-row my-2">
 <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2} </label>
 <div class="col-md-4">
     <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2}">
 </div>
 <div class="col-md-4">
     <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter ${addedParamsCount + 2}">
 </div>
 <button  class="btn btn-primary deleteParam">-</button>
</div>`;

    let paramElement = getElementFromString(string);
    // console.log(paramElement)
    params.appendChild(paramElement);
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    }
    addedParamsCount++;
});

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
   
     document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";

     let url = document.getElementById('url').value;
     let requestType = document.querySelector("input[name='requestType']:checked").value;
     let contentType = document.querySelector("input[name='contentType']:checked").value;
     
                                                                      


     if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

     console.log('URL is',url);
     console.log('requestType is',requestType);
     console.log('contentType is',contentType);                 
     console.log('data is',data);

     if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
             document.getElementById('responseJsonText').value = text;
            
        });
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
             document.getElementById('responseJsonText').value = text;
            
        });

    }
});


   
