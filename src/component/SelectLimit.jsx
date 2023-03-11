import Form from 'react-bootstrap/Form';

function SelectLimit(props) {
    return (
        <div className="select-limit">
            <Form.Select
                size="sm"
                onChange={(ev) => props.onLimitChange(ev.target.value)}
            >
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </Form.Select>
        </div>
    );
}

export default SelectLimit