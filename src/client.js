import request from 'superagent-bluebird-promise';
import Promise from 'bluebird';
import _       from 'lodash';
import chalk   from 'chalk';
import config  from './config';


/**
 * @param {Mozaik} mozaik
 */
const client = (mozaik) => {

    mozaik.loadApiConfig(config);

    const apiCalls = {
        //These are the API call methods your widget will use
        
        API_CALL_METHOD_NAME(params) {
          const url = `${config.get('API_NAME.baseUrl')}`;

          let req = request.get(url);

          mozaik.logger.info(chalk.yellow(`[YOUR_CUSTOM_LOG_TAG] calling ${url}`));

          return req.promise().then(res => res.body);
        }
    };

    return apiCalls;
};


export default client;
