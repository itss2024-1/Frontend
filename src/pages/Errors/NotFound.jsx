import { Button, Result } from 'antd';
import { Link, Navigate } from 'react-router-dom';
const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to="/" >Back Home</Link></Button>}
        />
    )
}
export default NotFound;