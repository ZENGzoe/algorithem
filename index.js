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

//分治算法之求数组最大子数组
function devideAndConquer_array(arr , lowIdx , highIdx){
    function countCrossMidSum(arr , low , high , mid){
        var leftSum = arr[mid],
            rightSum = arr[mid+1],
            left = mid,
            right = mid + 1;
        
        for(var i = mid , sum = 0 ; i >= low ; i--){
            sum += arr[i];
            if(sum > leftSum){
                leftSum = sum;
                left = i;
            }
        }
        for(var i = mid+1 , sum = 0 ; i <= high ; i++){
            sum += arr[i];
            if(sum > rightSum){
                rightSum = sum;
                right = i;
            }
        }
        return [leftSum + rightSum , left , right];
    };
    if(lowIdx == highIdx){
        return [arr[lowIdx] , lowIdx , highIdx];
    }
    var mid = parseInt((lowIdx + highIdx) / 2);
    var result1 = devideAndConquer_array(arr , lowIdx , mid);
    var result2 = devideAndConquer_array(arr , mid+1 , highIdx);
    var result3 = countCrossMidSum(arr , lowIdx , highIdx , mid);

    if(result1[0] > result2[0] && result1[0] > result3[0]){
        return result1;
    }else if(result1[0] > result2[0]){
        return result3;
    }else{
        return result3[0] > result2[0] ? result3 : result2;
    }
}
var arr1 = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
var result1 = devideAndConquer_array( arr1 , 0 , arr1.length - 1);
console.log(result1);

//动态规划之背包问题
var dynamicProgramming_bag = {
    init : function(){
        var weights = [2,3,4],
            val = [3,4,5],
            num = 3,
            capacity = 5;   //背包承重
        
        console.log(this.knapSack(weights , val , num , capacity))
    },
    knapSack : function(weights , val , num , capacity){
        var T = [];
        for(var i = 0 ; i < num ; i++){
            T[i] = [];
            for(var j = 0 ; j <= capacity ; j++){
                //承重为0，装不下任何物品
                if(j == 0){
                    T[i][j] = 0;
                    continue;
                }
                //装不下当下物件
                if(j < weights[i]){
                    if(i == 0){
                        T[i][j] = 0;
                    }else{
                        T[i][j] = T[i-1][j];
                    }
                    continue;
                }
                //装得下当下物件
                if(i == 0){
                    T[i][j] = val[i];
                }else{
                    T[i][j] = Math.max(val[i] + T[i-1][j-weights[i]] , T[i-1][j]);
                }
            }
        }

        this.findValue(weights , val , num , capacity , T);

        return T;
    }, 
    findValue : function(weights , val , num , capacity , T){
        var i = num -1 , j = capacity;

        while(i > 0 && j > 0){
            if(T[i][j] !== T[i-1][j]){
                console.log(`输出物品${i}，重量：${weights[i]}，价值：${val[i]}`)
                j = j - weights[i];
                i--;
            }else{
                i--;
            }
        }
        if(i == 0){
            if(T[i][j] !== 0){
                console.log(`输出物品${i}，重量：${weights[i]}，价值：${val[i]}`)
            }
        }
    }
}; 
dynamicProgramming_bag.init();

//回溯法之查找矩阵中的路径
var backtracking_matrix = {
    init :function(){
        var arr = ['a', 'b', 't', 'g', 'c', 'f', 'c', 's', 'j', 'd', 'e', 'h'];
        var str = 'bfce';

        console.log(this.hasPath(arr , 4 , 3 , str));
    },
    hasPath : function(matrix , cols , rows , str){
        var visited = [];
        var pathLen = 0;
        for(var i = 0 ; i < cols * rows ; i++){
            visited[i] = false;
        }
        for(var i = 0 ; i < rows ; i++){
            for(var j = 0 ; j < cols ; j++){
                if(this.hasPathCore(matrix , cols , rows , i , j , str , visited , pathLen)){
                    return true;
                }
            }
        }
        return false;
    },
    hasPathCore : function(matrix , cols , rows , i , j , str , visited , pathLen){
        if(pathLen == str.length) return true;

        var hasPath = false;
        if(i >= 0 && i < rows && j >= 0 && j < cols && matrix[i * cols + j] == str[pathLen] && !visited[i * cols + j]){
            visited[i * cols + j] = true;
            pathLen++;
            hasPath = this.hasPathCore(matrix , cols , rows , i - 1 , j , str , visited , pathLen) || this.hasPathCore(matrix , cols , rows , i  , j - 1 , str , visited , pathLen) || this.hasPathCore(matrix , cols , rows , i + 1 , j , str , visited , pathLen) || this.hasPathCore(matrix , cols , rows , i  , j + 1, str , visited , pathLen);
            if(!hasPath){
                pathLen--;
                visited[i * cols + j] = false;
            }
        }
        return hasPath;
    }
}; 
backtracking_matrix.init();

//回溯法之机器人的运动范围
var backtracking_robert = {
    init : function(){
        console.log('机器人的可运动格子：' , this.movingCount(18 , 5 ,5));
    },
    movingCount : function(threshold , rows , cols){
        var visited = [];
        for(var i = 0 ; i < rows * cols ; i++){
            visited[i] = false;
        }
        return this.countingNum(threshold , rows , cols , 0 , 0 , visited);
    },
    countingNum : function(threshold , rows , cols , i , j , visited){
        var count = 0;
        if(this.checkCanMoving(threshold , i , j , rows , cols , visited)){
            visited[i * cols + j] = true;
            count = 1 + this.countingNum(threshold , rows , cols ,i - 1 , j ,  visited)
                      + this.countingNum(threshold , rows , cols ,i , j - 1 , visited)
                      + this.countingNum(threshold , rows , cols ,i + 1 , j , visited)
                      + this.countingNum(threshold , rows , cols ,i , j + 1 , visited);
        }
        return count;
    },
    checkCanMoving(threshold , i , j, rows , cols , visited){
        if(i >= 0 && i < rows && j >= 0 && j < cols && !visited[i * cols + j] && this.getDigitSum(i) + this.getDigitSum(j) <= threshold){
            return true;
        }
        return false;
    },
    getDigitSum(num){
        var sum = 0;
        while(num > 0){
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    }
}  
backtracking_robert.init();

