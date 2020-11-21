import * as React from "react";
import {
  ChartProps,
  ChartState,
  Avenue,
  Team,
  ChallengeScore,
  styles
} from "../types/scoreBoard";
import axios from "axios";
import "../styles/scoreBoard.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";

class ScoreBoard extends React.Component<ChartProps, ChartState> {
  interval: any;
  constructor(prop: ChartProps) {
    super(prop);
    this.state = {
      data: [],
      locations: [],
      challenges: []
    };
  }

  axiosFunc = () => {
    axios.get("/api").then(res => {
      const data = res.data.data.data;
      const locations = res.data.data.locations;
      const challenges = res.data.data.challenges;
      data.forEach((location: Avenue) => {
        location.teams.sort(this.compare);
      });
      console.log(data);
      this.setState({
        data,
        locations,
        challenges
      });
    });
  };

  compare = (a: Team, b: Team) => {
    if (this.getScore(b) > this.getScore(a)) {
      return 1;
    }
    if (this.getScore(b) < this.getScore(a)) {
      return -1;
    }
    return 0;
  };

  getScore = (obj: Team): number => {
    let score = 0;
    obj.value.forEach((challenge: ChallengeScore) => {
      score += challenge.score;
    });
    return score;
  };

  componentDidMount() {
    this.axiosFunc();
    this.interval = setInterval(
      this.axiosFunc,
      this.props.refreshInterval || 5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  splitArr = (a: Avenue[], n: number) => {
    var index = 0;
    var arrayLength = a.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += n) {
      const myChunk = a.slice(index, index + n);
      tempArray.push(myChunk);
    }
    return tempArray;
  };

  //A1	=genome	;		A2	=quantum;		A3=health;		A4	=	city
  showHeader = ({ name }: Avenue) => {
    let obj;
    if (name === this.state.locations[0]) {
      obj = (
        <TableRow>
          <TableCell>Team #</TableCell>
          <TableCell align="center">genome</TableCell>
          <TableCell align="center">quantum</TableCell>
          <TableCell align="center">health</TableCell>
          <TableCell align="center">city</TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[1]) {
      obj = (
        <TableRow>
          <TableCell>Team #</TableCell>
          <TableCell align="center">quantum</TableCell>
          <TableCell align="center">health</TableCell>
          <TableCell align="center">city</TableCell>
          <TableCell align="center">genome</TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[2]) {
      obj = (
        <TableRow>
          <TableCell>Team #</TableCell>
          <TableCell align="center">health</TableCell>
          <TableCell align="center">city</TableCell>
          <TableCell align="center">genome</TableCell>
          <TableCell align="center">quantum</TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[3]) {
      obj = (
        <TableRow>
          <TableCell>Team #</TableCell>
          <TableCell align="center">city</TableCell>
          <TableCell align="center">genome</TableCell>
          <TableCell align="center">quantum</TableCell>
          <TableCell align="center">health</TableCell>
        </TableRow>
      );
    }
    return obj;
  };

  showRow = ({ name }: Avenue, team: Team) => {
    let row;
    if (name === this.state.locations[0]) {
      row = (
        <TableRow key={team.team_num}>
          <TableCell component="th" scope="row">
            {team.team_num}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[0]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[1]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[2]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[3]
              )
            )}
          </TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[1]) {
      row = (
        <TableRow key={team.team_num}>
          <TableCell component="th" scope="row">
            {team.team_num}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[1]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[2]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[3]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[0]
              )
            )}
          </TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[2]) {
      row = (
        <TableRow key={team.team_num}>
          <TableCell component="th" scope="row">
            {team.team_num}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[2]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[3]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[0]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[1]
              )
            )}
          </TableCell>
        </TableRow>
      );
    } else if (name === this.state.locations[3]) {
      row = (
        <TableRow key={team.team_num}>
          <TableCell component="th" scope="row">
            {team.team_num}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[3]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[0]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[1]
              )
            )}
          </TableCell>
          <TableCell align="center">
            {this.showScore(
              team.value.find(
                val =>
                  typeof val != "undefined" &&
                  val.challenge === this.state.challenges[2]
              )
            )}
          </TableCell>
        </TableRow>
      );
    }
    return row;
  };

  showScore = (obj: ChallengeScore | undefined) => {
    let returnObj;
    if (typeof obj != "undefined") {
      returnObj = obj.score;
    } else {
      returnObj = "-";
    }
    return returnObj;
  };

  render() {
    const data = this.state.data;
    if (data.length > 0) {
      let newArr = this.splitArr(data, 2).map(teams => {
        return (
          <Grid item container spacing={2} xs={12} justify="space-around">
            {teams.map(challenge => {
              return (
                <Grid item xs={12} md={6}>
                  <Card className={this.props.classes.tableRoot}>
                    <Paper>
                      <Typography align="center" variant="h3">
                        {challenge.name}
                      </Typography>
                      <Table
                        size="small"
                        className={this.props.classes.paddingReducer}
                      >
                        <TableHead>{this.showHeader(challenge)}</TableHead>
                        <TableBody>
                          {challenge.teams.map(team => {
                            return this.showRow(challenge, team);
                          })}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        );
      });
      return (
        <Box maxWidth={90 / 100} mx="auto" alignContent="center">
          <Typography
            align="center"
            variant="h1"
            gutterBottom
            className={this.props.classes.header}
          >
            Rubric Scoreboard
          </Typography>
          <Grid container spacing={1}>
            {newArr}
          </Grid>
        </Box>
      );
    } else {
      return <h3>Loading...</h3>;
    }
  }
}

export default withStyles(styles)(ScoreBoard);
