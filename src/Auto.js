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
    //submits form data to server
    submit = (event) => {
        event.preventDefault()
        let result = this.state.selectedInterests.map(a => a.value).toString();
        console.log({name:this.state.name, email:this.state.email,interests:result})
            axios
            .post("https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register/?rapidapi-key=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7", {
                name: this.state.name,
                email: this.state.email,
                interests: result
            }) //logs server response to console
            .then((res) => {
                console.log('Successfully posted data', res);
                
            }) //shows success message to screen
            .then(()=>{
                document.getElementById("msg").innerHTML = "Registration Successful!";
            })//shows error to console
            .catch(() => {
                console.log("Oops, request failed!")
                document.getElementById("msg").innerHTML = "Registration Failed!";

            })

          
      }
      //load options of select from api request
    loadOptions= async  (inputText, callback) => {
        const response = await fetch(`https://webit-keyword-search.p.rapidapi.com/autosuggest?rapidapi-key=28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7&q=${inputText}&language=en`,{
            mode: 'cors'})
        const res =  await response.json();
        console.log(res.data.results)
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
