const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
const express = require("express");
const cors = require("cors");
const typeform = require("@typeform/api-client");
const typeformAPI = typeform.createClient({
  token: process.env.TYPEFORM_TOKEN
});

const app = express();
app.use(cors());

app.get("/api", (_, res) => {
  let res1 = getRespose(process.env.FORM_ID1);
  let res2 = getRespose(process.env.FORM_ID2);
  let res3 = getRespose(process.env.FORM_ID3);
  let res4 = getRespose(process.env.FORM_ID4);
  Promise.all([res1, res2, res3, res4])
    .then(data => {
      res.json({ success: true, data: scoring(data) });
    })
    .catch(e => {
      console.log(e);
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

const scoring = data => {
  let return_data = [];
  //Create an array with four locations having different teams
  [
    process.env.LOCATION1,
    process.env.LOCATION2,
    process.env.LOCATION3,
    process.env.LOCATION4
  ].forEach(val => return_data.push({ name: val, teams: [] }));
  for (let form of data) {
    //If the answers property does not exit then go to the next response
    for (let individual of form) {
      if (!individual.hasOwnProperty("answers")) {
        continue;
      }
      //Get the location from each response
      let name = individual.answers[0].choice.label;
      return_data.forEach(val => {
        //If the location exists create an object for the team
        if (val.name === name) {
          let team = {
            team_num: undefined,
            value: []
          };
          //Create challenge object
          let challenge_val = {
            challenge: individual.form_ref,
            criterium: individual.criterium,
            score: 0,
            fellow: individual.hidden.fellow,
            totalscore: individual.hidden.totalscore
          };
          for (let question of individual.answers) {
            //Skip over unwanted answers
            if (
              question.field.ref === process.env.COMMENTS_REF ||
              question.field.ref === process.env.SUGGESTIONS_REF ||
              question.field.ref === process.env.LOCATION_REF
            ) {
              continue;
            }
            //Get team number
            else if (question.field.ref === process.env.TEAM_NUM_REF) {
              team.team_num = question.number;
            }
            //Get bonus score
            else if (question.field.ref === process.env.FORM4_BONUS_REF) {
              challenge_val.score += parseInt(question.choice.label);
            }
            //Calculate total score
            else {
              challenge_val.score += question.number;
            }
          }
          //Normalise score
          challenge_val.score =
            (challenge_val.score / challenge_val.totalscore) * 100;

          //Convert to two decimal place avoiding some issues
          challenge_val.score =
            Math.round((challenge_val.score + 0.00001) * 100) / 100;

          //If team already exists in the Location
          if (val.teams.some(d => d.team_num === team.team_num)) {
            val.teams.forEach(d => {
              //Find the team with the same team number
              if (d.team_num === team.team_num) {
                //If the score already exists do not update it (to not allow for duplicates)
                if (
                  !d.value.some(d2 => d2.challenge === challenge_val.challenge)
                ) {
                  d.value.push(challenge_val);
                }
              }
            });
          }
          //If team does not already exist
          else {
            team.value.push(challenge_val);
            val.teams.push(team);
          }
        }
      });
    }
  }

  return {
    data: return_data,
    locations: [
      process.env.LOCATION1,
      process.env.LOCATION2,
      process.env.LOCATION3,
      process.env.LOCATION4
    ],
    challenges: [
      process.env.CHALLENGE1,
      process.env.CHALLENGE2,
      process.env.CHALLENGE3,
      process.env.CHALLENGE4
    ]
  };
};

app.get("/dump", (_, res) => {
  let res1 = getRespose(process.env.FORM_ID1);
  let res2 = getRespose(process.env.FORM_ID2);
  let res3 = getRespose(process.env.FORM_ID3);
  let res4 = getRespose(process.env.FORM_ID4);
  Promise.all([res1, res2, res3, res4])
    .then(data => {
      res.json({ success: true, data: data });
    })
    .catch(e => {
      console.log(e);
    });
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is running on Port: ${process.env.PORT || 5000}`);
});

const getRespose = id => {
  return typeformAPI.responses
    .list({
      uid: id,
      pageSize: 1000
    })
    .then(data => {
      data.items.forEach(data => {
        if (process.env.FORM_ID1 === id) {
          data.form_ref = process.env.CHALLENGE1;
        } else if (process.env.FORM_ID2 === id) {
          data.form_ref = process.env.CHALLENGE2;
        } else if (process.env.FORM_ID3 === id) {
          data.form_ref = process.env.CHALLENGE3;
        } else if (process.env.FORM_ID4 === id) {
          data.form_ref = process.env.CHALLENGE4;
        }
      });
      return data.items;
    })
    .catch(e => {
      console.log(e);
    });
};
