import React, { useState,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
const axios = require('axios')

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {

  const [AllResources,setAllResources] = useState()

  const [AllState,setAllStates] = useState()

  useEffect(  () => {
    fetch("http://localhost:8080/api/getallresources").then( res => res.json()  ).then(res => {setAllResources(res)  
  console.log(res)
  } ).
    catch(err => {console.log(err)} )

    fetch("http://localhost:8080/api/getallcities").then(res => res.json() ).then( res => { setAllStates(res)
  console.log(res);
  } ).
    catch(err => {console.log(err)} )
  } , [] )  

  const trueVal = true
  const falseVal = false
  const [city, setCity] = useState("");
  const classes = useStyles();
  const [values,SetValues] = useState({City : "" , Name  : "" , ResourceType : "" ,Available : "" ,
  Verified : "" , Address : " " , Price : " " , Stock : " " , Description : " "  ,PhoneNumber : "", Success : "" , Error : "" })

  const {Name,City,ResourceType,Available,Verified,Address,Price,Stock,Description,PhoneNumber , Success , Error} = values;

  const handleChange = (e) => {
    if(e.target.name === "PhoneNumber"){
      let number 
    }
      console.log( e.target.name  ,  e.target.value  )
      SetValues( { ...values , [e.target.name] : e.target.value }   )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Success === true){
      SetValues({...values , Success : false , Error : false  })
      setTimeout( () => {
        if(!Name ||  !City || !ResourceType || !Available || !Verified || !Address || !Price ||
          !Stock ||  !Description  || !PhoneNumber){
            alert("Add all fields")
            return ""
          }
       
          axios.post('http://localhost:8080/api/create/provider', 
        
          { lastVerified : Verified === "true" ? Date.now() : "Not Verified yet" ,  Name, State : City,ResourceType,Available : Available === "true" ? true : false ,Verified : Verified === "true" ? true : false  ,
          Address,Price,Stock,Description,PhoneNumber  : parseInt(PhoneNumber) }
          )
          .then(function (response) {
            if(response.data.Success){
              SetValues({...values , Success : true , Error : false  })
              return ""
            }
            if(response.data.Error){
              SetValues({...values , Success : false , Error : true })
              return ""
            }
            
            console.log(response.data);
          })

        } , 2000  )
    }
    
    if(!Name ||  !City || !ResourceType || !Available || !Verified || !Address || !Price ||
      !Stock ||  !Description  || !PhoneNumber){
        alert("Add all fields")
        return ""
      }
   
      axios.post('http://localhost:8080/api/create/provider', 
    
      { lastVerified : Verified === "true" ? Date.now() : "Not Verified yet" ,  Name, State : City,ResourceType,Available : Available === "true" ? true : false ,Verified : Verified === "true" ? true : false  ,
      Address,Price,Stock,Description,PhoneNumber  : parseInt(PhoneNumber) }
      )
      .then(function (response) {
        if(response.data.Success){
          SetValues({...values , Success : true , Error : false  })
          return ""
        }
        if(response.data.Error){
          SetValues({...values , Success : false , Error : true })
          return ""
        }
        
        console.log(response.data);
      })
    
  }
  return (
    <div>
      { AllResources  && AllState ? 
     <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
  
        <Typography component="h1" variant="h5">
          Create Provider
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                onChange = {handleChange}
                value = {Name}
                required
                fullWidth
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <p> Resource Type : </p>
              <Select name = "ResourceType" value = {ResourceType} onChange = {handleChange} native label="Age" fullWidth>
              <option value=" ">Choose Resource </option>
                { AllResources.map( (data,index) => {
                   return <option value= {data.Name}>{data.Name}</option>
                }  )  }   
              </Select>
            </Grid>
            <Grid item xs={12}>
              <p> Select State </p>
              <Select name = "City" value = {City} onChange = {handleChange} native label="Age" fullWidth>
              <option value=" ">Choose City </option>
                { AllState.cities.map( (data,index) => {
                   return <option value= {data.state}>{data.state}</option>
                }  )  }   
              </Select>
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                value = {Price}
                name = "Price"
                onChange = {handleChange}
                fullWidth
                label="Price"  
              />
              
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {Stock}
                name = "Stock"
                onChange = {handleChange}
                label="Stock"
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value = {City}
                name = "City"
                onChange = {handleChange}
                label="Enter City"
              />
              
            </Grid>
            {/* <Grid item xs={12}>
              <p> Select City : </p>
              <Select value = {City} name = "City" onChange = {handleChange} native label="Age" fullWidth>
                <option value=" "> </option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Select>
            </Grid> */}
          

            <Grid item xs={12}>
              <p> Available : </p>
              <Select name = "Available" value = {Available} onChange = {handleChange} native label="Age" fullWidth>
                <option value=" "> </option>
                <option value= "true" >True</option>
                <option value= "false" >False</option>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <p> Verified : </p>
              <Select name = "Verified" value = {Verified}  onChange = {handleChange}  native label="Age" fullWidth>
                <option value=" "> </option>
                <option value = "true" >True</option>
                <option value  = "false" >False</option>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                name = "PhoneNumber"
                value = {PhoneNumber}  onChange = {handleChange}
                fullWidth
                label="Phone Number"  
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                name = "Address"
               value ={Address} 
               onChange = {handleChange}
                fullWidth
                label="Address"
              
              />

            </Grid>
         
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                name = "Description"
                value ={Description} 
                onChange = {handleChange}
                fullWidth
                label="Description"
              />
              
            </Grid>
           
        
          </Grid>
          {Success ? <p  style = {{color : "green"}}> Provider Successfully Added </p> : "" }
          {Error ? <p  style = {{color : "red"}} > Enter Valid Phone Number </p> : "" }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = { handleSubmit  }
          >
            Add Provider
          </Button>
      
        </form>
        {JSON.stringify(city)}
      </div>
    </Container> : "" }
    </div>
  );
}
