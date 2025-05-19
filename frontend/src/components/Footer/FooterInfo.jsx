

function FooterInfo() {
    return (
        <div className="topContianer">
            <div className="footerTop">
                <div className="footerSubscribe">
                    <h3>Get our emails for info on new items, sales.</h3>
                    <p>We'll email you a voucher worth $10 off your first order over $50.</p>
                    <div className="inputGroup ">
                        <input type="text" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>
                    <p className="privacyText">
                        By subscribing you agree to our <a href="#">Terms & Privacy Policy.</a>
                    </p>
                </div>

                <div className="footerContact">
                    <h3>Need help? (+90) 123 456 78 90</h3>
                    <p>We are available 8:00am – 7:00pm</p>
                    <div className="downloadApp">
                        <a href="https://www.apple.com/app-store/">
                            <img src="/img/appstore.png" alt="App Store" />
                        </a>
                        <a href="https://play.google.com/store">
                            <img src="/img/playstore.png" alt="Google Play" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterInfo