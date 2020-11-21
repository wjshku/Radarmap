var IBLorangetrans = "rgba(249,129,27,0.5)"

function Radartitle(title, x) {
  let distance = (20 + 30 * x).toString() + "%";
  this.text = title;
  this.left = distance;
  this.top = '10%';
  this.textAlign = 'center';
}

function Radarradar(x) {
  var centerx = (30 * x + 20).toString() + "%";
  this.center = [centerx, "50%"];
  this.radius = "50%";
  this.name = {
    textStyle: {
      color: 'rgb(100,100,100)',
    }
  };
  this.nameGap = 5;
  this.axisLine = {
    lineStyle: {
      color: 'rgba(100, 100, 100, 0.15)'
    }
  };
  this.splitLine = {
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.1)'
    }
  };

  this.indicator = [
    { name: 'Teamwork', max: 5 },
    { name: 'Knowledge', max: 5 },
    { name: 'Problem solving', max: 5 },
    { name: 'Creativity', max: 5 },
    { name: 'Quality', max: 5 },
    { name: 'Presentation', max: 5 }
  ]

}

function Radarseries(value, title, x) {
  this.type = 'radar';
  this.radarIndex = x;
  this.name = title
  // areaStyle: {normal: {}},
  this.data = [
    {
      value: value,//We may need to change this data
      name: '',
      areaStyle: {
        color: IBLorangetrans
      },
      lineStyle: {
        color: "rgba(242, 226, 226, 1)"
      },
      itemStyle: {
        color: IBLorangetrans,
        opacity: 0
      }
    },
  ]
}

function Radaroption(value, place) {
  this.title = [];
  this.tooltip = {
    show: true,
    trigger: 'item',
  };
  this.legend = {          //legend is the filter
    data: [],
  };
  this.grid = { // 控制图的大小，调整下面这些值就可以，
    x: 40,
    x2: 100,
    y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
  };
  this.radar = []
  this.series = []
  for (let i = 0; i < place.length; i++) {
    this.legend.data.push(place)
    this.radar.push(new Radarradar(i))
    this.series.push(new Radarseries(value[i], place[i], i))
    this.title.push(new Radartitle(place[i], i))
  }
}


export default Radaroption