import { useState } from 'react';
import logo from '../devtailorLogo.svg';
import { OutlinedInput,InputAdornment,IconButton ,TextField,Link,Grid, Checkbox,Button,InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

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

    const handlePasswordVisibility = (selectedElement)=>()=>{
        switch(selectedElement){
            case 'showPassword': 
            case 'showRepeatPassword': setFormObject({...formObj, [selectedElement]: !formObj[selectedElement]})
                    break;
            default: //Do Nothing
        }
    }

    return (
    <div className="App">
        {/* header */}
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
          gridTemplateRows: 'repeat(3, 1fr)'}} >

        {/* Country of residence */}
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

        {/* Email */}
        <FormControl sx={{ m: 1 , width:300 }} >
            <TextField
            id="outlined-basic-email"
            label={formObj.emailFormatError ? formObj.emailFormatError : "Email"}
            value={formObj.email}
            error={formObj.emailFormatError ? true : false}
            onChange={handleChange('email')}
            />
        </FormControl>

        {/* Password */}
        <FormControl sx={{ m: 1 , width:300 }} >
            <InputLabel htmlFor="outlined-adornment-password">{formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Create your Password"}</InputLabel>
            <OutlinedInput
                error = {formObj.misMatchPasswordError ? true : false}
                id="outlined-adornment-password"
                type={formObj.showPassword ? 'text' : 'password'}
                value={formObj.password}
                onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility('showPassword')}
                        onMouseDown={handlePasswordVisibility('showPassword')}
                        edge="end"
                    >
                        {formObj.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                label={formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Create your Password"}
            />
        </FormControl>

        {/* Repeat Password */}
        <FormControl sx={{ m: 1 , width:300 }} >
            <InputLabel htmlFor="outlined-adornment-password">{formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Re-enter password"}</InputLabel>
            <OutlinedInput
                error = {formObj.misMatchPasswordError ? true : false}
                id="outlined-adornment-password"
                type={formObj.showRepeatPassword ? 'text' : 'password'}
                value={formObj.repeatPassword}
                onChange={handleChange('repeatPassword')}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handlePasswordVisibility('showRepeatPassword')}
                        onMouseDown={handlePasswordVisibility('showRepeatPassword')}
                        edge="end"
                    >
                        {formObj.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                label={formObj.misMatchPasswordError ? formObj.misMatchPasswordError : "Re-enter password"}
            />
        </FormControl>

        {/* Terms and Conditions */}
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

        {/* Signup and Login Button */}
        <FormControl sx={{ m: 1 , width:300 }}>
            <Button disabled={!formObj.isTermAgreed} variant="contained" onClick={formHandler} > Sign Up </Button>
            <Grid container justifyContent="flex-start">
                <Button variant="text" id="login-btn">Log In</Button>
            </Grid>
        </FormControl>

    </Box>
    {/* *************** footer *****************/}
    </div>
        <Box display="flex" justifyContent="center" alignItems="center" alignContent="flex-end" >
            <Button id="footer-customer-support" variant="text"> Customer Support </Button>
        </Box>
    </div>
    );
}

export default LoginForm;