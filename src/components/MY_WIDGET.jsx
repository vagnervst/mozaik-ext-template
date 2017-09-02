import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Mozaik                          from 'mozaik/browser';


class MY_WIDGET extends Component {
    constructor(props) {
        super(props);

        this.state = { title: props.title };
    }

    getApiRequest() {
        //Called once the widget is rendered.

        return {
            id:     `API_NAME.API_CALL_METHOD_NAME`,
            params: {  }, //Arguments to pass to the method.
        };
    }

    onApiData( API_DATA ) {
        //Called every time an API request is made.
        this.setState({ API_DATA });
    }

    render() {
        let WIDGET_CONTENT = (
            <div className="widget__body">
                <div className="my__widget-badge__info">
                  Loading...
                </div>
            </div>
        ); //Initial Widget content. What will be shown before API data is available

        if (this.state.API_DATA) {
            //Check if API data is available, if it is, change widget's content
            const { API_DATA } = this.state;

            WIDGET_CONTENT = (
                <div className="widget__body">
                    <div className="my__widget-badge__info">
                        <h1 className="my__widget-badge__name">{ API_DATA }</h1>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{ API_DATA }</span> this.state.title
                    <i className="fa fa-pagarme-alt" />
                </div>
                {WIDGET_CONTENT}
            </div>
        );
    }
}

MY_WIDGET.propTypes = {
    title: PropTypes.string.isRequired
};

reactMixin(MY_WIDGET.prototype, ListenerMixin);
reactMixin(MY_WIDGET.prototype, Mozaik.Mixin.ApiConsumer);


export default MY_WIDGET;
