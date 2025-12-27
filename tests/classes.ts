export interface IUser {
    name: string;
    email: string;
    isAdmin: boolean;
}
    
export class User implements IUser{

    public name: string;
    public email: string;
    public isAdmin: boolean;

    constructor (name: string, email: string, isAdmin: boolean){
        this.name =name;
        this.email = email;
        this.isAdmin = isAdmin;        
    }

    async getInfo() {
        console.log(`User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`);
    }

}

const TrucNa = new User("Nguyen Thi Truc Na", "nguyen.thi.truc.na@sun-asterisk.com",false);
TrucNa.getInfo();