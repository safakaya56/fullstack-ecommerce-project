import "./campaignSingle.css"
import { FaLongArrowAltRight } from "react-icons/fa";


function CampaignSingle() {
    return (
        <div className="campaign-single">
            <div className="campaign-wrapper">
                <h2>New Season Sale</h2>
                <strong>40% OFF</strong>
                <span></span>
                <a href="#" className="btn btn-lg">
                    SHOP NOW
                    <FaLongArrowAltRight className='icon' />
                </a>
            </div>
        </div>
    )
}

export default CampaignSingle