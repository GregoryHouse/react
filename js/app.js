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

var NewUser = React.createClass({
    render: function () {
        return (
            <div className={this.editUser ? 'none':'edit'}>
                <input type="text"/>
            </div>
        )
    }
});

var User = React.createClass({


    //propTypes: {
    //  data: React.PropTypes.shape({
    //    author: React.PropTypes.string.isRequired,
    //    text: React.PropTypes.string.isRequired,
    //    bigText: React.PropTypes.string.isRequired
    //  })
    //},
    getInitialState: function () {
        return {
            visible: false,
            editUser: false
        };
    },
    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },

    openForm: function(e){
        this.setState = ({editUser: !this.editUser});
        console.log(this.editUser)
    },

    render: function () {
        var firstName = this.props.data.firstName,
            lastName = this.props.data.lastName,
            birthDay = new Date(this.props.data.birthDay),
            type = this.props.data.type,
            mail = this.props.data.mail;

        return (
            <div>
                <div className={this.editUser ? 'edit':'none'}>
                    <div>{firstName}</div>
                    <div>{lastName}</div>
                    <div>{birthDay.toDateString()}</div>
                    <div>{type}</div>
                    <div>{mail}</div>
                    <button onClick = {this.openForm}>Edit</button>
                </div>
                <NewUser />
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

var Add = React.createClass({
    getInitialState: function () {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function (e) {
        e.preventDefault();
        var textEl = ReactDOM.findDOMNode(this.refs.text);

        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = textEl.value;

        var item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        window.ee.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true});
    },
    onCheckRuleClick: function (e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function (fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({[fieldName]: false})
        } else {
            this.setState({[fieldName]: true})
        }
    },
    render: function () {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                    placeholder='Ваше имя'
                    ref='author'
                />
        <textarea
            className='add__text'
            onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
            placeholder='Текст новости'
            ref='text'
        />
                <label className='add__checkrule'>
                    <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/> Я согласен с правилами
                </label>

                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
                >
                    Опубликовать новость
                </button>
            </form>
        );
    }
});

var App = React.createClass({
    //getInitialState: function() {
    //  return {
    //    news: my_news
    //  };
    //},
    //componentDidMount: function() {
    //  var self = this;
    //  window.ee.addListener('News.add', function(item) {
    //    var nextNews = item.concat(self.state.news);
    //    self.setState({news: nextNews});
    //  });
    //},
    //componentWillUnmount: function() {
    //  window.ee.removeListener('News.add');
    //},
    render: function () {
        return (
            <div>
                <Title />
                <Users data={ users }/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
