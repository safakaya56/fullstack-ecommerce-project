

function ContactCommunication() {
    return (
        <div className="communication">
            <form>
                <div className="formRow">
                    <div className="formGroup">
                        <label>Your Name <span>*</span></label>
                        <input type="text" placeholder="Enter your name" required />
                    </div>
                    <div className="formGroup">
                        <label>Your Email <span>*</span></label>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                </div>
                <div className="formGroup">
                    <label>Subject <span>*</span></label>
                    <input type="text" placeholder="Enter subject" required />
                </div>
                <div className="formGroup">
                    <label>Your Message <span>*</span></label>
                    <textarea placeholder="Write your message" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    )
}

export default ContactCommunication