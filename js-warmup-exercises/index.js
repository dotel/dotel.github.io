function printStars(){
    for(var i = 5; i >= 1; i--){
        for(var j = i; j >= 1; j--){
            document.write("* ")
        }
        document.write("<br>")
    }
}

// printStars()

function displayEduDetail(){
        var person = {
            name: "Sushant Dotel",
            email: "dotelnp@gmail.com", 
            interest: "sports, reading, nature",
            education: [{
                    name: "Bal Uddhar Higher Secondary School",
                    enrolledDate: "2015"
                },
                {
                    name: "Texas Intl College",
                    enrolledDate: "2017"
                }
            ]
        }
        Object.keys(person).forEach(key=> {
            if(key === "education"){
                person[key].forEach(eduDetail => {
                    document.write("Name: " , eduDetail.name, ", Date: ", eduDetail.enrolledDate + "<br>")
                })
            }
        });
    }
// displayEduDetail()

function transformArray(arr, fun){
    for(var i = 0; i < arr.length; i++){
        arr[i] = fun(arr[i])
    }
    return arr;
}
var numbers = [1, 2, 3, 4];
var output = transformArray(numbers, function(num) {
    return num * 2;
});

// document.write(output)


function quickSort(arr, low, high){
    if(low == undefined && high == undefined){
        quickSort(arr, 0, arr.length - 1);
    }
    else{
        if( high <= low) return;
        var j = partition(arr, low, high);
        quickSort(arr, 0, j - 1)
        quickSort(arr, j + 1, high)
    }
}


function partition(a, low, high){
    var i = low, j = high + 1;
    while(true)
    {
        while(a[++i].id < a[low].id)
            if( i === high) break;
        while(a[low].id < a[--j].id)
            if(j === low) break;
        if(i >= j) break;
        swap(a, i, j);
    }
    swap(a, low, j)
    return j;
}
function swap(arr, i, j){
    var temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

quickSort(arr)

// console.log(arr)
// var test = [2, 3, 4]
// swap(test, 1, 2)
// console.log(test)

var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
};


function transformation(input){
    /* 
Expected output about transformation of above input
var output = {
  '1': { id: 1, name: 'John', children: [2, 3] },
  '2': { id: 2, name: 'Sally' },
  '3': { id: 3, name: 'Mark', children: [4] },
  '4': { id: 4, name: 'Harry' },
  '5': { id: 5, name: 'Mike', children: [6] },
  '6': { id: 6, name: 'Peter' }
};
*/
    var output = {}
    return output;

}

// console.log(transformation(input))

/* yesahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
hhhhhhhhhhhhhhhhhhhhhhhhh************************************8
****************************************************/
var dot = document.createElement('div')
dot.style.backgroundColor = 'red'
dot.style.height = "20px"
dot.style.width = "20px"
dot.style.borderRadius = "20px"


var app = document.getElementById('app')
console.log(app)
app.appendChild(dot)