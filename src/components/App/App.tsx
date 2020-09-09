import React, {FC,useState} from 'react';
import TaskPage from '../TaskPage';
import { events } from './../../mocks/events';
import { Modal, Button } from 'antd';




const App:FC = () => {
    const currEvent = events[0].events[0];
    const [visible, setVisible] = useState(false);
    return(
        <React.StrictMode>
            <Button type="primary" onClick={() => setVisible(true)}>
                Open Task Page
            </Button>
            <Modal
                title={events[0].course}
                centered
                visible={visible}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)} >
                      Return
                    </Button>,
                    
                  ]}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <TaskPage 
                    //course={events[0].course}
                    name={currEvent.name}
                    date={currEvent.date}
                    type={currEvent.type} 
                    organizer={currEvent.organizer}
                    taskContent={currEvent.taskContent}
                />
            </Modal>
        </React.StrictMode>
    );
}
  
export default App;