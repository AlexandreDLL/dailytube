import React, { Component } from 'react';
import Rest from "../../Rest"



class TextAreaForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.props.value
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      this.props.onValueChange(event.target.value);

    }
  
    handleSubmit(event) {

        if (this.props.event === "modifDescription") {

            Rest.apiRequest({table:"chaine", params:{description_Chaine:this.state.value, id:this.props.idChaine}, token:localStorage.getItem('token')},'PUT').then((response)=>{
            return response.text().then((resp) => {
                if (resp) {
                    alert('La description de la chaine à été modifiée :  ' + this.state.value);
                }
            });
        })




        }
      event.preventDefault();
    }
  
    render() {

      return (
        <form onSubmit={this.handleSubmit}>
          <label className="w-100">
            <textarea  className="w-100" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Modifier" />
        </form>
      );
    }
  }

  export {TextAreaForm}