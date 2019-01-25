import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { getChannel, exitChannel } from '../utils/sendbirdHelpers';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      showAlert: false
    };
  }

  handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /*toggleAlert = () => {
    this.setState({
      showAlert: !this.state.showAlert
    });
  };*/

  handleLogout = async () => {
    const { sb, match } = this.props;
    if (match) {
      const channelURL = match.params.channelURL;
      let channel = await getChannel(sb, channelURL);
      await exitChannel(channel);
    }
    sb.disconnect();
  };



  render() {
    const { anchorEl, showAlert } = this.state;
    return (
      <React.Fragment>
        <IconButton color="inherit">
          <MenuIcon onClick={this.handleOpen} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogout} component={Link} to={"/login"}>
              Logout
            </MenuItem>
          </Menu>
        </IconButton>
        {/*<AlertDialog
          title={"No channel selected."}
          message={"You need to select a channel before you can chat."}
          showAlert={showAlert}
          toggleAlert={this.toggleAlert}
        />*/}
      </React.Fragment>
    );
  }
}

export default NavMenu;
