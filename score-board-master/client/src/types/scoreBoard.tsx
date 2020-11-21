import { WithStyles, createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core";

export const styles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    tableRoot: {
      width: "100%",
      marginTop: spacing(1),
      overflowX: "auto",
      minHeight: "99%"
    },
    paddingReducer: {
      "& thead": {
        "& tr": {
          background: "#ffb74d",
          "& th": {
            fontSize: "1.8em",
            [breakpoints.down("sm")]: {
              padding: "8px"
            }
          }
        }
      },
      "& tbody": {
        "& tr": {
          "&:nth-of-type(even)": {
            background: "#ffe0b2"
          },
          "& th": {
            fontSize: "1.7em",
            [breakpoints.down("sm")]: {
              padding: "8px"
            }
          },
          "& td": {
            fontSize: "1.7em",
            [breakpoints.down("sm")]: {
              padding: "8px"
            }
          }
        }
      }
    },
    header: {
      fontWeight: 600
    }
  });

export interface ChartProps extends WithStyles<typeof styles> {
  refreshInterval?: number;
}
export interface ChartState {
  data: Avenue[];
  locations: string[];
  challenges: string[];
}
export interface Avenue {
  name: string;
  teams: Team[];
}
export interface Team {
  team_num: number;
  value: ChallengeScore[];
}
export interface ChallengeScore {
  challenge: string;
  criteria: string;
  score: number;
  fellow: string;
  totalscore: number;
}
