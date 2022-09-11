import React from "react";

interface HeaderProps {
    addUser: Function;
}
 
interface HeaderState {
    full_name:string;
    email:string;
}
 
class Header extends React.Component<HeaderProps, HeaderState> {
    
    constructor(props:HeaderProps){
        super(props);
        this.state = {
            full_name: '',
            email: '',
        }
    }

    handleInputChange = (event:React.ChangeEvent<HTMLInputElement>, fieldName:string)=>{
        this.setState({
            ...this.state, //calls for the previous state
            [fieldName]: event.target.value //knows how to find the field name of the previous state because we called it above, then saves its value
        })
    }

    addUser = () => {
        this.props.addUser({
            full_name: this.state.full_name,
            email: this.state.email,
            status: 'Active'
        })

        this.setState(() => ({
            full_name: '',
            email: ''
        }))
    }


    render() { 
        return ( 
            <div className="d-flex align-items-center p-3 my-4 bg-light" >
                <h5 className="me-auto mb-0">Users</h5>
                <div className="d-flex">
                    <input value={this.state.full_name}
                        onChange={(e) => this.handleInputChange(e, 'full_name')}
                        type="text" placeholder="Full Name" className="form-control" />

                    <input value={this.state.email}
                        onChange={(e) => this.handleInputChange(e, 'email')}
                        type="text" placeholder="Email" className="form-control mx-3" />

                    <button onClick={this.addUser} className="btn btn-info text-white">Add</button>
                    
                </div>
            </div>

         );
    }
}
 
export default Header;