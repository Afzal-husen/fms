import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

const ToggleSwitch = ({ status }) => {
  return (
    <Fragment>
      <div>
        {status === 1 ? (
          <Form.Check className="form_check"  type="switch" checked={true}  style={{fontSize: "1.5rem",}}/>
        ) : (
          <Form.Check className="form_check" type="switch" checked={false} style={{fontSize: "1.5rem",  }}/>
        )}
      </div>
    </Fragment>
  );
};

export default ToggleSwitch;
