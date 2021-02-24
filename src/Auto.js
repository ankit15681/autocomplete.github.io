import React, {PureComponent} from 'react';
import axios from "axios";
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import './Auto.css';


//To check and display maximum interests
const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 3 ? (
          props.children
        ) : (
          <div style={{ margin: 15 }}>Max no of Interests selected</div>
        )}
      </components.Menu>
    );
  }; 

class Auto extends PureComponent{
    constructor(props){
        super(props)
        this.state = {selectedInterests: [],
        name: "",
        email:""
        }

    }
    //checks if the select input is valid input
    isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 3;

    //handle select change
    onSelectChange =  selectedInterests => {
        this.setState({
            selectedInterests: selectedInterests || []
        })
    }
    
    //handle input change
    onInputChange= event => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }
    //form validation
    checkInput(){
        if(this.state.name === "")
        {
            document.getElementById("msg").innerHTML = "Please Enter Your Name!";
            return true
        }
        if(this.state.email === "")
        {
            document.getElementById("msg").innerHTML = "Please Enter Your Email!";
            return true
        }
        if(this.state.selectedInterests.length === 0)
        {
            document.getElementById("msg").innerHTML = "Please Enter Interests!";
            return true
        }
        return false;

    }

    //submits form data to server
    submit =async (event) => {
        event.preventDefault()
        const emptyField = this.checkInput();
        if(emptyField == true)
        {return;}
        let result = this.state.selectedInterests.map(a => a.value).toString();   
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.state.name,
                email: this.state.email,
                interests: result })
        };     
           await fetch(`https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register/?rapidapi-key=${process.env.REACT_APP_RAPIDAPI_KEY}`, requestOptions) 
            //shows success message to screen
            .then(()=>{
                document.getElementById("msg").innerHTML = "Registration Successful!";
            })//shows error to console
            .catch(() => {
                console.log("Oops, request failed!")
                document.getElementById("msg").innerHTML = "Registration Failed!";

            })

          
      }
      //load options of select from api request
    loadOptions=  async(inputText, callback) => {
        const response =  await fetch(`${process.env.REACT_APP_RAPIDAPI_HOST}/autosuggest?rapidapi-key=${process.env.REACT_APP_RAPIDAPI_KEY}&q=${inputText}&language=en`,{
            mode: 'cors'})
        const res =  await response.json();
        // console.log(res.data.results)
        callback(res.data.results.map(i=>({label: i, value:i})))
    }

    render(){
        return (
            <div>
            <h1 id="msg"></h1>
            <div className='wrapper'>
             <h1 className="logo">Register For the Courses</h1>
            <div className='form-content'>
                    <form onSubmit={this.submit.bind(this)}>
                        <div className='form-field'>
                        <input
                            type="text"
                            name="name"
                            className='name'
                            value={this.state.name}
                            placeholder='Your Name'
                            onChange={this.onInputChange.bind(this)}
                        />
                        </div>
                        <div className='form-field'>
                        <input
                            type="email"
                            name="email"
                            className='email'
                            value={this.state.email}
                            placeholder='Your Email Address'
                            onChange={this.onInputChange.bind(this)}
                        />
                        </div>
                        <div className='form-field'>
                         <AsyncSelect
                                        components={{Menu}}
                                        isMulti
                                        isValidNewOption={this.isValidNewOption}
                                        value={this.state.selectedInterests}
                                        onChange={this.onSelectChange.bind(this)}
                                        placeholder={'Type Your Interests'}
                                        loadOptions={this.loadOptions}
                
                        />
                        </div>
                         <div className='action-button'>
                        <input className='submit' type="submit" name="Sign Up" value='Register'/>
                        </div>
                        </form>
                 
            </div>
            </div>
            </div>
        )
    }
}
export default Auto;
