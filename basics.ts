let username: string = "Nguyen Thi Truc Na";
let age: number = 31;
let isActive: boolean = true;
let role : string[] = ["BE", "FE", "QA"];
//let user : [string, string, boolean] = ["nantt", "nguyen.thi.truc.na@sun-asterisk.com" , true];
interface User {name: string, email: string, isAdmin: boolean};
const testUser : User = {name: "nantt", email: "nguyen.thi.truc.na@sun-asterisk.com", isAdmin: true}

console.log("User: ", username, "(email: ", testUser.email, "), Role: ", role[2], ", Active: ", isActive);
if (age >= 18 ){
    console.log("Adult");
} else console.log("Under 18");