import React, {useState} from 'react';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        error: '',
        success: false
    })

    const {email, password, firstName, lastName, address, phone} = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const login = (email, password, firstName, lastName, address, phone) => {
        console.log(email, password, firstName, lastName, address, phone)
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        login(email, password, firstName, lastName, address, phone)
    }
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
                                <input type="text" defaultValue="Email" name="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" onChange={handleChange('email')} required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-lock" aria-hidden="true" />
                                <input type="password" defaultValue="Password" name="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" onChange={handleChange('password')} required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="First Name" name="First Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'firstName';}" onChange={handleChange('firstName')} required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Last Name" name="Last Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'lastName';}" onChange={handleChange('lastName')} required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Address" name="Address" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Address';}" onChange={handleChange('address')} required />
                                <div className="clearfix" />
                            </div>
                            <div className="key">
                                <i className="fa fa-envelope" aria-hidden="true" />
                                <input type="text" defaultValue="Phone" name="Number" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Number';}" onChange={handleChange('phone')} required />
                                <div className="clearfix" />
                            </div>
                            <input onClick={clickSubmit} type="submit" defaultValue="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;