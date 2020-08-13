var $ = jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui')

var filesys = require('fs')


const electron = require('electron') 
// Importing BrowserWindow from Main 
const BrowserWindow = electron.remote.BrowserWindow;

var current = document.getElementById('printcontent');  

var options = { 
    silent: false, 
    printBackground: true, 
    color: false, 
    margin: { 
        marginType: 'printableArea'
    }, 
    landscape: true, 
    pagesPerSheet: 1, 
    collate: false, 
    copies: 1, 
    header: 'Kent Pharmaceuticals Expense record'
} 
  
current.addEventListener('click', (event) => { 
    let win = BrowserWindow.getFocusedWindow(); 
    // let win = BrowserWindow.getAllWindows()[0]; 
  
    win.webContents.print(options, (success, failureReason) => { 
        if (!success) console.log(failureReason); 
  
    }); 
}); 

var totaling= 0;




function notify(data)  {


$("#stat").text("Saved Successfully");

$("#stat").css({"opacity":"100%","transition-duration":"1s"});


setTimeout(()=> {

    $("#stat").css({"opacity":"0%"});


},2000)




}





var doclength;

$( "#datepick" ).datepicker({
  onSelect: function (dateText, inst) {

    $("#right").empty();
    $("#totaln").text("0")
    totaling = 0;

    $('#onLoad').css({"opacity" : "0%" , "z-index" : "-1"  })
    
   
   $(".dis").css({"cursor" : "no-drop", "pointer-events" :"none"})
     $("#a,#s").css({color: "rgba(0,0,0,.4)"})

     let retdate = parseInt( dateText.split('/')[2],10);
     let retmonth = parseInt(dateText.split('/')[1],10);
     let retyear = parseInt(dateText.split('/')[0],10);


     let date = retdate+' '+getMonth(retmonth)+','+retyear;

     $("#right").append(`<p class="dateui">${date}</p>`)  

     let dirpath = `${retyear}${retmonth}`;

     let obn = filesys.readFileSync(`Database/${dirpath}/${dirpath}${retdate}`);
     
    let Retriveddata =JSON.parse(obn)


    for(let doWork =0 ; doWork < Retriveddata.length ; ++doWork) {


let entries = `<div class="t"><div  class="describing"><p class ="cont" >${Retriveddata[doWork]["des"]}</p></div><div class="pricing"><p>${Retriveddata[doWork]["exp"]}</p></div></div>`


totaling = totaling + parseFloat(Retriveddata[doWork]["exp"] );

$("#right").append(entries)





    }
$("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
  

  },
  dateFormat: "yy/mm/dd"
});



$( "#startrange" ).datepicker({ dateFormat: 'yy/mm/dd' });
$( "#endrange" ).datepicker({ dateFormat: 'yy/mm/dd' });



function rangedquery (starting =  "2020-08-3",ending   =  "2020-08-10")  {

totaling = 0;

$("#right").empty();
$(".dis").css({"cursor" : "no-drop", "pointer-events" :"none"})
     $("#a,#s").css({color: "rgba(0,0,0,.4)"})
    let startdate  =  new Date(starting);
    let endingdate = new Date(ending);

    while (startdate <= endingdate) {



let dirpath = `${startdate.getFullYear()}${startdate.getMonth()+1}`;
let filepath = `Database/${dirpath}/${dirpath}${startdate.getDate()}`;

if (filesys.existsSync(filepath)) {

    let formatteddate  = startdate.getDate()+' '+getMonth(startdate.getMonth()+1)+','+startdate.getFullYear();

    $("#right").append(`<p class="dateui">${formatteddate}</p>`)
    
    let obn = filesys.readFileSync(filepath);

    let Retriveddata =JSON.parse(obn)
    
    
    for(let doWork =0 ; doWork < Retriveddata.length ; ++doWork) {
    
    
    let entries = `<div class="t"><div  class="describing"><p class ="cont" >${Retriveddata[doWork]["des"]}</p></div><div class="pricing"><p>${Retriveddata[doWork]["exp"]}</p></div></div>`
    
    totaling = totaling + parseFloat(Retriveddata[doWork]["exp"] );

    $("#right").append(entries)
    
    
    
    }
    
    
    Retriveddata = {}

}




startdate.setDate(startdate.getDate()+1);




    }

    $("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))


}



$("#selrange").click(()=> {

    $("#right").empty();
    $('#onRange').css({"opacity" : "0%" , "z-index" : "-1" })
    
    let s=   $( "#startrange" ).datepicker({ dateFormat: 'yy/mm/dd' }).val();
    let e =    $( "#endrange" ).datepicker({ dateFormat: 'yy/mm/dd' }).val();
   

rangedquery(s,e);

   })
   

$(document).ready(function()  {





    var today = new Date();

    $("#da").html(date)


    let op = {


    }
    
    
    let dirpath = `${today.getFullYear()}${(today.getMonth()+1)}`;
    
          filesys.readFile(`Database/${dirpath}/${dirpath}${today.getDate()}` , (err,obn)=> {

            if (err) {
               
            }

            else {

                let Retriveddata =JSON.parse(obn)
    
    
                for(let doWork =0 ; doWork < Retriveddata.length ; ++doWork) {
            
            
            let entries = `<div class="t"><div  class="describing"><p class ="cont" >${Retriveddata[doWork]["des"]}</p></div><div class="pricing"><p>${Retriveddata[doWork]["exp"]}</p></div><div class="closure"><p class ="crosses"> &times; </p></div></div>`
            
            totaling = totaling + parseFloat(Retriveddata[doWork]["exp"] );


            $("#right").append(entries)
            
            
            
                }

                $("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))

            }


         });
         
     
    

})



$("#home").click(function()  {

    totaling = 0;
    $("#right").empty();

    $(".dis").css({  "cursor" : "default", "pointer-events" :"auto"})
    $("#a,#s").css({color: "white"})
    $("#totaln").text("0")

   var today = new Date();


$("#right").append(`<p class="dateui">${date}</p>`)  


let dirpath = `${today.getFullYear()}${(today.getMonth()+1)}`;

      filesys.readFile(`Database/${dirpath}/${dirpath}${today.getDate()}` , (err,obn)=> {

            if (err) {
               
            }

            else {

                let Retriveddata =JSON.parse(obn)
    
    
                for(let doWork =0 ; doWork < Retriveddata.length ; ++doWork) {
            
            
            let entries = `<div class="t"><div  class="describing"><p class ="cont" >${Retriveddata[doWork]["des"]}</p></div><div class="pricing"><p>${Retriveddata[doWork]["exp"]}</p></div><div class="closure"><p class ="crosses"> &times; </p></div></div>`
            
            totaling = totaling + parseFloat(Retriveddata[doWork]["exp"] );
            $("#right").append(entries)
            
            
            
                }

                $("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
            }


         });
})







function getMonth (g)  {


if ( g == 1)  return "January";
if ( g == 2)  return "February";
if ( g == 3)  return "March";
if ( g == 4)  return "April";
if ( g == 5)  return "May";
if ( g == 6)  return "June";
if ( g == 7)  return "July";
if ( g == 8)  return "August";
if ( g == 9)  return "September";
if ( g == 10)  return "October";
if ( g == 11)  return "November";
if ( g == 12)  return "December";


}






var today = new Date();

let date = today.getDate()+' '+getMonth((today.getMonth()+1))+','+today.getFullYear();

$("#da").html(date)



$("#addcontent").on("click", function( ) {



   $('#onadd').css({"opacity" : "100%" , "z-index" : "3" })
 


})


$("#enterd").on("mouseleave", function( ) {



    $('#onadd').css({"opacity" : "0%" , "z-index" : "-1" })



})




$("#loadcontent").on('click',function()  {


  $('#onLoad').css({"opacity" : "100%" , "z-index" : "3" })
 
})





$("#pickthedate").on("mouseleave", function( ) {



    $('#onLoad').css({"opacity" : "0%" , "z-index" : "-1" })



})


$("#range").on('click', function(){

$("#onRange").css({"opacity" : "100%" , "z-index" : "3" })

    
})


$("#rangepicker").on('mouseleave', function(){

$("#onRange").css({"opacity" : "0%" , "z-index" : "-1" })

    
})




$("#doadd").on('click',function()  {

let des = $('#data1').val();
let exp = $('#data2').val();


let entries = `<div class="t"><div  class="describing"><p class ="cont" >${des}</p></div><div class="pricing"><p>${exp}</p></div><div class="closure"><p class ="crosses"> &times; </p></div></div>`

$("#right").append(entries)

totaling = totaling + parseFloat(exp,10)
$("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))

$('#onadd').css({"opacity" : "0%" , "z-index" : "-1" })
$('#data1').val("");
$('#data2').val("");

})

var storingdata = new Object();
  let onedata = {}
    let wholearray = []


$("#savecontent").on('click' , function()  {


    $('#right').children('.t').each(function () {


   
        onedata['des'] = $(this).children().eq(0).text();
        onedata['exp'] = $(this).children().eq(1).text();
    

        wholearray.push(onedata);

        onedata = {};



    });

storingdata[0]= wholearray;

let stringdata = JSON.stringify(storingdata[0]);

let pathway= "Database/"+ `${today.getFullYear()}${(today.getMonth()+1)}`;


filesys.mkdir(pathway, function(err) {

    
    filesys.writeFileSync(`${pathway}/${today.getFullYear()}${(today.getMonth()+1)}${today.getDate()}` , stringdata )

  

  storingdata= {};
wholearray = [];

notify("Saved Successfully")

})




})

$(document).on('mouseenter', "p.crosses"   ,function()  {


$(this).css({color:"red" ,"transition" : "200ms"});


}) 

$(document).on('click', "p.crosses"   ,function()  {

    $(this).parent().parent().animate({"opacity":"0%" , "max-height" :"0px", "margin-bottom" :"0px"},1000 ,function() {

        $(this).remove();

      let cut=  parseFloat( $(this).children().eq(1).children().text())
        
        totaling = totaling - cut
       $("#totaln").text(totaling.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))


    })
  

    
    }) 


$(document).on('mouseleave' , "p.crosses" ,function()  {


    $(this).css({color:"black" ,"transition" : "200ms"});
    
    
    }) 
    
    



    $('#data2').keypress(function(e)  {


if (e.which == 46)  return true;

        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                   return false;
        }
    })


