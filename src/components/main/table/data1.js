function dataClassification(val){
    let allArr = {}
    for(let i of val){
        let oneArr = [];
        for(let j of i.list){
            let el = j;
            //事件总数
            j.affair = j.login + j.sign + j.order;
            // 每一条数据的平均停留时长
            j.averageStay = (j.stayTime / j.visit).toFixed(2)-0;
            // 每一条数据登录的转化率
            j.affairLogin = (j.login / j.visit).toFixed(2)-0;
            // 每一条数据注册的转化率
            j.affairSign = (j.sign / j.visit).toFixed(2)-0;
            // 每一条数据预约的转化率
            j.affairOrder = (j.order / j.visit).toFixed(2)-0;
            // 每一条数据所有事件的转化率
            j.affairAll = (j.affair / j.visit).toFixed(2)-0;
            // 添加的数组
            oneArr.push(j)
        }
        allArr[i.name] = oneArr;
        // allArr.push({
        //     name:i.name,
        //     data:oneArr
        // })
    }
    return allArr;
}


export {dataClassification};

