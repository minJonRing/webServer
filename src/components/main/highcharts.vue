<template>
  <div class="highcharts">
      <div class="highcharts-box" @click="hideChart">
          <div class="highcharts-main-father" @click.stop>
            <div class="highcharts-main" id="highcharts-main"></div>
          </div>
      </div>
  </div>
</template>
<script>
    export default {
        name:"highcharts",
        props:{
            drawdata:Object
        },
        data(){
            return {
                a:1
            }
        },
        watch:{
        },
        mounted(){
            var options,data=this.drawdata;  
            let type = data.type == 1?'pie':data.type == 2?'column':'line';
            options = {
                    chart: {
                        type: type                          //指定图表的类型，默认是折线图（line）
                    },
                    title: {
                        text:  data.titleY,                 // 标题
                        
                    },
                    xAxis: {
                        categories: data.series.dataX   // x 轴分类
                        // categories: pieX   // x 轴分类
                    },
                    yAxis: {
                        title: {
                            text: data.titleY                // y 轴标题
                        }
                    },
                    series: data.series.dataY,
                    // series:[{data:pieArr}],
                    plotOptions:{
                        pie:{
                            allowPointSelect:true,
                            cursor:"pointer",
                            dataLabels:{
                                enabled:true,
                                // format:"<b>{point.y}</b>:{point.percentage:.1f}%",
                                formatter:function(){
                                    console.log(this)
                                    return data.series.dataX[this.point.index]+":"+this.percentage.toFixed(2)+"%"
                                },
                                style:{
                                    color:'black'
                                },
                            },
                            states:{
                                hover:{
                                    enabled:false
                                }
                            },
                            splicedOffset:20,
                            point:{
                                events:{
                                    mouseOver:function(){
                                        this.slice()
                                    },
                                    mouseOut:function(){
                                        this.slice()
                                    },
                                    click:function(){
                                        return false;
                                    }
                                }
                            },
                        }
                    },
                    legend:{
                        labelFormat: '<span style="{color}">22</span>'
                    },
                    credits:{
                        text : "wildog"
                    }
            }
            console.log(options)
            var chart = this.$highcharts.chart('highcharts-main', options);
        },
        
        methods:{
            hideChart(){
                this.$emit('getIsShowChart')
            }
        }
    }
</script>

<style scoped>
.highcharts-box {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 99;
    /* opacity: 0; */
    transition-duration: 600ms;
    /* transform: matrix(0,0,0,0,0,0); */
}
.highcharts-main-father {
    box-shadow: 0 0 5px rgba(0,0,0,1);
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
}
.highcharts-main {
    width: 900px;
    height: 500px;
    overflow: hidden;
}

</style>

