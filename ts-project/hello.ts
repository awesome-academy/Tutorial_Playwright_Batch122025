// Định nghĩa hàm với kiểu dữ liệu rõ ràng
function greet(name: string): string {
    return "Hello, " + name + "! Welcome to TypeScript for QA.";
}

let qaName: string = "QA Auto Team";

console.log(greet(qaName));
