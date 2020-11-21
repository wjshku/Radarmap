import * as React from "react";
//import axios from "axios"; //this is API
import Radaroption from "./Option"
import ReactEcharts from 'echarts-for-react';

class Radarmap1 extends React.Component {

  state = {
    data: [],
    score:[],
    rank: [],
    locations: ["Center 1"],
    challenges: [],
    IBLorangetrans: "rgba(249,129,27,0.5)"
  }

  axiosFunc = async () => {    //this function update the data
    const axios = require('axios');
    const access_token = "C6nnn3gxFoNkVArNGDKVs5CvHF4Nz3Qg9RMuQZRnHwdG"
    const form_id = "hq372Yk9"
    try {

      var response = await axios({
        method: 'get',
        url: 'https://api.typeform.com/forms/' + form_id + '/responses',
        headers: {
          'Authorization': 'Bearer ' + access_token,
        }
      })
      let data = [[],[],[]]
      let num_dim = 10
      for(let i = 0;i<response.data.total_items;i++){
        let day = Number(response.data.items[i].answers[2].choice.label[4])
        data[day-1].push([])
        for(let j = 0;j< num_dim;j++){
          data[day-1][data[day-1].length-1].push(response.data.items[i].answers[j].choice.label)
        }
      }
      console.log(data)
      console.log(this.Datasorting(data,"Hong Kong"))
      this.setState({
        data: data
      })
    } catch (e) {
      console.error(e.data)
    }
  }

  componentDidMount() {
    this.axiosFunc()
  }

  /*Showradar=(data,radaroption)=>{
    let radarop = radaroption
    let d = data;
    let i = 0 //for the first loop of avenues //for the second loop of teams
    let k = 0 //for the third loop of challenges
    let teamnums = d.teams.length
    let j
    radarop.title= {
      text: d["name"]
  }
    for(j = 0;j < teamnums; j += 1){
      radarop.legend.data.push("Team"+(j+1).toString());
      radarop.series[0].data[0].name = "Team"+(j+1).toString()
      for(k = 0; k < d.teams[i].value.length;k += 1){
        radarop.series[j].data[0].value.push(d.teams[j].value[k].score)
      //console.log(teamnums,j,radarop.series[0].data[j].name,radarop.series[0].data[j].value)
      };
    }
    console.log(radarop.series[0].data[0])
    return(radarop)
  }*/

  Datasorting = (data,place) => {
    let temp = [[],[],[]]
    let score = {}
    let challengenum = 6
    for(let i =0;i<3;i++){
    temp[i]=data[i].filter((team)=>{
      return team[0] == place
    })
    for(let k = 0;k<temp[i].length;k++){
      if(i===0){score[temp[i][k][1]]=0}
      for(let j = 0;j<challengenum;j++){
        score[temp[i][k][1]] = score[temp[i][k][1]] + Number(temp[i][k][j+4])
      }
    }
    console.log(temp)
    for(let i =0;i<3;i++){
    temp[i].sort((a,b)=>{
      return score[a[1]] < score[b[1]]
    })
    }
    }
    console.log(score)
    return(temp)
  }

  render() {
    let data = this.state.data
    var show1 = []
    var times = 0
    /*if (data) {
      let value1 = []
      var place1 = []
      for (let challenges of data) {
        if (challenges.answers[0].choice.label == "Hong Kong") {
          value1.push([])
          for (let i = 4; i < 10; i++) {
            value1[value1.length - 1].push(Number(challenges.answers[i].choice.label))
          }
          place1.push(challenges.answers[1].choice.label + " " + challenges.answers[2].choice.label)
          
          show1 = <ReactEcharts option={new Radaroption(value1, place1)} />
        } 
      }
    } else {
      show1 = "Loading"
    };*/
    return (
      <div>
        {
        
      }
      </div>
    );
  }
}
export default Radarmap1;