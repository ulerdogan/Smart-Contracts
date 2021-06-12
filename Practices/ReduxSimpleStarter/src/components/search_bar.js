//import React from "react";
// instead of extends ... keywords
import React, {Component} from "react";
// it means "const Component = React.Component;"

// gives React Component's all funcitonality
class SearchBar extends React.Component {

    // initializing state
    constructor(props) {
        // super must be called
        super(props);

        this.state = { term: "" };
    }


    // every class based .. need to have render method
    render() {
        // we have an input element and a event handler: onChange || CHANGED TO ARROW FUNCT
        //return <input onChange={this.onInputChange} />;

        // the lines up and down can be turn into an arrow function
        //return <input onChange={event => console.log(event.target.value)} />;

        // or can be turned to state ..
        return (
            <div className="search-bar">
                <input
                // added after
                value={this.state.term}
                //onChange={event => this.setState({ term: event.target.value })}     
                onChange={event => this.onInputChange(event.target.value)}/>
            </div>
            // removed from inside of the div
            // <br/>Value of the input: {this.state.term} 
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    /*
    // we add a event handler, it will be triggered when event occurs || CHANGED TO ARROW FUNCT
    onInputChange(event){
        console.log(event.target.value);
    }
    */
}


/*
// changed by class based component to make functional component more intelligent
const SearchBar = () => {
    return <input />;
};
*/

// declare connection between the files
export default SearchBar;