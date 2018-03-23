function dataClassification(val){
    let arr = []
    for(let i of val){
        let all ={
            type:"",
            browseAll:0, //总浏览刘
            visitAll:0, //总访问数
            affairNumAll:0, //总事件发生数
            stayTimeAll:0, //总停留时长
            averageStayAll:0, //平均停留时长
            list:[]
        }
        let login = {
            type:"",
            browseAll:0, //总浏览刘
            visitAll:0, //总访问数
            affairNumAll:0, //总事件发生数
            stayTimeAll:0, //总停留时长
            averageStayAll:0, //平均停留时长
            list:[]
        }
        let sign = {
            type:"",
            browseAll:0, //总浏览刘
            visitAll:0, //总访问数
            affairNumAll:0, //总事件发生数
            stayTimeAll:0, //总停留时长
            averageStayAll:0, //平均停留时长
            list:[]
        }
        let order = {
            type:"",
            browseAll:0, //总浏览刘
            visitAll:0, //总访问数
            affairNumAll:0, //总事件发生数
            stayTimeAll:0, //总停留时长
            averageStayAll:0, //平均停留时长
            list:[]
        }  

        for(let j of i.list){
            let el = j;
            // 每一条数据的转化率
            j.percentage = (j.affairNum / j.visit).toFixed(2);
            // 每一条数据的平均停留时长
            j.averageStay = (j.stayTime / j.visit).toFixed(2);
            // 每一条数据登录的转化率
            j.affairLogin = (j.login / j.visit).toFixed(2)
            // 每一条数据注册的转化率
            j.affairSign = (j.sign / j.visit).toFixed(2);
            // 每一条数据的转化率
            j.affairOrder = (j.order / j.visit).toFixed(2)
            //
            all.browseAll += j.browse;
            all.visitAll += j.visit;
            all.affairNumAll += j.affairNum;
            all.stayTimeAll += j.stayTime;
            all.averageStayAll += j.averageStay;
            all.list.push(j)
            if(j.affair == "登录"){
                login.browseAll += j.browse;
                login.visitAll += j.visit;
                login.affairNumAll += j.affairNum;
                login.stayTimeAll += j.stayTime;
                login.list.push(j)
            }else if(j.affair == "注册"){
                sign.browseAll += j.browse;
                sign.visitAll += j.visit;
                sign.affairNumAll += j.affairNum;
                sign.stayTimeAll += j.stayTime;
                sign.list.push(j)
            }else if(j.affair == "预约"){
                order.browseAll += j.browse;
                order.visitAll += j.visit;
                order.affairNumAll += j.affairNum;
                order.stayTimeAll += j.stayTime;
                order.list.push(j)
            }
        }
        // 设置转化率
        all.percentageAll = (all.affairNumAll / all.visitAll).toFixed(2);
        login.percentageAll = (login.affairNumAll / login.visitAll).toFixed(2);
        sign.percentageAll = (sign.affairNumAll / sign.visitAll).toFixed(2);
        order.percentageAll = (order.affairNumAll / order.visitAll).toFixed(2);
        // 设置平均停留时长
        all.averageStayAll = (all.stayTimeAll / all.visitAll).toFixed(2);
        login.averageStayAll = (login.stayTimeAll / login.visitAll).toFixed(2);
        sign.averageStayAll = (sign.stayTimeAll / sign.visitAll).toFixed(2);
        order.averageStayAll = (order.stayTimeAll / order.visitAll).toFixed(2);
        // 设置时间状态
        all.affairAll = "全部";
        login.affairAll = "登录";
        sign.affairAll = "注册";
        order.affairAll = "预约";
        all.name = login.name = sign.name = order.name = i.name;
        arr.push({
            all:all,
            login:login,
            sign:sign,
            order:order
        })
    }
    console.log(arr)
    console.log(1)
    return arr;
}

function dataExtract(data,val){
    let arr = [];
    if(val == 0){
        for(let i of data){
            arr.push(i.all)
        }
    }else if(val == 1){
        for(let i of data){
            arr.push(i.login)
        }
    }else if(val == 2){
        for(let i of data){
            arr.push(i.sign)
        }
    }else if(val == 3){
        for(let i of data){
            arr.push(i.order)
        }
    }

    return arr;
}


export {dataClassification,dataExtract};

