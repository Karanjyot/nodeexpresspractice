window.onload = function () {


  function getData() {
    $.ajax({
      url: "http://localhost:5000/api/food",
      method: "post",
      data: {
          food: "taco",
          rating: 50
      },
      success: function(response){
        console.log(response);
        
      },
      error: function(){
          console.log("this is the wrong url")
      }
    });
  }

//   function getData() {

//     $.ajax({
//       url: "http://localhost:5000/api/food",
//       method: "post",
//     }).then(function (response) {
//       console.log(response);
//     });
//   }

  $("#but").click(function(){
    getData()
   
  })
}