import React from 'react';
import Rest from "../../Rest"
import UserContext from "../../context/UserContext"




class TextAreaForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.props.value
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }

    static contextType = UserContext;

  
    handleChange(event) {
      this.setState({value: event.target.value});
      this.props.onValueChange(event.target, this.props);

    }
  
    handleSubmit(event) {
        
        event.preventDefault();

        const { setUser } = this.context


        let evenType = this.props.event


        if (evenType === "modifDescription") {

            Rest.apiRequest({table:"chaine", params:{description_Chaine:this.state.value, id:this.props.idChaine}, token:localStorage.getItem('token')},'PUT').then((response)=>{
            return response.text().then((resp) => {
                if (resp) {
                    alert('La description de la chaine à été modifiée :  ' + this.state.value);
                }
            });
        })
    }

        
        if (evenType === "modifUserName"){

            // console.log("text");
            // console.log(this.state.value);
            // console.log(this.props);

            Rest.apiRequest({table:"user", params:{pseudo_User:this.state.value, id:this.props.id}, token:localStorage.getItem('token')},'PUT').then((response)=>{
                return response.text().then((resp) => {
                    if (resp) {
                        alert('Le nom utilisateur a été modifié :  ' + this.state.value);
                        
                    }
                });
            })

        }
        if (evenType === "modifRealName"){

          Rest.apiRequest({table:"user", params:{prenom_User:this.state.value, id:this.props.id}, token:localStorage.getItem('token')},'PUT').then((response)=>{
            return response.text().then((resp) => {
                if (resp) {
                    alert('Le prénom réel a été modifié :  ' + this.state.value);
                }
            });
        })

        }
        if (evenType === "modifRealFamilyName"){

          Rest.apiRequest({table:"user", params:{nom_User:this.state.value, id:this.props.id}, token:localStorage.getItem('token')},'PUT').then((response)=>{
            return response.text().then((resp) => {
                if (resp) {
                    alert('Le nom réel a été modifié :  ' + this.state.value);
                }
            });
        })

        }
        if (evenType === "modifEmail"){

          Rest.apiRequest({table:"user", params:{email:this.state.value, id:this.props.id}, token:localStorage.getItem('token')},'PUT').then((response)=>{
            return response.text().then((resp) => {
                if (resp) {
                    alert("L'email a été modifié :  " + this.state.value);
                }
            });
        })

        }



        
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