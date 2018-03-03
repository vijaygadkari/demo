function getval(elem){return document.querySelector(elem).value}
function alertdiv(elem,txt,gtin){
    console.log(gtin);
    if(gtin==null){
        if(!elem.nextElementSibling){
        var div=document.createElement("div");
        div.classList.add("alert-danger");
        div.innerHTML= "&#88;";
        elem.parentElement.append(div)
        }
    }
    else{
        var parent=elem.parentNode;
        if(parent.lastElementChild.nodeName!="DIV"){
        var div=document.createElement("div");
        div.classList.add("alert-danger");
        div.classList.add(div.className+"alert");
        div.innerHTML= "&#88;";
        elem.parentElement.append(div)
        }
    }
}
function removealert(elem,gtin){
    var parent=elem.parentNode;
    console.log(gtin);
    if(gtin==null){
        if(elem.nextElementSibling ){
        parent.removeChild(elem.nextElementSibling)
        }
    }
    else{
        console.log(parent.querySelector(".alert-danger"));
        if(parent.querySelector(".alert-danger")){
        parent.removeChild(parent.querySelector(".alert-danger"));
        }
    }
}

function stringvalidation(e,elem){
    
    // console.log(e);    
    (!/^[A-Za-z ]+$/.test(e.key)) || (!/^[A-Za-z ]+$/.test(e.srcElement.value))? alertdiv(elem,"Enter only characters") : removealert(elem);
}
// validation
function novalidation(e,elem,gtin){
    console.log(/^[0-9]/.test(e.key));
    (!/^\d*$/.test(e.key)) ? alertdiv(elem,"Enter only Numbers",gtin) : removealert(elem,gtin);   

}
function urlvalidation(e,elem){
        
        var res = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        (!res.test(e.srcElement.value))? alertdiv(elem,"Enter only characters") : removealert(elem);       
       
    
    
}
// validation
function myfun(){

    var name=document.querySelector("#ame");
    name.addEventListener("keydown",function(e){
        stringvalidation(e,name);
    });

    var cat=document.querySelector("#category");
    cat.addEventListener("keydown",function(e){
        stringvalidation(e,cat);
    });
    var sub=document.querySelector("#sub_category");
    sub.addEventListener("keydown",function(e){
        stringvalidation(e,sub);
    });

    var brand=document.querySelector("#Brand_Name");
    brand.addEventListener("keydown",function(e){
        stringvalidation(e,brand);
    });

    var brand=document.querySelector("#Brand_Name");
    brand.addEventListener("keydown",function(e){
        stringvalidation(e,brand);
    });
    

    var pack=document.querySelector("#Packaging_Type");
    pack.addEventListener("keydown",function(e){
        stringvalidation(e,pack);
    });

// validation
    var gtin1=document.querySelector("#Product_GTIN1");
    gtin1.addEventListener("keydown",function(e){
    novalidation(e,gtin1,gtin1);
    });
    var gtin2=document.querySelector("#Product_GTIN2");
    gtin2.addEventListener("keydown",function(e){
    novalidation(e,gtin2,gtin2);
    });
    sku=document.querySelector("#SKU_Numbar");
    sku.addEventListener("keydown",function(e){
    novalidation(e,sku);
    });
    
    var count=document.querySelector("#Count_of_Barcode");
    count.addEventListener("keydown",function(e){
    novalidation(e,count);
    });
    var url=document.querySelector("#Product_URL");
    url.addEventListener("focusout",function(e){
    urlvalidation(e,url);
    });
// validation

    function postAjax(url, data, success,headers) {
        console.log("typeof data ",typeof data);
        var params = headers != null ? data : Object.keys(data).map(
        function(k){ 
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if(!headers){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        
        xhr.send(params);
        return xhr;
        }
    
    postAjax("details.jsp","",function(data){
        var table=document.querySelector(".tfoot");
        
        var da=data.trim();
        da=da.substring(0,da.length-2);
        da=da+"]";
        s=JSON.parse(da);
        var i=0;
        s.forEach(function(x){
        var tr=table.insertRow(0);
        var td1=tr.insertCell(0);
        data=td1.innerText=x.name;
        var td1=tr.insertCell(1);
        data=td1.innerText=x.Category;
        var td2=tr.insertCell(2);
        data=td2.innerText=x.Sub_Category;
        var td3=tr.insertCell(3);
        data=td3.innerText=x.Product_Description;
        var td4=tr.insertCell(4);
        data=td4.innerText=x.Marketing_Information;
        var td5=tr.insertCell(5);
        data=td5.innerText=x.Date_of_Activation;
        var td6=tr.insertCell(6);
        data=td6.innerText=x.Date_of_De_activation;
        var td7=tr.insertCell(7);
        data=td7.innerText=x.Brand_Name;
        var td8=tr.insertCell(8);
        data=td8.innerText=x.Packaging_Type;
        var td9=tr.insertCell(9);
        data=td9.innerText=x.Product_GTIN1+"  -  "+x.Product_GTIN2;
        var td10=tr.insertCell(10);
        data=td10.innerText=x.Product_URL;
        var td11=tr.insertCell(11);
        data=td11.innerText=x.Count_of_Barcode;
        
        var td12=tr.insertCell(12);
        var td13=tr.insertCell(13);
        data=td13.innerText=x.SKU_Number;
        
       });
        
    });
 
    var bar=document.querySelector("#Count_of_Barcode");
    bar.addEventListener("keydown",function(e){
        if(e.keyCode===13|| e.charCode===13){
			var name=getval("#ame").trim();
			var Cat=getval("#category").trim();
            var S_Cat =getval("#sub_category").trim();
			var P_Desc=getval("#Product_Description").trim();
			var M_Info=getval("#Marketing_Information").trim();
			var Dte_Act=getval("#Date_of_Activation").trim();
			var Dte_Deact=getval("#Date_of_De_Activation").trim();
			var B_Name=getval("#Brand_Name").trim();
			var P_Type=getval("#Packaging_Type").trim();
			var P_GTIN1=getval("#Product_GTIN1").trim();
			var P_GTIN2=getval("#Product_GTIN2").trim();
			var P_URL=getval("#Product_URL").trim();
			var S_Number=getval("#SKU_Numbar").trim();
			var C_Barcode=getval("#Count_of_Barcode").trim();
		      
            var details={
				Name:name,
				Cat:Cat,
				S_Cat:S_Cat,
				P_Desc:P_Desc,
				M_Info:M_Info,
				Dte_Act:Dte_Act,
				Dte_Deact:Dte_Deact,
				B_Name:B_Name,
				P_Type:P_Type,
				P_GTIN1:P_GTIN1,
				P_GTIN2:P_GTIN2,
				P_URL:P_URL,
				S_Number:S_Number,
				C_Barcode:C_Barcode,
            };
                postAjax("Save_details_db.jsp",details,function(data){
                    console.log(data.trim());
                    var file = document.querySelector("#file").files[0].name.split(".");
                    var data = {
                        name : "file[0]",
                        ext : file[file.length-1]
                    }
                
                    var form = new FormData();
                    form.append("name",JSON.stringify(data));//formfeild --> true
                    form.append("img",document.querySelector("#file").files[0]);////formfeild --> false
                    var headers={'processData':'false','Content-Type':'false'};
                    postAjax("Editfile.jsp",form,function(msg){console.log(msg.trim());},headers);
                
                });
        }
	});
	
}


