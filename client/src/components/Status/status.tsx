import { StatusType } from "../Users/Users";

interface Props {
    type: StatusType;
}

function Status(props: Props) {
    function getBadgeCss(){
        switch (props.type){
            case 'Active':
                return 'bg-success';
            case 'Expired':
                return 'bg-warning';
            case 'Banned':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    return ( 
        <span className={`badge ${getBadgeCss()} text-capitalize`}>
            {props.type}
        </span>
     );
}

export default Status;