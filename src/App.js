import React from "react";
import DataGrid, {
  Column,
  Editing,
  Scrolling
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react";
import { Switch } from "devextreme-react/switch";

import axios from "axios";
import styled from "styled-components";
import { SelectBox } from "devextreme-react";
import uuid from "uuid";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";

const SwitchCaption = styled.span`
  font-size: 14px;
  color: blueviolet;
`;

const profileUsersStore = new ArrayStore({
  key: "rowId",
  data: []
});

const ds = new DataSource({
  store: profileUsersStore,
  reshapeOnPush: true
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: [],
      users: [],
      currentProfile: {},
      currentProfileUsers: [],
      currentProfileChannels: [],
      currentProfileRegions: [],
      currentEvent1: false,
      currentEvent2: false,
      currentEvent3: false,
      currentEvent4: false,
      currentEvent5: false,
      currentEvent6: false,
      currentEvent7: false,
      userId: null
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  componentDidMount() {
    const url = `https://line-subscription-config-api.azurewebsites.net/api/v1/Configurations?uid=${"D347B13B-583F-4877-84EA-9425F90E43DF"}`;

    axios.get(url).then(res => {
      this.setState({
        profiles: res.data.profiles,
        users: res.data.users
      });
    });
  }
  render() {
    const { profiles } = this.state;

    return (
      <React.Fragment>
        <div className={"container-fluid"}>
          <div className="row mt-2 mb-2">
            <div className="col">
              <Button
                width={120}
                text={"Peek Data"}
                type={"success"}
                onClick={this.onClick}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              โปรไฟล์
              <div className="row">
                <div className="col">
                  <DataGrid
                    dataSource={profiles}
                    selection={{ mode: "single" }}
                    showBorders={true}
                    hoverStateEnabled={true}
                    keyExpr={"rowId"}
                    onSelectionChanged={this.onSelectionChanged}
                    height={860}
                  >
                    <Scrolling showScrollbar={"alwarys"} />
                    <Column dataField={"name"} />
                    <Column dataField={"description"} />
                    <Column
                      dataField={"timeStamp"}
                      dataType={"date"}
                      visible={false}
                    />
                    <Column
                      dataField={"updateTime"}
                      dataType={"date"}
                      visible={false}
                    />
                    <Column dataField={"lineAccessToken"} visible={false} />
                  </DataGrid>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col">
                  ประเภทคิว
                  <DataGrid
                    dataSource={this.state.currentProfileChannels}
                    selection={{ mode: "single" }}
                    showBorders={true}
                    hoverStateEnabled={true}
                    keyExpr={"rowId"}
                    height={320}
                  >
                    <Scrolling showScrollbar={"always"} />
                    <Editing mode={"cell"} allowUpdating={true} />
                    <Column
                      dataField={"selected"}
                      dataType={"boolean"}
                      allowEditing={true}
                    />
                    <Column dataField={"name"} allowEditing={false} />
                  </DataGrid>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  ภาค
                  <DataGrid
                    dataSource={this.state.currentProfileRegions}
                    selection={{ mode: "single" }}
                    showBorders={true}
                    hoverStateEnabled={true}
                    keyExpr={"rowId"}
                    height={515}
                  >
                    <Scrolling showScrollbar={"always"} />
                    <Editing mode={"cell"} allowUpdating={true} />
                    <Column
                      dataField={"selected"}
                      dataType={"boolean"}
                      allowEditing={true}
                    />
                    <Column dataField={"name"} allowEditing={false} />
                  </DataGrid>
                </div>
              </div>
            </div>
            <div className="col-4">
              ผู้จอง
              <div className="row mb-2">
                <div className="col-10">
                  <SelectBox
                    dataSource={this.state.users}
                    displayExpr={"loginName"}
                    valueExpr={"id"}
                    value={this.state.userId}
                    onValueChanged={e => {
                      this.setState({ userId: e.value });
                    }}
                  />
                </div>
                <div className="col-2 text-right w-100">
                  <Button text="Add" type="danger" onClick={this.onAddUser} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <DataGrid
                    dataSource={ds}
                    selection={{ mode: "single" }}
                    showBorders={true}
                    hoverStateEnabled={true}
                    repaintChangesOnly={true}
                    keyExpr={"rowId"}
                    height={275}
                  >
                    <Scrolling showScrollbar={"always"} />
                    <Editing
                      mode={"cell"}
                      useIcons={true}
                      allowUpdating={true}
                      allowDeleting={true}
                    />
                    <Column type={"buttons"} width={110} buttons={["delete"]} />
                    <Column dataField={"loginName"} allowEditing={false} />
                  </DataGrid>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-3">
                  <SwitchCaption>จองคิวสำเร็จ</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent1}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent1: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 1
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
                <div className="col-3">
                  <SwitchCaption>ลงทะเบียนคิว</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent2}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent2: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 2
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <SwitchCaption>เรียกคิว</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent3}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent3: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 3
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
                <div className="col-3">
                  <SwitchCaption>คิวลำดับถัดไป</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent4}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent4: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 4
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <SwitchCaption>สิ้นสุดคิว</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent5}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent5: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 5
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
                <div className="col-3">
                  <SwitchCaption>ยกเลิกคิว Auto</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent6}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent6: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 6
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <SwitchCaption>ยกเลิกคิว Manual</SwitchCaption>{" "}
                </div>
                <div className="col-3">
                  <Switch
                    value={this.state.currentEvent7}
                    onValueChanged={e => {
                      this.setState({
                        currentEvent7: e.value
                      });
                      let result = this.state.currentProfile.queueEvents.find(
                        f => f.queueEventId === 7
                      );
                      result.selected = e.value;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  onClick = () => {
    console.log(this.state.profiles);
  };

  onAddUser = () => {
    if (!this.state.userId) return;

    const user = this.state.users.find(u => u.id === this.state.userId);

    const newUser = {
      rowId: uuid.v4(),
      id: -1,
      userId: this.state.userId,
      loginName: user.loginName
    };
    console.log(newUser);
    profileUsersStore.push([
      {
        type: "insert",
        data: {
          ...newUser
        }
      }
    ]);

    this.state.currentProfileUsers.push(newUser);
  };

  onSelectionChanged({ selectedRowsData }) {
    const currentProfile = selectedRowsData[0];
    const tmpObj = {};
    currentProfile.queueEvents.forEach(qev => {
      tmpObj["currentEvent" + qev.queueEventId] = qev.selected;
    });

    ds._items.forEach(item => {
      profileUsersStore.push([
        {
          type: "remove",
          key: item.rowId
        }
      ]);
    });

    currentProfile.users.forEach(user => {
      profileUsersStore.push([
        {
          type: "insert",
          data: {
            ...user
          }
        }
      ]);
    });

    this.setState({
      currentProfile: currentProfile,
      currentProfileUsers: currentProfile.users,
      currentProfileChannels: currentProfile.channels,
      currentProfileRegions: currentProfile.regions,
      ...tmpObj
    });
  }
}

export default App;
