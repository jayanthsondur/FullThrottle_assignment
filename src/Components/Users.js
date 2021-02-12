import React, { Component } from "react";
import usersData from "../Data/usersData.json";
import "./css/User.css";
import { Avatar, CardHeader, Divider } from "@material-ui/core/";

class User extends Component {
  constructor() {
    super();
    this.state = {
      filterData: [],
    };
  }
  handleChange = (e) => {
    console.log(e);
    let myData = usersData[0].members.filter((data) => data.id == e);
    this.setState({ filterData: myData[0] });
  };
  render() {
    return (
      <div>
        {usersData[0].members.map((e) => (
          <div className="user_align">
            <div>
              <CardHeader
                avatar={
                  <Avatar variant="square" title={e.real_name}>
                    {e.real_name
                      .split(" ")
                      .map((x) => x.charAt(0))
                      .join("")
                      .substr(0, 2)
                      .toUpperCase()}
                  </Avatar>
                }
                title={e.real_name}
                subheader={e.tz}
              />
              <h4>{e.real_name}</h4>
            </div>

            <button
              type="button"
              class="btn btn-primary"
              data-placement="right"
              title={e.real_name}
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => this.handleChange(e.id)}
            >
              User Details
            </button>
          </div>
        ))}

        {/* model */}

        {this.state.filterData ? (
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <Avatar
                    variant="square"
                    className="bg-primary"
                    data-placement="right"
                    title={this.state.filterData.real_name}
                  ></Avatar>
                  <h5
                    class="modal-title ml-2 font-weight-bold"
                    id="exampleModalLabel"
                  >
                    {this.state.filterData.real_name}
                  </h5>
                  <small className="m-2 font-italic text-muted">
                    {this.state.filterData.tz}
                  </small>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    data-placement="right"
                    title="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {this.state.filterData.activity_periods
                    ? this.state.filterData.activity_periods.map((e) => {
                        return (
                          <div>
                            <p>
                              Start time / End time : {e.start_time} /{" "}
                              {e.end_time}
                            </p>
                            <Divider />
                          </div>
                        );
                      })
                    : null}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    data-placement="right"
                    title="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default User;
