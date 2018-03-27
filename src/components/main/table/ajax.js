let ajaxData = []

for(let i in new Array(10).fill(1)){
    ajaxData.push(
        {
            name:'tt'+i,
            browseAll:26470,
            loginAll:474,
            orderAll:343,
            shareAll:3,
            signAll:231,
            stayTimeAll:1364656358,
            type:"day",
            visitAll:233095,
            list:[
                {time: 20180322,browse:1*(i+1),visit:11,stayTime:1 ,login:2+1*(i*i),sign:3+2*(i*i),order:4+3*(i*i) },
                {time: 20180322,browse:2*(i+1),visit:12,stayTime:2 ,login:2+2*(i*i),sign:3+3*(i*i),order:4+4*(i*i) },
                {time: 20180322,browse:3*(i+1),visit:13,stayTime:3 ,login:2+3*(i*i),sign:3+4*(i*i),order:4+5*(i*i) },
                {time: 20180322,browse:4*(i+1),visit:14,stayTime:4 ,login:2+4*(i*i),sign:3+5*(i*i),order:4+6*(i*i) },
                {time: 20180322,browse:5*(i+1),visit:15,stayTime:5 ,login:2+5*(i*i),sign:3+6*(i*i),order:4+7*(i*i) },
                {time: 20180322,browse:6*(i+1),visit:16,stayTime:6 ,login:2+6*(i*i),sign:3+7*(i*i),order:4+8*(i*i) },
                {time: 20180322,browse:7*(i+1),visit:17,stayTime:7 ,login:2+7*(i*i),sign:3+8*(i*i),order:4+9*(i*i) },
                {time: 20180322,browse:8*(i+1),visit:22,stayTime:8 ,login:2+8*(i*i),sign:3+9*(i*i),order:4+10*(i*i) },
                {time: 20180322,browse:9*(i+1),visit:33,stayTime:9 ,login:2+9*(i*i),sign:3+10*(i*i),order:4+11*(i*i) },
                {time: 20180322,browse:10*(i+1),visit:44,stayTime:10 ,login:2+10*(i*i),sign:3+11*(i*i),order:4+12*(i*i) },
                {time: 20180322,browse:11*(i+1),visit:55,stayTime:11 ,login:2+11*(i*i),sign:3+12*(i*i),order:4+13*(i*i) },
            ]
        }
    )
}

export default ajaxData;