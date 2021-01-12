import React from 'react';

const register = () => {
    return (
        <div>
            <div className="banner-top">
                <div className="container">
                    <h3>Register</h3>
                    <h4><a href="/">Home</a><label>/</label>Register</h4>
                    <div className="clearfix"> </div>
                </div>
            </div>
            {/* Login */}
            <div className="login">
                <div className="main-agileits">
                    <div className="form-w3agile form1">
                        <h3>Register</h3>
                        <form action="#" method="post">
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Email" name="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-lock" aria-hidden="true" />
                                <input type="password" defaultValue="Password" name="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="First Name" name="First Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'firstName';}" required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Last Name" name="Last Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'lastName';}" required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Address" name="Address" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Address';}" required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Phone" name="Number" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Number';}" required />
                                <div className="clearfix" />
                            </div>
                            <input type="submit" defaultValue="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register;