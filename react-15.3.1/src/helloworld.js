/**
 * Created by echottzhu on 2016/9/18.
 */
var names=['Alice','Emily','Kate'];

var title = "echo";
var HelloMessage = React.createClass({
    propTypes:{
        title: React.PropTypes.string.isRequired,
    },

    render: function(){
        return <h1>Hello {this.props.title} </h1>
    }
});

var MyComponent = React.createClass({
    handleClick: function(){
        this.refs.myTextInput.focus();
    },
    render: function(){
        return(
            <div>
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the text input" onClick={this.handleClick} />
            </div>
        );
    }
});

var LikeButton = React.createClass({
    getInitialState: function(){
        return {liked: false};
    },
    handleClick: function(event){
        this.setState({liked: !this.state.liked });
    },
    render: function(){
        var text = this.state.liked? 'like':'haven\'t liked';
        return(
            <p onClick = {this.handleClick}>
            You {text} this. Click to toggle.
            </p>
        );
    }
});


var Input = React.createClass({
    getInitialState: function(){
        return {value: 'Hello!'};
    },
    handleChange: function(event){
        this.setState({value: event.target.value});
    },
    render: function(){
        var value = this.state.value;
        return(
            <div>
                <input type="text" value={value} onChange={this.handleChange} />
                <p>{value}</p>
            </div>
        );
    }
});

ReactDOM.render(
    /*<h1>Hello, world! </h1>,*/

   /*
   < div>
     {
     names.map(function(name){
     return <div>Hello, {name}! </div>
     })
     }
    </div>,
    */

    /*<HelloMessage title={title} />,*/

    /*<MyComponent />,*/

    /*<LikeButton/>,*/

    <Input />,
    document.getElementById('example')
);