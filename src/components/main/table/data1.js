function dataClassification(val){
    let arr = []
    for(let i in val){
            let el = val[i];
            // 时间time
            el.time = i;
            //事件总数
            el.affair = el.login + el.sign + el.order+el.order;
            // 每一条数据的平均停留时长
            el.averageStay = el.visit != 0?(el.stayTime / el.visit).toFixed(2)-0:0;
            // 每一条数据登录的转化率
            el.affairLogin = el.visit != 0?(el.login / el.visit).toFixed(2)-0:0;
            // 每一条数据注册的转化率
            el.affairSign = el.visit != 0?(el.sign / el.visit).toFixed(2)-0:0;
            // 每一条数据预约的转化率
            el.affairOrder = el.visit != 0?(el.order / el.visit).toFixed(2)-0:0;
            // 每一条数据share的转化率
            el.affairShare = el.visit != 0?(el.share / el.visit).toFixed(2)-0:0;
            // 每一条数据所有事件的转化率
            el.affairAll = el.visit != 0?(el.affair / el.visit).toFixed(2)-0:0;
            // 添加的数组
            // oneArr.push(el)
            arr.push(el)
    }
    return arr;
}


export {dataClassification};
