function dataClassification(val){
    let arr = []
    for(let i in val){
            let el = val[i];
            // 时间time
            el.time = i;
            //事件总数
            el.affair = el.login + el.sign + el.order+el.order;
            // 每一条数据的平均停留时长
            let averageDhms = el.visit != 0?(el.stayTime / el.visit).toFixed(0)-0:0;
            let averageTimeData = 0;
            if(averageDhms != 0){
                let averageHours  = Math.floor((averageDhms%(60*60*24))/(60*60))?Math.floor((averageDhms%(60*60*24))/(60*60))+'h':'';
                let averageMinutes  = Math.floor((averageDhms % (60 * 60)) /  60)? Math.floor((averageDhms % (60 * 60)) /  60)+'m':'';
                let averageSeconds  = averageDhms % 60+'s';
                averageTimeData = `${averageHours}${averageMinutes}${averageSeconds}`;
            }else{
                averageTimeData = '无'
            }
            el.averageStay = averageTimeData;
            // 每一天数据的停留时长
            let dhms = el.stayTime;
            let timeData = 0;
            if(dhms != 0){
                let day = Math.floor(dhms/(60*60*24))?Math.floor(dhms/(60*60*24))+'d':'';
                let hours  = Math.floor((dhms%(60*60*24))/(60*60))?Math.floor((dhms%(60*60*24))/(60*60))+'h':'';
                let minutes  = Math.floor((dhms % (60 * 60)) /  60)?Math.floor((dhms % (60 * 60)) /  60)+'s':'';
                let seconds  = dhms % 60+'s';
                timeData = `${day}${hours}${minutes}${seconds}`;
            }else{
                timeData = '无'
            }
            el.stayTime = timeData;
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
