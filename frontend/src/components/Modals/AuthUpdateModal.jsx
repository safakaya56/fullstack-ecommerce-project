import { Button, Modal } from 'antd';
import AuthAccountInfo from '../Auths/AuthAccountInfo';
import { useState } from 'react';

function AuthUpdateModal({ email }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className='btn btn-outline-success p-3' onClick={showModal}>
                Update Account İnfo
            </button>
            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
            >
                <AuthAccountInfo email={email} />
            </Modal>
        </>
    )
}

export default AuthUpdateModal