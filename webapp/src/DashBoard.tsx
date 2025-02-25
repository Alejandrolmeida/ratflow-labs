import { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Copilot from "./components/Copilot";

interface ComponentProps { }

const DashBoard: FC<ComponentProps> = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <Card className="bg-black bg-opacity-50 p-2">
            <Copilot />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashBoard;
