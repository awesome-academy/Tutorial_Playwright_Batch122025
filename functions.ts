function sum(a: number , b: number) : number{ 
    return a + b;
    
}

const multiply = (a: number, b: number ): number => {
    return a *b;
}


function greet(name: string, role: string = "Guest") :void {
    console.log(`Hello ${name}, your role is ${role}`);
} 

 async function delayPrint(msg: string, time: number): Promise <void>{
    await new Promise (resolve => setTimeout(resolve, time));
    console.log(msg);
 }


console.log("tong cua 2 so la:", sum(1,2));
console.log("tich cua 2 so la:", multiply(1,2));
greet("Truc Na","QA");
delayPrint("Day la message hien thi sau 4s", 4000);