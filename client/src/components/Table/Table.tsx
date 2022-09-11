import Status from "../Status/status";
import { IUser } from "../Users/Users";

interface Props {
    users: Array<IUser>;
    deleteUser: Function;
}

function Table(props: Props) {
    return (

        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="w-25">Full Name</th>
                    <th className="w-25">Status</th>
                    <th className="w-50">Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.users.map(user =>
                        <tr key={user.user_id} className="bg-light">
                            <td>{user.full_name}</td>
                            <td>
                                <Status type={user.status} />

                            </td>
                            <td>{user.email}</td>
                            <td>
                                {/* We use the function () before deleteUser since otherwise the client will execute the deleteUser() right as the component would load */}
                                <button 
                                onClick={() => props.deleteUser(user.user_id)} 
                                className="btn btn-default"> 
                                    <i className="bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    );
}

export default Table;