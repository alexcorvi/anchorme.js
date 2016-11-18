const bench = function (title) {
    this.startingTime = new Date().getTime();
    this.marks = [];
    this.title = title?title:false;
    return this;
};

bench.prototype =  {
    marks:[],
    mark:function (mark) {
        this.marks.push({
            time:this.marks.length ? new Date().getTime() - this.startingTime - this.marks[this.marks.length-1].time : new Date().getTime() - this.startingTime,
            mark:mark || this.marks.length + 1
        });
        return this;
    },
    end:function () {
        var mostExpensive = {
            mark:null,
            time:0
        };
        var leastExpensive = {
            mark:null,
            time:Infinity
        };
        var totalExecutionTime = 0;
        var graphURL = "http://chartspree.io/bar.svg?";
        var JSON = {};

        for (var i = 0; i < this.marks.length; i++) {
            graphURL = `${graphURL}&${encodeURI(this.marks[i].mark)}=${this.marks[i].time}`;
            totalExecutionTime = totalExecutionTime + this.marks[i].time;
            JSON[this.marks[i].mark] = this.marks[i].time;
            if(this.marks[i].time > mostExpensive.time) mostExpensive = this.marks[i];
            if(this.marks[i].time < leastExpensive.time) leastExpensive = this.marks[i];
        }

        function numbersToGraph (title,args){
            var numbers = args.map((x)=>x.time);
            var maxMarkStringNumber = Math.max.apply(this,args.map((x)=>x.mark.length));
            var total = numbers.reduce((t,x)=>x+t,0);
            var graphs = numbers
            .filter((x)=>x>-1)
            .map((x)=>Math.round((x/total)*20))
            .map((x)=>"|"+"■".repeat(x)+"□".repeat(20-x)+"|");
            var data = args
            .map((x) => " - " + x.mark + " ".repeat(maxMarkStringNumber - x.mark.length))
            .map((x,i) => x + " : " + graphs[i] + " " + numbers[i] + " ms");
            return () => {
                if(title) console.log(title);
                else console.log("Benchmark results");
                data.forEach((x)=>console.info(x));
            };
        }

        var graphFunction = numbersToGraph(this.title,this.marks);
        return {
            title:this.title,
            mostExpensive:{
                mark:leastExpensive.mark,
                time:leastExpensive.time
            },
            leastExpensive:{
                mark:leastExpensive.mark,
                time:leastExpensive.time
            },
            total:totalExecutionTime,
            graph:graphFunction,
            data:JSON
        };
    },
};

module.exports = bench;