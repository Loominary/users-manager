import React from "react";
import Header from "../Header/header";
import Message from "../Message";
import Table from "../Table/Table";

export type StatusType = 'Active' | 'Expired' | 'Banned';
export interface IUser {
    user_id: number;
    full_name: string;
    email: string;
    status: StatusType;
}


interface UsersState {
    users: Array<IUser>;
    usersDisplay: Array<IUser>;
    addSuccess: boolean;
    deleteSuccess: boolean;
}

class Users extends React.Component<{}, UsersState> {
    constructor(props: {}) {

        super(props);

        this.state = {
            users: [],
            usersDisplay: [],
            addSuccess: false,
            deleteSuccess: false,
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
            .then(res => res.json()) //it receives a string result, therefore we must JSONify it
            .then(json => {
                this.setState(() => ({
                    users: json,
                    /* usersDisplay: json */
                }))
            })
    }

    addUser = (user: IUser) => {
        fetch('http://localhost:3000/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(json => {
                this.setState(() => ({
                    users: [...this.state.users, json],
                    addSuccess: true
                }))

                setTimeout(() => {
                    this.setState(() => ({
                        addSuccess: false
                    }))
                }, 2000)
            })
    }

    deleteUser = (id: number) => {
        console.log('deleteUser Func. UserID is:', id);

        fetch(`http://localhost:3000/users`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: id })


        })
        .then(res => res.json()) //When 'res' is returned, jsonify it
            .then(json => {
                const updated = this.state.users.filter(user => user.user_id !== json.user_id);
                this.setState(() => ({
                    users: updated,
                    deleteSuccess: true
                }))

                setTimeout(() => {
                    this.setState(() => ({
                        deleteSuccess: false
                    }))
                }, 2000)
            })




    }


    render() {
        return (
            <div className="bg-dark bg-opacity-10 border px-2">
                <Header addUser={this.addUser} />

                {
                    (this.state.users.length === 0) &&
                    <Message type="warning" children="No users to display." />
                }

                {
                    (this.state.addSuccess) &&
                    <Message type="success" children="New user has been added" />
                }
                {
                    (this.state.deleteSuccess) &&
                    <Message type="success" children="A user has been deleted" />
                }



                <Table users={this.state.users} deleteUser={this.deleteUser} />


            </div>
        );
    }
}

export default Users;