//贪心算法之找零问题
//不限数额的25美分、10美分、5美分、1美分
var greedyAlgorithm_exchange = {
    init : function(){
        var exchangeNum = 0.63; //需找零
        var coin = [];

        this.makeChange(exchangeNum , coin);
        this.showCoin(coin);
    },
    makeChange : function(exchangeNum , coin){
        var remainAmt = 0;

        if(exchangeNum % 0.25 < exchangeNum){
            coin[3] = parseInt(exchangeNum / 0.25);
            remainAmt = exchangeNum % 0.25;
            exchangeNum = remainAmt;
        }

        if(exchangeNum % 0.1 < exchangeNum){
            coin[2] = parseInt(exchangeNum / 0.1);
            remainAmt = exchangeNum % 0.1;
            exchangeNum = remainAmt;
        }

        if(exchangeNum % 0.05 < exchangeNum){
            coin[1] = parseInt(exchangeNum / 0.05);
            remainAmt = exchangeNum % 0.05;
            exchangeNum = remainAmt;
        }

        coin[0] = parseInt(exchangeNum / 0.01);
    },
    showCoin : function(coin){
        if(coin[3] > 0){
            console.log(`25美分的数量-${coin[3]}-${coin[3] * 0.25}`);
        }
        if(coin[2] > 0){
            console.log(`10没份的数量-${coin[2]}-${coin[2] * 0.1}`)
        }
        if(coin[1] > 0){
            console.log(`5美分的数量-${coin[1]}-${coin[1]*0.05}`)
        }
        if(coin[0] > 0){
            console.log(`1美分的数量-${coin[0]}-${coin[0] * 0.01}`)
        }
    },
}
greedyAlgorithm_exchange.init();

//贪心算法之背包问题
var greedyAlgorithem_bag = {
    init : function(){
        var items = ["A","B","C","D"];  //物件
        var values = [50 , 140 , 60 , 60];  //物件价值
        var weights = [5 , 20 , 10 ,12];    //物件重量
        var capacity = 30;  //背包容量
        
        var bestValue = this.ksack(values , weights , capacity);
        console.log('背包最优价值：',bestValue);
    },
    ksack : function(values , weights , capacity){
        var i = 0,      //物件
            load = 0 ,  //背包目前承载重量
            w = 0 ;     //背包目前价值
        while(load < capacity && i < values.length){
            if(weights[i] < capacity - load){
                load += weights[i];
                w += values[i];
            }else{
                var r = (capacity - load) / weights[i];
                load += weights[i] * r;
                w += values[i] * r;
            }
            ++i;
        }
        return w;
    }
}  
greedyAlgorithem_bag.init();