class Counter{
    public count: number = 0;

    constructor(count: number) {
        this.count = count;
    }

    increment(){
        this.count++;
        console.log(`Count is now ${this.count}`);
    }

    reset(){
        this.count = 0;
        console.log(`Counter reset ${this.count}`);
    }
}

const counter = new Counter(0);
counter.increment();
counter.increment();
counter.reset();