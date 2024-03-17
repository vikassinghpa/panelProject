myFunction=(name,age)=>{
    console.log(`my name is ${name} and my age is ${age}`)
}

let item=setTimeout(myFunction,1000,"vikas",21);
clearTimeout(item)
console.log(item)