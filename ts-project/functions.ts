
const sum = (a: number, b: number): number => a + b;
function greet(name: string, role: string = "Guest"): void {
  console.log(`Hello ${name}, your role is ${role}`);
}

async function delayPrint(msg: string, time: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, time);
  });
}
console.log("Sum:", sum(2, 3));      
greet("Ha");                          
greet("Ha", "Admin");                
delayPrint("Printed after 1 second", 1000);