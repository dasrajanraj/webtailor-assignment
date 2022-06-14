import { useState } from 'react';
import logo from '../devtailorLogo.svg';
import { OutlinedInput,TextField,Link,Grid, Checkbox,Button,InputLabel, MenuItem, FormControl, Select} from '@mui/material';
// import {Visibility, VisibilityOff} from '@mui/icons-material';

import "../App.css";
import { countries } from  "../config/country";
import { Box } from '@mui/system';

function LoginForm(){
    const [formObj , setFormObject ] = useState({
        countryOfResidence : "",
        email : "",
        password: "",
        repeatPassword : "",
        showPassword : false,
        showRepeatPassword : false,
        emailFormatError : '',
        misMatchPasswordError : '',
        isTermAgreed : false
    });

    const formHandler = ()=>{

        const passwordValidity = formObj.password === formObj.repeatPassword;
        const emailValidity = /\S+@\S+\.\S+/.test(formObj.email)

        switch(true){
            case !passwordValidity && !emailValidity : setFormObject({...formObj , misMatchPasswordError : "Password not matching", emailFormatError : "Wrong email Format", repeatPassword: "" })        
                break;
            case !emailValidity : setFormObject({...formObj , emailFormatError : "Wrong email Format"})
                break;
            case !passwordValidity : setFormObject({...formObj , misMatchPasswordError : "Password not matching", repeatPassword: "" })
            break;
            default : // Submit From //
                     console.log("Form Submitted")
        }
    }
 
    const handleChange = (props)=>(event)=>{
        const {
            target : { value},
        } = event;
        switch(props) {
            case 'showPassword':
            case 'showRepeatPassword':
            case 'isTermAgreed' : setFormObject({...formObj , [props] : !formObj[props]})
                break;
            case 'repeatPassword':
            case 'password' : setFormObject({...formObj , [props] : value , misMatchPasswordError :''})
                break;
            case 'email' : setFormObject({...formObj , [props] : value , emailFormatError :"" }) 
                break;
            default : setFormObject({...formObj , [props] : value})

        }
    }

    return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Let's get started
            </p>
        </header>
    <div>
    <Box sx={{ mb:3, display: 'flex',
          flexDirection: { xs: 'column' },
          alignItems:'center', 
          gridTemplateRows: 'repeat(3, 1fr)' }} >
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="form-country-of-residence">Country of residence</InputLabel>
            <Select
            labelId="form-country-of-residence"
            id="form-country-of-residence-name"
            value={formObj.countryOfResidence}
            onChange={handleChange('countryOfResidence')}
            input={<OutlinedInput label="Country of residence" />}
            >
            {countries.map((country) => (
                <MenuItem key={country} value={country}>
                {country}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        <FormControl sx={{ m: 1 , width:300 }} >
            <TextField
            id="outlined-basic-email"
            label={formObj.emailFormatError ? formObj.emailFormatError : "Email"}
            value={formObj.email}
            error={formObj.emailFormatError ? true : false}
            onChange={handleChange('email')}
            />
        </FormControl>
        <FormControl sx={{ m: 1 , width:300 }} >
            <TextField
                id="outlined-basic-password"
                label={formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Create your Password"}
                value={formObj.password}
                onChange={handleChange('password')}
                type = "password"
                error = {formObj.misMatchPasswordError ? true : false}
            />
        </FormControl>
        <FormControl sx={{ m: 1 , width:300 }} >
            <TextField
            id="outlined-basic-re-password"
            label={formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Re-enter password"}
            value={formObj.repeatPassword}
            error = {formObj.misMatchPasswordError ? true : false}
            onChange={handleChange('repeatPassword')}
            type = "password"
            />
        </FormControl>
        <FormControl sx={{mt:1, width:300 }} >

        <Grid container justifyContent="flex-start" alignItems="center">
            <Grid item xs={2}>
            <Checkbox sx={{m:0}} checked={formObj.isTermAgreed} onChange={handleChange("isTermAgreed")} /> 
            </Grid>
            <Grid item xs={10}>
            <span>I agree with <Link underline ="none"> Terms & Conditions </Link></span>
            </Grid>
        </Grid>

        </FormControl>
        <FormControl sx={{ m: 1 , width:300 }}>
            <Button disabled={!formObj.isTermAgreed} variant="contained" onClick={formHandler} > Sign Up </Button>
            <Grid container justifyContent="flex-start">
                <Button variant="text" id="login-btn">Log In</Button>

            </Grid>

        </FormControl>
    </Box>
    </div>
        <Box display="flex" justifyContent="center" alignItems="center" alignContent="flex-end" >
                <Button id="footer-customer-support" variant="text"> Customer Support </Button>
        </Box>
    </div>
    );
}

export default LoginForm;