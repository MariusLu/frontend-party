import React from "react";
import { connect } from "react-redux";
import * as serverActions from "../../redux/actions/serverActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Input, Col, Row, Container } from 'reactstrap';
import WithLoading from "../common/WithLoading";
import logo from "../assets/logo-testio.png";


const WithContainerLoading = WithLoading(Container);

class ServerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLoading: true,
        };
    }

    componentDidMount() {
        const { servers, actions } = this.props;

        if (servers.length === 0) {
            actions.loadServers().catch(error => {
                alert("Loading servers failed" + error);
            })
        }
        debugger;
        this.setState({
            formLoading: false,
        })
    }
    columns = [{
        dataField: 'name',
        text: 'SERVER',
        sort: true
    }, {
        dataField: 'distance',
        text: 'DISTANCE',
        sort: true
    }];

    handleLogout = () => {
        localStorage.setItem("token", "");
        window.location = "/";
    }

    render() {
        return (
            <WithContainerLoading fluid isLoading={this.state.formLoading}>
                <Row>
                    <Col><img src={logo} alt="Logo" className="ServersLogo"></img></Col>
                    <Col></Col>
                    <Col className="float-right" sm="3" md="3">
                        <Input className="Logout float-right" type="button" value="&#xf08b; Logout" onClick={this.handleLogout}></Input>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                        <BootstrapTable keyField='id' data={this.props.servers} columns={this.columns} />
                    </Col>
                </Row>

            </WithContainerLoading>

        );
    }
}

ServerPage.propTypes = {
    servers: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    return {
        servers: state.servers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadServers: bindActionCreators(serverActions.loadServers, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerPage);