axiosFunc = async() => {    //this function update the data
  const axios = require('axios');
  const access_token = "C6nnn3gxFoNkVArNGDKVs5CvHF4Nz3Qg9RMuQZRnHwdG"
  const form_id = "hq372Yk9"
  try {
  var response = await axios({
    method: 'get',
    url: 'https://api.typeform.com/forms/'+form_id+'/responses',
    headers: {
      'Authorization': 'Bearer '+access_token,
    }
  })
  console.log(response.data.total_items)
 }catch(e){
    console.error(e.data)
  }
}

  function dataclear(data){
    let realdata = data.items
    let i = 0
    let cleardata = []
    let existing = {}
    cleardata.push(new city(realdata[0].answers))
    console.log(realdata[i].answers)
    existing[realdata[i].answers[0].choice.label] = {}
    existing[realdata[i].answers[0].choice.label][realdata[0].answers[1].choice.label]=0
    for(i = 1; i<data.total_items; i++){
      console.log(0)
      if(realdata[i].answers[0].choice.label in existing){
        console.log(0)
        if(realdata[i].answers[1].choice.label in existing[realdata[i].answers[0].choice.label]){
          console.log(0)
          cleardata.forEach((city)=>{
            if(city.cityname==realdata[i].answers[0].choice.label){
              city.avenues.forEach((avenue)=>{
                if(avenue.avenuename==realdata[i].answers[1].choice.label){
                  let k = 0
                  for(let team of avenue.teams){
                    if(team.teamnum==realdata[i].answers[2].choice.label){
                      k++
                      team.challenges.push(new challenge(realdata[i].answers))
                    }
                  }
                  if(k>0){
                    avenue.teams.push(new team(realdata[i].answers))
                  }
                }
              })
            }
          })
        }
      }else{
        console.log(realdata[i].answers)
        cleardata.push(new city(realdata[i].answers))
        console.log(0)
        existing[realdata[i].answers[0].choice.label] = {}
        existing[realdata[i].answers[0].choice.label][realdata[0].answers[1].choice.label]=0
        console.log(cleardata)
      }
    }
    return(cleardata)
    }
  
  
  function city(data){
    this.cityname = data[0].choice.label
    this.avenues = []
    this.avenues.push(new avenue(data))
    
  }
  
  function avenue(data){
    this.avenuename = data[1].choice.label
    this.teams = []
      this.teams.push(new team(data))
    
  }
  
  function team(data){
    this.teamnum = data[2].choice.label
    this.challenges = []
      this.challenges.push(new challenge(data))
    
  }
  
  function challenge(data){
    this.chanllengename = data[3].choice.label
    this.score = data[4].choice.label
  }
axiosFunc()
//console.log(data)


/*var IBLorangetrans = "rgba(249,129,27,0.5)"

function Radarradar(x){
  var centerx  = (10*x).toString()+"%";
  this.radar = {
      center:[centerx,"50%"],
      radius: "50%",
      name: {
        textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
        }
      },
      axisLine: {   
        lineStyle: {
            color: 'rgba(100, 100, 100, 0.15)'
        }
    },
    splitLine: {
        lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)'
        }
    },
     
      indicator: [
          { name: 'Dimension1', max: 3},
          { name: 'Dimension2', max: 3},
          { name: 'Dimension3', max: 3},
          { name: 'Dimension4', max: 3},
          { name: 'Dimension5', max: 3},
      ]
    }
    
}

function Radarseries(x){
  this.type='radar';
  this.radarIndex= x;
  // areaStyle: {normal: {}},
  this.data=[
      {
          value: [3,3,3,3,3],
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

function Radaroption(x){
  this.title={
    text:""
  };
  this.tooltip={show:true};
  this.legend={          //legend is the filter
    data: [],
  };
  this.radar = []
  this.series = []
  for(let i = 0;i < x;i++){
    this.legend.data.push("Team"+i.toString())
    this.radar.push(new Radarradar(i))
    this.series.push(new Radarseries(i))
  }
  
}

var x = new Radaroption(3)

console.log(x.radar)


{    //this is sample data wrote by oneself
                name:"Avenue1",
                teams:[{
                  team_num: 1,
                  value: [{
                    challenge: "quantum music",
                    criteria: "criteria",
                    score: 2,
                    fellow: "Tony",
                    totalscore: 10,
                  },{
                    challenge: "health",
                    criteria: "criteria",
                    score: 1,
                    fellow: "Tako",
                    totalscore: 10,
                  },
                  {
                    challenge: "quantum music",
                    criteria: "criteria",
                    score: 1,
                    fellow: "Tony",
                    totalscore: 10,
                  },
                  {
                    challenge: "quantum music",
                    criteria: "criteria",
                    score: 1,
                    fellow: "Tony",
                    totalscore: 10,
                  },
                  {
                    challenge: "quantum music",
                    criteria: "criteria",
                    score: 1,
                    fellow: "Tony",
                    totalscore: 10,
                  }]
                }],
              }*/