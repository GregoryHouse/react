'use strict';

var users = [
    {
        firstName: "Jon",
        lastName: "Malkovich",
        birthDay: 478994400000,
        type: "USER",
        mail: "jon@mail.com"
    },
    {
        firstName: "Ivan",
        lastName: "Ivanov",
        birthDay: 1459717200000,
        type: "USER",
        mail: "petrov@mail.com"
    },
    {
        firstName: "Petr",
        lastName: "First",
        birthDay: 1461925007607,
        type: "ADMIN",
        mail: "stpiter@mail.com"
    }
];

window.ee = new EventEmitter();


var Title = React.createClass({
    render: function () {
        return (
            <div className="title">
                <div>firstName</div>
                <div>lastName</div>
                <div>birthDay</div>
                <div>type</div>
                <div>mail</div>
            </div>
        )
    }
});

var EditUser = React.createClass({

    saveUser: function (e) {
        e.preventDefault(e);

        //var firstName = ReactDOM.findDOMNode(this.refs.firstName).value;
        //var lastName = ReactDOM.findDOMNode(this.refs.lastName).value;
        //var birthDay = ReactDOM.findDOMNode(this.refs.birthDay).value;
        //var type = ReactDOM.findDOMNode(this.refs.type).value;
        //var mail = ReactDOM.findDOMNode(this.refs.mail).value;


        this.props.data.firstName = ReactDOM.findDOMNode(this.refs.firstName).value;
        this.props.data.lastName = ReactDOM.findDOMNode(this.refs.lastName).value;
        this.props.data.birthDay = ReactDOM.findDOMNode(this.refs.birthDay).value;
        this.props.data.type = ReactDOM.findDOMNode(this.refs.type).value;
        this.props.data.mail = ReactDOM.findDOMNode(this.refs.mail).value;

        //var user = {
        //    firstName: firstName,
        //    lastName: lastName,
        //    birthDay: birthDay,
        //    type: type,
        //    mail: mail
        //};

        //console.log(user)

        //console.log(this.props.data)
        this.props.self.openForm(e);

        //window.ee.emit('user.add', user);
    },

    render: function () {
        console.log(this)

        //this.props.data = this.props.data ? this.props.data: {};

        return (
            <form>
                <input type="text" ref="firstName" defaultValue={this.props.data? this.props.data.firstName : ''}/>
                <input type="text" ref="lastName" defaultValue={this.props.data? this.props.data.lastName : ''}/>
                <input type="text" ref="birthDay" defaultValue={this.props.data? this.props.data.birthDay : ''}/>
                <input type="text" ref="type" defaultValue={this.props.data? this.props.data.type : ''}/>
                <input type="text" ref="mail" defaultValue={this.props.data? this.props.data.mail : ''}/>
                <button onClick= {this.saveUser}>Save</button>
                <button onClick= {this.props.self.openForm}>Close</button>

            </form>
        )
    }
});

var User = React.createClass({

    getInitialState: function () {
        return {
            visible: false
        };
    },

    openForm: function (e) {
        e.preventDefault(e);
        this.setState({visible: !this.state.visible});
    },

    render: function () {
        //console.log(this)

        var firstName = this.props.data.firstName,
            lastName = this.props.data.lastName,
            birthDay = new Date(this.props.data.birthDay),
            type = this.props.data.type,
            mail = this.props.data.mail,
            visible = this.state.visible;

        return (
            <div>
                <div className={visible ? 'edit':''}>
                    <div>{firstName}</div>
                    <div>{lastName}</div>
                    <div>{birthDay.toDateString()}</div>
                    <div>{type}</div>
                    <div>{mail}</div>
                    <button onClick={this.openForm}>Edit</button>
                </div>
                <div className={visible ? '':'edit'}>
                    <EditUser data={this.props.data} self={this}/>
                </div>
            </div>
        )
    }
});

var Users = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    //getInitialState: function() {
    //  return {
    //    counter: 0
    //  }
    //},
    render: function () {
        var data = this.props.data;
        var usersTemplate;

        if (data.length > 0) {
            usersTemplate = data.map(function (item, index) {
                return (
                    <li key={index}>
                        <User data={item}/>
                    </li>
                )
            })
        } else {
            usersTemplate = <p> Users = 0</p>
        }

        return (
            <div>
                <ul>
                    {usersTemplate}
                </ul>
                <div className={'users-count ' + (data.length > 0 ? '':'none') }> All users: {data.length}</div>
            </div>
        );
    }
});

//var Add = React.createClass({
//    getInitialState: function () {
//        return {
//            agreeNotChecked: true,
//            authorIsEmpty: true,
//            textIsEmpty: true
//        };
//    },
//    componentDidMount: function () {
//        ReactDOM.findDOMNode(this.refs.author).focus();
//    },
//    onBtnClickHandler: function (e) {
//        e.preventDefault();
//        var textEl = ReactDOM.findDOMNode(this.refs.text);
//
//        var author = ReactDOM.findDOMNode(this.refs.author).value;
//        var text = textEl.value;
//
//        var item = [{
//            author: author,
//            text: text,
//            bigText: '...'
//        }];
//
//        window.ee.emit('News.add', item);
//
//        textEl.value = '';
//        this.setState({textIsEmpty: true});
//    },
//    onCheckRuleClick: function (e) {
//        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
//    },
//    onFieldChange: function (fieldName, e) {
//        if (e.target.value.trim().length > 0) {
//            this.setState({[fieldName]: false})
//        } else {
//            this.setState({[fieldName]: true})
//        }
//    },
//    render: function () {
//        var agreeNotChecked = this.state.agreeNotChecked,
//            authorIsEmpty = this.state.authorIsEmpty,
//            textIsEmpty = this.state.textIsEmpty;
//        return (
//            <form className='add cf'>
//                <input
//                    type='text'
//                    className='add__author'
//                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
//                    placeholder='Ваше имя'
//                    ref='author'
//                />
//        <textarea
//            className='add__text'
//            onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
//            placeholder='Текст новости'
//            ref='text'
//        />
//                <label className='add__checkrule'>
//                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/> Я согласен с правилами
//                </label>
//
//                <button
//                    className='add__btn'
//                    onClick={this.onBtnClickHandler}
//                    ref='alert_button'
//                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
//                >
//                    Опубликовать новость
//                </button>
//            </form>
//        );
//    }
//});

var App = React.createClass({
    getInitialState: function () {
        return {
            users: users,
            visible: false
        };
    },
    componentDidMount: function () {
        var self = this;
        window.ee.addListener('user.add', function (user) {
            var newUser = user.concat(self.state.users);
            self.setState({users: newUser});
        });
    },
    componentWillUnmount: function () {
        window.ee.removeListener('user.add');
    },

    openForm: function (e) {
        e.preventDefault(e);
        this.setState({visible: !this.state.visible});
    },

    render: function () {
        console.log(this)

        var visible = this.state.visible;

        return (
            <div>
                <div className={visible ? 'edit':''}>
                    <button onClick={this.openForm}>New User</button>
                </div>
                <div className={visible ? '':'edit'}>
                    <EditUser self={this}/>
                </div>
                <Title />
                <Users data={ this.state.users }/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
